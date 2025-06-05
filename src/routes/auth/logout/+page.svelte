<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;

	let isLoggingOut = false;

	function handleLogout() {
		return ({ result }) => {
			isLoggingOut = true;
			if (result.type === 'success') {
				// Attendre 2 secondes avant de rediriger pour montrer le message
				setTimeout(() => {
					goto('/');
				}, 2000);
			}
		};
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-50 to-indigo-100 px-4 py-12"
>
	<div
		class="hover:shadow-3xl w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl transition-all duration-300 hover:scale-105"
	>
		<h1 class="mb-6 text-center text-3xl font-extrabold text-blue-700 drop-shadow">Déconnexion</h1>

		{#if isLoggingOut}
			<div class="text-center">
				<p class="mb-3 text-xl font-semibold text-indigo-700">Au revoir, {data.username} !</p>
				<p class="mb-6 text-gray-600">Merci d'avoir utilisé HelpinPlatform. À bientôt !</p>
				<div class="animate-pulse text-gray-500">Redirection vers la page d'accueil...</div>
			</div>
		{:else}
			<p class="mb-6 text-center text-gray-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>

			<form method="post" use:enhance={handleLogout} class="flex flex-col gap-4">
				<button
					type="submit"
					class="w-full rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-4 py-3 text-lg font-bold text-white shadow-md transition hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Se déconnecter
				</button>

				<a
					href="/"
					class="text-center font-medium text-indigo-600 transition hover:text-fuchsia-600"
				>
					Annuler
				</a>
			</form>
		{/if}
	</div>
</div>
