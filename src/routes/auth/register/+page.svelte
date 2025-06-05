<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div
	class="animate-fade-in flex min-h-screen items-center justify-center bg-gradient-to-br from-fuchsia-400 via-indigo-300 to-blue-400"
>
	<div
		class="hover:shadow-3xl w-full max-w-md overflow-hidden rounded-3xl bg-white/90 shadow-2xl transition-all duration-300 hover:scale-105"
	>
		<div
			class="animate-gradient-x bg-gradient-to-r from-fuchsia-700 via-indigo-600 to-blue-600 p-8 text-white"
		>
			<h1 class="text-4xl font-extrabold tracking-tight drop-shadow-lg">Inscription</h1>
			<p class="mt-3 text-fuchsia-100">Créez votre nouveau compte rapidement.</p>
		</div>

		<div class="space-y-6 p-8">
			<form method="post" action="?/register" use:enhance class="space-y-6">
				<div class="space-y-5">
					<div>
						<label for="username" class="block text-sm font-semibold text-gray-800"
							>Nom d'utilisateur</label
						>
						<div class="mt-2 rounded-lg shadow-sm">
							<input
								id="username"
								name="username"
								type="text"
								required
								class="block w-full rounded-lg border-2 border-fuchsia-200 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-all duration-150 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-400/50"
								placeholder="Ex: superutilisateur77"
							/>
						</div>
					</div>
					<div>
						<label for="email" class="block text-sm font-semibold text-gray-800"
							>Adresse e-mail</label
						>
						<div class="mt-2 rounded-lg shadow-sm">
							<input
								id="email"
								name="email"
								type="email"
								required
								class="block w-full rounded-lg border-2 border-indigo-200 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-all duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50"
								placeholder="votre.email@exemple.com"
							/>
						</div>
					</div>
					<div>
						<label for="password" class="block text-sm font-semibold text-gray-800"
							>Mot de passe</label
						>
						<div class="mt-2 rounded-lg shadow-sm">
							<input
								id="password"
								name="password"
								type="password"
								required
								class="block w-full rounded-lg border-2 border-blue-200 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-all duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50"
								placeholder="Minimum 6 caractères"
							/>
						</div>
					</div>
				</div>

				{#if form?.message}
					<div class="animate-bounce rounded-md border-l-4 border-red-600 bg-red-50 p-4 shadow-md">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 8a1 1 0 100-2 1 1 0 000 2z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-red-700">{form.message}</p>
							</div>
						</div>
					</div>
				{/if}

				<div>
					<button
						type="submit"
						class="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-700 px-4 py-3.5 text-lg font-bold text-white shadow-md transition-all duration-150 hover:scale-105 hover:from-fuchsia-700 hover:to-blue-800 hover:shadow-lg focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
					>
						<span class="absolute inset-y-0 left-0 flex items-center pl-4">
							<svg
								class="h-5 w-5 text-fuchsia-200 transition-colors duration-150 group-hover:text-fuchsia-100"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
									clip-rule="evenodd"
								></path>
							</svg>
						</span>
						S'inscrire
					</button>
				</div>
			</form>

			<div class="mt-8 text-center">
				<p class="text-sm text-gray-600">
					Déjà un compte ?
					<a
						href="/auth/login"
						class="font-semibold text-indigo-600 transition-colors duration-150 hover:text-fuchsia-500"
						>Connectez-vous</a
					>
				</p>
				<div class="mt-4 flex justify-center gap-4">
					<button
						class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow transition hover:bg-gray-50"
					>
						<img
							src="https://icongr.am/devicon/google-original.svg?size=20"
							alt="Google"
							class="h-5 w-5"
						/>
						Google
					</button>
					<button
						class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow transition hover:bg-gray-50"
					>
						<img
							src="https://icongr.am/devicon/github-original.svg?size=20"
							alt="GitHub"
							class="h-5 w-5"
						/>
						GitHub
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

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
