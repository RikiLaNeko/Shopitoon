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

	// Fonction pour capitaliser la première lettre
	function capitalizeFirstLetter(str: string): string {
		if (!str) return '';
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}
</script>

<header
	class="sticky top-0 z-50 bg-white/75 shadow-md backdrop-blur-md transition-all duration-300"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo et nom du site -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" class="flex items-center space-x-2">
					<div
						class="animate-gradient-x flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 font-bold text-white"
					>
						HP
					</div>
					<span
						class="bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 bg-clip-text text-lg font-bold text-transparent"
					>
						HelpingPlatform
					</span>
				</a>
			</div>

			<!-- Navigation principale (desktop) -->
			<nav class="hidden space-x-6 md:flex">
				<a
					href="/"
					class="text-gray-700 transition-all duration-200 hover:scale-105 hover:text-indigo-600 {$page
						.url.pathname === '/'
						? 'font-medium text-indigo-600'
						: 'font-normal'}"
				>
					Accueil
				</a>
				{#if user}
					<a
						href="/task"
						class="text-gray-700 transition-all duration-200 hover:scale-105 hover:text-fuchsia-600 {$page.url.pathname.startsWith(
							'/task'
						)
							? 'font-medium text-fuchsia-600'
							: 'font-normal'}"
					>
						Tâches
					</a>
					<a
						href="/shop"
						class="text-gray-700 transition-all duration-200 hover:scale-105 hover:text-blue-600 {$page.url.pathname.startsWith(
							'/shop'
						)
							? 'font-medium text-blue-600'
							: 'font-normal'}"
					>
						Boutique
					</a>
					<a
						href="/calendar"
						class="text-gray-700 transition-all duration-200 hover:scale-105 hover:text-indigo-600 {$page.url.pathname.startsWith(
							'/calendar'
						)
							? 'font-medium text-indigo-600'
							: 'font-normal'}"
					>
						Calendrier
					</a>
				{/if}
			</nav>

			<!-- Navigation utilisateur (desktop) -->
			<div class="hidden items-center space-x-3 md:flex">
				{#if user}
					<!-- Points utilisateur -->
					<div class="relative">
						<span
							class="flex items-center rounded-full bg-gradient-to-r from-fuchsia-100 to-blue-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition-all hover:scale-105 hover:shadow-sm"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-1 h-4 w-4 text-indigo-600"
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
							{user.nombreOfPoints} points
						</span>
					</div>

					<!-- Menu profil -->
					<div class="relative">
						<button
							on:click={toggleProfileMenu}
							class="flex items-center rounded-full bg-white/90 p-0.5 text-gray-700 shadow-sm ring-1 ring-gray-300/50 transition-all duration-200 hover:scale-105 hover:bg-indigo-50 hover:ring-indigo-300"
						>
							<span class="sr-only">Ouvrir le menu utilisateur</span>
							<!-- Avatar de l'utilisateur -->
							<img
								src={$page.data.user?.avatarUrl ||
									'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
								alt="Avatar"
								class="h-8 w-8 rounded-full object-cover"
							/>
						</button>

						{#if isProfileMenuOpen}
							<div
								class="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white/90 py-1 shadow-lg ring-1 ring-black backdrop-blur-sm transition-all focus:outline-none"
							>
								<div class="flex items-center gap-2 border-b border-gray-100 px-4 py-2">
									<img
										src={$page.data.user?.avatarUrl ||
											'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
										alt="Avatar"
										class="h-8 w-8 rounded-full object-cover"
									/>
									<div>
										<div class="text-sm font-medium text-indigo-700">
											{capitalizeFirstLetter($page.data.user?.username || 'Utilisateur')}
										</div>
										<div class="text-xs text-gray-500">{$page.data.user?.email}</div>
									</div>
								</div>
								<a
									href="/profile"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
									on:click={closeProfileMenu}
								>
									Mon profil
								</a>
								<form action="/auth/logout" method="post">
									<button
										type="submit"
										class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
									>
										Déconnexion
									</button>
								</form>
							</div>
						{/if}
					</div>
				{:else}
					<div class="flex items-center space-x-2">
						<a
							href="/auth/login"
							class="rounded-md px-3 py-1.5 text-sm font-medium text-indigo-600 transition-all duration-200 hover:scale-105 hover:bg-indigo-50"
						>
							Connexion
						</a>
						<a
							href="/auth/register"
							class="animate-gradient-x rounded-md bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105"
						>
							Inscription
						</a>
					</div>
				{/if}
			</div>

			<!-- Bouton menu burger (mobile) -->
			<button
				on:click={toggleMenu}
				type="button"
				class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset md:hidden"
			>
				<span class="sr-only">{isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
				{#if isMenuOpen}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Menu mobile -->
	{#if isMenuOpen}
		<div class="bg-white/85 shadow-lg backdrop-blur-md transition-all duration-200 md:hidden">
			<nav class="space-y-2 px-4 pt-2 pb-4">
				<a
					href="/"
					on:click={closeMenu}
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50/80 hover:text-indigo-600 {$page
						.url.pathname === '/'
						? 'bg-indigo-50/80 text-indigo-600'
						: ''}"
				>
					Accueil
				</a>
				{#if user}
					<a
						href="/task"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-fuchsia-50/80 hover:text-fuchsia-600 {$page.url.pathname.startsWith(
							'/task'
						)
							? 'bg-fuchsia-50/80 text-fuchsia-600'
							: ''}"
					>
						Tâches
					</a>
					<a
						href="/shop"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 {$page.url.pathname.startsWith(
							'/shop'
						)
							? 'bg-blue-50/80 text-blue-600'
							: ''}"
					>
						Boutique
					</a>

					<div class="my-3 border-t border-indigo-100"></div>

					<!-- Affichage de l'avatar et du nom d'utilisateur -->
					<div class="flex items-center gap-2 px-3 py-2">
						<img
							src={$page.data.user?.avatarUrl ||
								'https://api.dicebear.com/7.x/bottts/svg?seed=default'}
							alt="Avatar"
							class="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
						/>
						<div>
							<div class="font-medium text-indigo-700">
								{capitalizeFirstLetter($page.data.user?.username || 'Utilisateur')}
							</div>
							<div class="text-xs text-gray-500">{$page.data.user?.email}</div>
						</div>
					</div>

					<div
						class="mx-3 inline-block rounded-full bg-gradient-to-r from-fuchsia-100 to-blue-100 px-3 py-1 text-xs font-semibold text-indigo-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 inline h-3 w-3 text-indigo-600"
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
						{user.nombreOfPoints} points
					</div>

					<a
						href="/profile"
						on:click={closeMenu}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50/80 hover:text-indigo-600"
					>
						Mon profil
					</a>
					<form action="/auth/logout" method="post">
						<button
							type="submit"
							class="w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50/80"
						>
							Déconnexion
						</button>
					</form>
				{:else}
					<div class="my-3 border-t border-indigo-100"></div>
					<div class="flex flex-col space-y-2">
						<a
							href="/auth/login"
							on:click={closeMenu}
							class="block rounded-md px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50/80"
						>
							Connexion
						</a>
						<a
							href="/auth/register"
							on:click={closeMenu}
							class="animate-gradient-x block rounded-md bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 px-3 py-2 text-base font-medium text-white"
						>
							Inscription
						</a>
					</div>
				{/if}
			</nav>
		</div>
	{/if}
</header>

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
</style>
