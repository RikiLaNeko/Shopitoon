import { error } from '@sveltejs/kit';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';

/**
 * Endpoint pour servir les fichiers avatar directement
 */
export async function GET({ params }) {
	try {
		const filename = params.filename;
		// Vérifier que le nom de fichier est sécuritaire
		if (!filename || filename.includes('..')) {
			throw error(400, 'Nom de fichier invalide');
		}

		// Chemin complet du fichier
		const filePath = path.resolve('static/avatars', filename);

		// Vérifier que le fichier existe
		try {
			const stats = await stat(filePath);
			if (!stats.isFile()) {
				throw error(404, 'Fichier non trouvé');
			}
		} catch {
			throw error(404, 'Fichier non trouvé');
		}

		// Déterminer le type MIME basé sur l'extension
		const ext = path.extname(filename).toLowerCase();
		let contentType = 'application/octet-stream';

		switch (ext) {
			case '.jpg':
			case '.jpeg':
				contentType = 'image/jpeg';
				break;
			case '.png':
				contentType = 'image/png';
				break;
			case '.gif':
				contentType = 'image/gif';
				break;
			case '.webp':
				contentType = 'image/webp';
				break;
		}

		// Créer un stream de lecture pour le fichier
		const fileStream = createReadStream(filePath);

		// Renvoyer une réponse avec le contenu du fichier
		return new Response(fileStream, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000' // Cache pour 1 an
			}
		});
	} catch (err) {
		console.error('Erreur lors de la récupération de l\'avatar:', err);
		throw error(500, 'Erreur lors de la récupération de l\'avatar');
	}
}
