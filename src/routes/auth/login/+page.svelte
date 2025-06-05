<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 px-4 py-12 sm:px-6 lg:px-8"
>
	<div
		class="hover:shadow-3xl w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300"
	>
		<div class="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
			<h1 class="text-4xl font-bold tracking-tight">Connexion</h1>
			<p class="mt-3 text-indigo-100">Accédez à votre compte pour continuer.</p>
		</div>

		<div class="p-8">
			<form method="post" action="?/login" use:enhance class="space-y-6">
				<div class="space-y-5">
					<div>
						<label for="username" class="block text-sm font-semibold text-gray-800">
							Nom d'utilisateur
						</label>
						<div class="mt-2 rounded-lg shadow-sm">
							<input
								id="username"
								name="username"
								type="text"
								required
								class="block w-full rounded-lg border-gray-300 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-colors duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
								placeholder="Entrez votre nom d'utilisateur"
							/>
						</div>
					</div>

					<div>
						<div class="flex items-center justify-between">
							<label for="password" class="block text-sm font-semibold text-gray-800">
								Mot de passe
							</label>
							<a
								href="#"
								class="text-xs font-medium text-indigo-600 transition-colors duration-150 ease-in-out hover:text-indigo-500"
							>
								Mot de passe oublié ?
							</a>
						</div>
						<div class="mt-2 rounded-lg shadow-sm">
							<input
								id="password"
								name="password"
								type="password"
								required
								class="block w-full rounded-lg border-gray-300 px-4 py-3.5 text-gray-900 placeholder-gray-400 transition-colors duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
								placeholder="••••••••"
							/>
						</div>
					</div>
				</div>

				{#if form?.message}
					<div class="rounded-md border-l-4 border-red-600 bg-red-50 p-4 shadow-md">
						<div class="flex">
							<div class="flex-shrink-0">
								<svg
									class="h-5 w-5 text-red-500"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
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
						class="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-150 ease-in-out hover:from-indigo-700 hover:to-purple-800 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
					>
						<span class="absolute inset-y-0 left-0 flex items-center pl-4">
							<svg
								class="h-5 w-5 text-indigo-300 transition-colors duration-150 ease-in-out group-hover:text-indigo-100"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</span>
						Se connecter
					</button>
				</div>
			</form>

			<div class="mt-8 text-center">
				<p class="text-sm text-gray-600">
					Pas encore de compte ?
					<a
						href="/auth/register"
						class="font-semibold text-indigo-600 transition-colors duration-150 ease-in-out hover:text-indigo-500"
					>
						Inscrivez-vous ici
					</a>
				</p>
			</div>
		</div>
	</div>
</div>
