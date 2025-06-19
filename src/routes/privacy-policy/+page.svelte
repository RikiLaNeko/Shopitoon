<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived($page.data.user);
</script>

<main class="animate-fade-in min-h-screen bg-gradient-to-br from-fuchsia-400 via-indigo-300 to-blue-400 pb-16">
	<div class="mx-auto max-w-4xl px-4 py-12">
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-bold text-white drop-shadow-md">Politique de Confidentialité</h1>
			<p class="mt-2 text-lg text-white/90">Votre vie privée est importante pour nous</p>
		</div>

		<div class="rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl">
			<p class="text-sm text-gray-500">Dernière mise à jour : 19 juin 2025</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Introduction</h2>
			<p class="mt-2 text-gray-600">
				Bienvenue sur Shopitoon. Cette politique de confidentialité explique comment nous traitons vos
				informations personnelles lorsque vous utilisez notre application.
			</p>
			<p class="mt-2 text-gray-600">
				Chez Shopitoon, nous nous engageons à protéger votre vie privée. Nous ne collectons que les
				informations strictement nécessaires au fonctionnement de notre service.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Informations Collectées</h2>
			<p class="mt-2 text-gray-600">
				Nous ne collectons que les informations minimales requises pour le fonctionnement de votre compte :
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>Nom d'utilisateur</li>
				<li>Adresse e-mail</li>
				<li>Mot de passe (toujours stocké de manière cryptée)</li>
				<li>Image de profil (si vous en téléchargez une)</li>
			</ul>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Utilisation des Données</h2>
			<p class="mt-2 text-gray-600">
				Vos données sont uniquement utilisées pour :
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>Créer et gérer votre compte personnel</li>
				<li>Vous permettre d'utiliser les fonctionnalités de l'application</li>
				<li>Vous contacter en cas de nécessité concernant votre compte</li>
			</ul>
			<p class="mt-2 text-gray-600">
				<strong>Nous ne vendons jamais vos données</strong> et ne les partageons avec aucun tiers.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Stockage des Données</h2>
			<p class="mt-2 text-gray-600">
				Vos données sont stockées localement et de manière sécurisée. Nous utilisons des méthodes de
				chiffrement modernes pour protéger toutes les données sensibles, notamment les mots de passe.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Vos Droits</h2>
			<p class="mt-2 text-gray-600">Conformément au RGPD, vous disposez des droits suivants :</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>Droit d'accès à vos données personnelles</li>
				<li>Droit de rectification de données inexactes</li>
				<li>Droit à l'effacement de vos données ("droit à l'oubli")</li>
				<li>Droit à la limitation du traitement</li>
				<li>Droit à la portabilité des données</li>
			</ul>
			<p class="mt-2 text-gray-600">
				Pour exercer ces droits, vous pouvez simplement nous contacter via l'adresse indiquée ci-dessous.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Cookies et Technologies Similaires</h2>
			<p class="mt-2 text-gray-600">
				Notre application utilise uniquement des cookies de session essentiels au fonctionnement du
				service (pour maintenir votre connexion). Nous n'utilisons pas de cookies de suivi ou
				publicitaires.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Modifications de la Politique de Confidentialité</h2>
			<p class="mt-2 text-gray-600">
				Nous pouvons occasionnellement mettre à jour cette politique. Les modifications importantes seront
				notifiées sur notre site web ou par e-mail.
			</p>

			<h2 class="mt-6 text-xl font-semibold text-indigo-600">Contact</h2>
			<p class="mt-2 text-gray-600">
				Pour toute question concernant cette politique ou vos données personnelles, vous pouvez nous
				contacter via:
			</p>
			<ul class="mt-2 list-disc pl-6 text-gray-600">
				<li>
					<span class="font-medium">Email:</span>
					<a
						href="mailto:chloe.mortreux@proton.me"
						class="text-indigo-600 transition hover:text-fuchsia-600 hover:underline"
					>chloe.mortreux@proton.me</a>
				</li>
				<li>
					<span class="font-medium">GitHub:</span>
					<a
						href="https://github.com/RikiLaNeko/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-indigo-600 transition hover:text-fuchsia-600 hover:underline"
					>https://github.com/RikiLaNeko/</a>
				</li>
			</ul>

			<div class="mt-10 flex justify-center">
				<a
					href="/"
					class="rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg"
				>
					Retour à l'accueil
				</a>
			</div>
		</div>
	</div>
</main>
