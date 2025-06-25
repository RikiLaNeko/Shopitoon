<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { notifications } from '$lib/stores/notification';
	import Notifications from '$lib/components/Notifications.svelte';

	// Interface de typage pour les fonctions de soumission
	interface EnhanceParams {
		formData: FormData;
	}

	interface EnhanceResult {
		result: {
			type: string;
			data?: Record<string, unknown>;
		};
	}

	// État pour la modal de confirmation
	let showDeleteConfirm = $state(false);

	// État pour les valeurs de formulaire
	let username = $state($page.data.user?.username || '');
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let avatarUrl = $state(
		$page.data.user?.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=default'
	);

	// Référence pour le fichier d'avatar
	let avatarFileInput: HTMLInputElement;
	let imagePreview = $state<string | null>(null);

	// Fonctions de gestion des formulaires
	function toggleDeleteConfirm() {
		showDeleteConfirm = !showDeleteConfirm;
	}

	function resetPasswordForm() {
		currentPassword = '';
		newPassword = '';
		confirmPassword = '';
	}

	// Fonction pour capitaliser la première lettre
	function capitalizeFirstLetter(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}

	// Fonction pour générer un nouvel avatar
	function generateNewAvatar() {
		const seed = Math.random().toString(36).substring(2, 10);
		avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
		imagePreview = null;
	}

	// Fonction pour prévisualiser l'image uploadée
	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) {
			imagePreview = null;
			return;
		}

		const file = input.files[0];
		if (!file.type.startsWith('image/')) {
			notifications.add('Veuillez sélectionner une image valide', 'error');
			imagePreview = null;
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			imagePreview = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	// Fonction pour ouvrir le sélecteur de fichier
	function openFilePicker() {
		avatarFileInput.click();
	}

	// Gérer l'envoi du formulaire d'avatar
	const handleAvatarSubmit = ({ formData }: EnhanceParams) => {
		// On modifie les données avant l'envoi
		if (imagePreview) {
			formData.set('avatarUrl', imagePreview);
		} else {
			formData.set('avatarUrl', avatarUrl);
		}

		return async ({ result }: EnhanceResult) => {
			const typedResult = result;
			if (typedResult.type === 'success') {
				notifications.add('Avatar mis à jour avec succès', 'success');
				imagePreview = null;
			} else {
				notifications.add(
					(typedResult.data?.avatarError as string) || "Erreur lors de la mise à jour de l'avatar",
					'error'
				);
			}
		};
	};

	// Notification de succès/erreur pour le changement de nom d'utilisateur
	const handleUsernameSubmit = () => {
		return async ({ result }: EnhanceResult) => {
			const typedResult = result;
			if (typedResult.data?.usernameSuccess) {
				notifications.add("Nom d'utilisateur mis à jour avec succès", 'success');
			} else if (typedResult.data?.usernameError) {
				notifications.add(typedResult.data.usernameError as string, 'error');
			}
		};
	};

	// Notification de succès/erreur pour le changement de mot de passe
	const handlePasswordSubmit = () => {
		return async ({ result }: EnhanceResult) => {
			const typedResult = result;
			if (typedResult.data?.passwordSuccess) {
				notifications.add('Mot de passe mis à jour avec succès', 'success');
				resetPasswordForm();
			} else if (typedResult.data?.passwordError) {
				notifications.add(typedResult.data.passwordError as string, 'error');
			}
		};
	};
</script>

<svelte:head>
	<title>Shopitoon - Profil utilisateur</title>
	<meta name="description" content="Gérez votre profil, modifiez vos informations et personnalisez votre expérience sur Shopitoon." />
	<meta name="robots" content="index, follow" />
</svelte:head>

<Notifications />

<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="mb-6 text-3xl font-bold text-indigo-700">Mon Profil</h1>

	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<!-- En-tête de la carte -->
		<div class="bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 p-6">
			<div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
				<div class="relative">
					<img
						src={imagePreview || avatarUrl}
						alt="Avatar"
						class="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
					/>
				</div>
				<div class="text-center md:text-left">
					<h2 class="text-2xl font-bold text-white">
						{capitalizeFirstLetter($page.data.user?.username || 'Utilisateur')}
					</h2>
					<p class="text-indigo-100">{$page.data.user?.email}</p>
					<div
						class="mt-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{$page.data.user?.nombreOfPoints || 0} points
					</div>
				</div>
			</div>
		</div>

		<div class="p-6">
			<!-- Section de gestion de l'avatar -->
			<div class="mb-8">
				<h3 class="mb-4 text-lg font-semibold text-indigo-700">Personnaliser mon avatar</h3>

				<div class="flex flex-col items-start gap-6 md:flex-row">
					<div class="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 md:w-1/2">
						<div class="mb-4 flex justify-center">
							<img
								src={imagePreview || avatarUrl}
								alt="Aperçu de l'avatar"
								class="h-32 w-32 rounded-full border-2 border-indigo-200 object-cover shadow-md"
							/>
						</div>

						<form
							method="POST"
							action="?/updateAvatar"
							use:enhance={handleAvatarSubmit}
							class="space-y-4"
						>
							<div class="flex flex-wrap justify-center gap-2">
								<input
									type="file"
									accept="image/*"
									class="hidden"
									bind:this={avatarFileInput}
									onchange={handleFileChange}
								/>
								<button
									type="button"
									onclick={openFilePicker}
									class="flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-1 h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
										/>
									</svg>
									Importer une image
								</button>

								<button
									type="button"
									onclick={generateNewAvatar}
									class="flex items-center rounded-md border border-fuchsia-200 bg-fuchsia-50 px-3 py-2 text-sm font-medium text-fuchsia-700 transition-colors hover:bg-fuchsia-100"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-1 h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Générer aléatoirement
								</button>
							</div>

							<div class="mt-4 flex justify-center">
								<button
									type="submit"
									class="rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700"
								>
									Enregistrer l'avatar
								</button>
							</div>
						</form>
					</div>

					<div class="w-full rounded-lg border border-indigo-100 bg-indigo-50 p-4 md:w-1/2">
						<h4 class="mb-2 font-medium text-indigo-800">À propos des avatars</h4>
						<p class="text-sm text-indigo-700">
							Vous pouvez personnaliser votre avatar de deux façons :
						</p>
						<ul class="mt-2 list-disc space-y-2 pl-5 text-sm text-indigo-600">
							<li>Télécharger votre propre image depuis votre appareil</li>
							<li>Générer un avatar aléatoire avec notre outil intégré</li>
						</ul>
						<p class="mt-3 text-xs text-indigo-500">
							Les avatars personnalisent votre profil et sont visibles par les autres utilisateurs
							de la plateforme.
						</p>
					</div>
				</div>
			</div>

			<!-- Section modification du nom d'utilisateur -->
			<div class="mb-8 border-t border-gray-100 pt-6">
				<h3 class="mb-4 text-lg font-semibold text-indigo-700">Modifier mon nom d'utilisateur</h3>
				<form
					method="POST"
					action="?/updateUsername"
					use:enhance={handleUsernameSubmit}
					class="max-w-md"
				>
					<div class="mb-4">
						<label for="username" class="mb-1 block text-sm font-medium text-gray-700"
							>Nom d'utilisateur</label
						>
						<input
							type="text"
							id="username"
							name="username"
							bind:value={username}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							minlength="3"
							maxlength="20"
							required
						/>
						<p class="mt-1 text-xs text-gray-500">Entre 3 et 20 caractères</p>
					</div>
					<div>
						<button
							type="submit"
							class="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
						>
							Mettre à jour mon nom d'utilisateur
						</button>
					</div>
				</form>
			</div>

			<!-- Section modification du mot de passe -->
			<div class="mb-8 border-t border-gray-100 pt-6">
				<h3 class="mb-4 text-lg font-semibold text-indigo-700">Modifier mon mot de passe</h3>
				<form
					method="POST"
					action="?/updatePassword"
					use:enhance={handlePasswordSubmit}
					class="max-w-md"
				>
					<div class="mb-4">
						<label for="currentPassword" class="mb-1 block text-sm font-medium text-gray-700"
							>Mot de passe actuel</label
						>
						<input
							type="password"
							id="currentPassword"
							name="currentPassword"
							bind:value={currentPassword}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							required
						/>
					</div>
					<div class="mb-4">
						<label for="newPassword" class="mb-1 block text-sm font-medium text-gray-700"
							>Nouveau mot de passe</label
						>
						<input
							type="password"
							id="newPassword"
							name="newPassword"
							bind:value={newPassword}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							minlength="6"
							required
						/>
						<p class="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
					</div>
					<div class="mb-4">
						<label for="confirmPassword" class="mb-1 block text-sm font-medium text-gray-700"
							>Confirmer le nouveau mot de passe</label
						>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							bind:value={confirmPassword}
							class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							required
						/>
					</div>
					<div>
						<button
							type="submit"
							class="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
						>
							Mettre à jour mon mot de passe
						</button>
					</div>
				</form>
			</div>

			<!-- Section suppression du compte -->
			<div class="border-t border-gray-200 pt-6">
				<h3 class="mb-4 text-lg font-semibold text-red-600">Supprimer mon compte</h3>
				<p class="mb-4 text-sm text-gray-600">
					La suppression de votre compte est définitive et entraînera la perte de toutes vos
					données, y compris vos tâches, événements et points.
				</p>
				<button
					onclick={toggleDeleteConfirm}
					class="rounded-md border border-red-200 bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-200"
				>
					Supprimer mon compte
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal de confirmation pour la suppression du compte -->
{#if showDeleteConfirm}
	<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
		<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<h3 class="mb-4 text-lg font-bold text-gray-900">Confirmer la suppression</h3>
			<p class="mb-6 text-gray-600">
				Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes
				vos données seront perdues.
			</p>
			<div class="flex justify-end space-x-4">
				<button
					onclick={toggleDeleteConfirm}
					class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
				>
					Annuler
				</button>
				<form method="POST" action="?/deleteAccount" use:enhance>
					<button
						type="submit"
						class="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
					>
						Supprimer définitivement
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
