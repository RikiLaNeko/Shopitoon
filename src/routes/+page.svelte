<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived($page.data.user);

	// Formatage de la date en français
	const dateActuelle = $derived(
		new Date().toLocaleDateString('fr-FR', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	// Fonction pour capitaliser la première lettre
	function capitalizeFirstLetter(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}
</script>

<main
	class="animate-fade-in min-h-screen bg-gradient-to-br from-fuchsia-400 via-indigo-300 to-blue-400"
>
	<div class="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
		<!-- Section d'introduction -->
		<div class="py-12 text-center">
			<h1 class="mb-6 text-5xl font-bold text-white drop-shadow-md">
				Bienvenue sur HelpingPlatform
			</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-white/90 drop-shadow">
				Aujourd'hui, nous sommes le {dateActuelle}. {#if user}Bonjour, {capitalizeFirstLetter(
						user.username
					)} !{/if}
			</p>
			{#if !user}
				<div class="mt-8 flex justify-center space-x-4">
					<a
						href="/auth/login"
						class="rounded-lg bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/30"
					>
						Connexion
					</a>
					<a
						href="/auth/register"
						class="rounded-lg bg-indigo-600/90 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-indigo-700"
					>
						Inscription
					</a>
				</div>
			{/if}
		</div>

		<!-- Cartes informatives -->
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<!-- Carte 1 -->
			<div
				class="group rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl"
			>
				<div class="mb-4 inline-block rounded-full bg-indigo-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-indigo-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
				</div>
				<h2 class="mb-3 text-2xl font-bold text-indigo-700">Créez des tâches</h2>
				<p class="text-gray-600">
					Ajoutez vos tâches quotidiennes et assignez-leur un nombre de points selon leur
					difficulté.
				</p>
			</div>

			<!-- Carte 2 -->
			<div
				class="group rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl"
			>
				<div class="mb-4 inline-block rounded-full bg-fuchsia-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-fuchsia-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 class="mb-3 text-2xl font-bold text-fuchsia-700">Accomplissez-les</h2>
				<p class="text-gray-600">
					En terminant vos tâches, cumulez des points qui pourront être échangés contre des
					récompenses.
				</p>
			</div>

			<!-- Carte 3 -->
			<div
				class="group rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl"
			>
				<div class="mb-4 inline-block rounded-full bg-blue-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-blue-600"
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
				</div>
				<h2 class="mb-3 text-2xl font-bold text-blue-700">Gagnez des récompenses</h2>
				<p class="text-gray-600">
					Utilisez vos points pour obtenir des récompenses personnalisées dans notre boutique.
				</p>
			</div>
		</div>

		<!-- Section de témoignage -->
		<section
			class="mt-16 rounded-xl bg-white/70 px-6 py-12 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80"
		>
			<div class="mx-auto max-w-4xl text-center">
				<p class="mb-6 text-xl text-indigo-800/90 italic">
					"HelpingPlatform est un outil idéal pour transformer votre productivité en récompenses
					concrètes. En gamifiant vos objectifs quotidiens, vous serez plus motivé que jamais à
					accomplir vos tâches."
				</p>
				<p class="font-semibold text-fuchsia-700">L'équipe HelpingPlatform</p>
			</div>
		</section>
	</div>
</main>

<style>
	@keyframes gradient-x {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
	.animate-gradient-x {
		background-size: 200% 200%;
		animation: gradient-x 4s ease-in-out infinite;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.98);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fade-in {
		animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
	}
</style>
