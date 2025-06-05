<script lang="ts">
	import { page } from '$app/stores';
	let isMenuOpen = $state(false);
	let isProfileMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleProfileMenu() {
		isProfileMenuOpen = !isProfileMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function closeProfileMenu() {
		isProfileMenuOpen = false;
	}

	// Utilisation de $derived pour la réactivité avec les runes
	const user = $derived(
		$page.data?.user ||
			($page.data?.userPoints !== undefined && { nombreOfPoints: $page.data.userPoints })
	);
</script>

<header class="sticky top-0 z-50 bg-white/90 shadow-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo et nom du site -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" class="flex items-center gap-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 font-bold text-white"
					>
						HP
					</div>
					<span class="text-lg font-semibold text-blue-700">HelpingPlatform</span>
				</a>
			</div>

			<!-- Navigation principale (desktop) -->
			<nav class="hidden space-x-6 md:flex">
				<a
					href="/"
					class={`font-medium transition ${$page.url.pathname === '/' ? 'text-fuchsia-600' : 'text-gray-600 hover:text-indigo-600'}`}
				>
					Accueil
				</a>
				{#if user}
					<a
						href="/task"
						class={`font-medium transition ${$page.url.pathname.startsWith('/task') ? 'text-fuchsia-600' : 'text-gray-600 hover:text-indigo-600'}`}
					>
						Tâches
					</a>
					<a
						href="/shop"
						class={`font-medium transition ${$page.url.pathname.startsWith('/shop') ? 'text-fuchsia-600' : 'text-gray-600 hover:text-indigo-600'}`}
					>
						Boutique
					</a>
				{/if}
			</nav>

			<!-- Navigation utilisateur (desktop) -->
			<div class="hidden items-center space-x-3 md:flex">
				{#if user}
					<div class="relative">
						<button
							on:click={toggleProfileMenu}
							class="flex items-center space-x-1 text-sm font-medium text-indigo-700 transition hover:text-fuchsia-600"
						>
							<span>{$page.data.user?.username || 'Utilisateur'}</span>
							<span
								class="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700"
							>
								{$page.data.user?.nombreOfPoints || $page.data.userPoints || 0} pts
							</span>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						{#if isProfileMenuOpen}
							<div class="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
								<a
									href="/profile"
									class="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
									on:click={closeProfileMenu}>Mon profil</a
								>
								<div class="my-1 border-t border-gray-100"></div>
								<form action="/auth/logout" method="post">
									<button
										type="submit"
										class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
										>Déconnexion</button
									>
								</form>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href="/auth/login"
						class="rounded-lg bg-blue-100 px-3 py-1.5 text-sm text-blue-700 transition hover:bg-blue-200"
					>
						Connexion
					</a>
					<a
						href="/auth/register"
						class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white transition hover:bg-indigo-700"
					>
						Inscription
					</a>
				{/if}
			</div>

			<!-- Bouton menu burger (mobile) -->
			<button
				type="button"
				class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 md:hidden"
				on:click={toggleMenu}
				aria-label="Menu principal"
			>
				{#if !isMenuOpen}
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				{:else}
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Menu mobile -->
	{#if isMenuOpen}
		<div class="bg-white/95 shadow-lg transition-all duration-200 md:hidden">
			<nav class="space-y-2 px-4 pt-2 pb-4">
				<a
					href="/"
					on:click={closeMenu}
					class={`block rounded-md px-3 py-2 font-medium ${$page.url.pathname === '/' ? 'bg-indigo-50 text-fuchsia-600' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
				>
					Accueil
				</a>
				{#if user}
					<a
						href="/task"
						on:click={closeMenu}
						class={`block rounded-md px-3 py-2 font-medium ${$page.url.pathname.startsWith('/task') ? 'bg-indigo-50 text-fuchsia-600' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
					>
						Tâches
					</a>
					<a
						href="/shop"
						on:click={closeMenu}
						class={`block rounded-md px-3 py-2 font-medium ${$page.url.pathname.startsWith('/shop') ? 'bg-indigo-50 text-fuchsia-600' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
					>
						Boutique
					</a>

					<div class="my-3 border-t border-gray-200"></div>

					<div class="px-3 py-2 text-sm font-medium text-gray-700">
						Connecté en tant que <span class="font-bold text-indigo-700"
							>{$page.data.user?.username || 'Utilisateur'}</span
						>
					</div>
					<div class="px-3 py-1 text-xs font-semibold text-indigo-700">
						{$page.data.user?.nombreOfPoints || $page.data.userPoints || 0} points
					</div>
					<a
						href="/profile"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
					>
						Mon profil
					</a>
					<form action="/auth/logout" method="post">
						<button
							type="submit"
							class="w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50"
						>
							Déconnexion
						</button>
					</form>
				{:else}
					<div class="my-3 border-t border-gray-200"></div>
					<div class="flex flex-col space-y-2">
						<a
							href="/auth/login"
							on:click={closeMenu}
							class="block rounded-md bg-blue-100 px-3 py-2 text-center text-blue-700 transition hover:bg-blue-200"
						>
							Connexion
						</a>
						<a
							href="/auth/register"
							on:click={closeMenu}
							class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-white transition hover:bg-indigo-700"
						>
							Inscription
						</a>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</header>
