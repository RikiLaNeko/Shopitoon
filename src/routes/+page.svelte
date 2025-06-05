<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived($page.data.user);

	// Formatage de la date en français
	const dateActuelle = $derived(
		new Date().toLocaleDateString('fr-FR', {
			weekday: 'long',
			day: 'numeric',
			month: 'long'
		})
	);

	// Fonction pour capitaliser la première lettre
	function capitalizeFirstLetter(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}
</script>

<main class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
	<!-- Hero section -->
	<section class="py-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-indigo-700 sm:text-5xl">
			{#if user}
				Bonjour {capitalizeFirstLetter(user.username)}, nous sommes le {dateActuelle}
			{:else}
				Bienvenue sur HelpingPlatform
			{/if}
		</h1>

		<p class="mx-auto max-w-3xl text-xl text-gray-600">
			La plateforme qui transforme vos actions en récompenses pour vous motiver au quotidien.
		</p>

		{#if !user}
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					href="/auth/register"
					class="rounded-lg bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
				>
					Commencer maintenant
				</a>
				<a
					href="/auth/login"
					class="rounded-lg bg-blue-100 px-5 py-3 text-blue-700 transition hover:bg-blue-200"
				>
					Se connecter
				</a>
			</div>
		{/if}
	</section>

	<!-- Comment ça marche -->
	<section class="py-12">
		<h2 class="mb-12 text-center text-3xl font-semibold">Comment ça marche</h2>

		<div class="mb-12 grid gap-8 md:grid-cols-3">
			<div class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
					<svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold text-indigo-700">1. Créez des tâches</h3>
				<p class="text-gray-600">
					Ajoutez vos tâches quotidiennes et assignez-leur un nombre de points selon leur
					difficulté.
				</p>
			</div>

			<div class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-fuchsia-100"
				>
					<svg
						class="h-8 w-8 text-fuchsia-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold text-indigo-700">2. Accomplissez-les</h3>
				<p class="text-gray-600">
					Validez vos tâches une fois terminées et récoltez les points associés automatiquement.
				</p>
			</div>

			<div class="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-100"
				>
					<svg
						class="h-8 w-8 text-indigo-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				</div>
				<h3 class="mb-2 text-xl font-semibold text-indigo-700">3. Dépensez vos points</h3>
				<p class="text-gray-600">
					Utilisez vos points accumulés pour vous récompenser et vous faire plaisir dans la
					boutique.
				</p>
			</div>
		</div>

		{#if user}
			<div class="text-center">
				<a
					href="/task"
					class="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
				>
					Voir mes tâches
				</a>
			</div>
		{/if}
	</section>

	<!-- Témoignage / Citation -->
	<section class="rounded-xl bg-gray-50 py-12">
		<div class="mx-auto max-w-4xl px-4 text-center">
			<p class="mb-6 text-xl text-gray-600 italic">
				"HelpingPlatform est un outil idéal pour transformer votre productivité en récompenses
				concrètes. En gamifiant vos objectifs quotidiens, vous serez plus motivé que jamais à
				accomplir vos tâches."
			</p>
			<p class="font-semibold text-indigo-700">L'équipe HelpingPlatform</p>
		</div>
	</section>
</main>
