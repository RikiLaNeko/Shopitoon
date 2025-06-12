<script lang="ts">
	import { page } from '$app/stores';

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived(
		$page.data?.user ||
			($page.data?.userPoints !== undefined && { nombreOfPoints: $page.data.userPoints })
	);
</script>

<footer class="mt-16 border-t border-blue-100 bg-white/80 py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-4 flex items-center md:mb-0">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 font-bold text-white"
				>
					ST
				</div>
				<span class="ml-2 text-lg font-semibold text-blue-700">Shopitoon</span>
			</div>

			<div class="flex flex-wrap justify-center gap-6 md:gap-8">
				<a href="/" class="text-sm text-gray-600 transition hover:text-indigo-600">Accueil</a>
				{#if user}
					<a href="/task" class="text-sm text-gray-600 transition hover:text-indigo-600">Tâches</a>
					<a href="/shop" class="text-sm text-gray-600 transition hover:text-indigo-600">Boutique</a
					>
				{/if}
				<a href="#" class="text-sm text-gray-600 transition hover:text-indigo-600"
					>Politique de confidentialité</a
				>
				<a href="#" class="text-sm text-gray-600 transition hover:text-indigo-600"
					>Conditions d'utilisation</a
				>
			</div>

			<div class="mt-4 flex space-x-4 md:mt-0">
				<a href="#" class="text-gray-500 transition hover:text-blue-600">
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
						/>
					</svg>
				</a>
				<a href="#" class="text-gray-500 transition hover:text-blue-400">
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
						/>
					</svg>
				</a>
				<a href="#" class="text-gray-500 transition hover:text-red-500">
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.65 19.14a.81.81 0 0 1-1.03.6 8.797 8.797 0 0 1-4.32-1.65 18.986 18.986 0 0 1-3.01-2.78 19.142 19.142 0 0 1-2.78-3.01 8.783 8.783 0 0 1-1.65-4.32.81.81 0 0 1 .6-1.04c.25-.07.5.02.68.21l2.08 2.09c.18.19.23.46.12.7l-.57 1.4c-.07.18-.04.38.08.54a13.986 13.986 0 0 0 2.55 2.55c.16.12.36.15.54.08l1.4-.59c.23-.1.51-.04.7.14l2.08 2.09c.19.19.28.44.21.69z"
						/>
					</svg>
				</a>
			</div>
		</div>

		<div class="mt-8 text-center text-sm text-gray-500">
			<p>&copy; 2025 - {new Date().getFullYear()} Shopitoon. Tous droits réservés.</p>
		</div>
	</div>
</footer>
