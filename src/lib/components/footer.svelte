<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived(
		$page.data?.user ||
			($page.data?.userPoints !== undefined && { nombreOfPoints: $page.data.userPoints })
	);
</script>

<footer class="relative border-t border-blue-100/30 bg-gradient-to-br from-fuchsia-400 via-indigo-300 to-blue-400 py-8 shadow-inner">
	<!-- Effet de dégradé sur le bord supérieur -->
	<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600"></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-4 flex items-center md:mb-0">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 font-bold text-white"
				>
					ST
				</div>
				<span class="ml-2 text-lg font-semibold bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Shopitoon</span>
			</div>

			<div class="flex flex-wrap justify-center gap-6 md:gap-8">
				<a href="/" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-indigo-600">Accueil</a>
				{#if user}
					<a href="/task" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-fuchsia-600">Tâches</a>
					<a href="/shop" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-blue-600">Boutique</a>
					<a href="/calendar" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-indigo-600">Calendrier</a>
					<a href="/profile" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-fuchsia-600">Profil</a>
				{/if}
				<a href="/privacy-policy" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-indigo-600"
					>Politique de confidentialité</a
				>
				<a href="/terms-of-service" class="text-sm text-gray-600 transition-all duration-200 hover:scale-105 hover:text-blue-600"
					>Conditions d'utilisation</a
				>
			</div>

			<div class="mt-4 flex space-x-4 md:mt-0">
				<a
					href="mailto:chloe.mortreux@proton.me"
					class="rounded-full bg-gray-100 p-2 text-gray-500 transition-all duration-200 hover:scale-110 hover:bg-indigo-100 hover:text-indigo-600"
					title="Email"
				>
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
					</svg>
				</a>
				<a
					href="https://github.com/RikiLaNeko/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-gray-100 p-2 text-gray-500 transition-all duration-200 hover:scale-110 hover:bg-violet-100 hover:text-violet-600"
					title="GitHub"
				>
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</a>
				<a
					href="https://portfolio-rikilanekos-projects.vercel.app/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full bg-gray-100 p-2 text-gray-500 transition-all duration-200 hover:scale-110 hover:bg-blue-100 hover:text-blue-600"
					title="Portfolio"
				>
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
					</svg>
				</a>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-gray-500">
			<p>&copy; 2025 - {new Date().getFullYear()} Shopitoon. Tous droits réservés.</p>
			<p class="mt-1 text-xs text-gray-400">
				Une application conçue par <a href="https://github.com/RikiLaNeko/" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:text-fuchsia-500 transition">Chloé Mortreux</a>
			</p>
		</div>
	</div>
</footer>
