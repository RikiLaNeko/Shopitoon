<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-fuchsia-100 to-indigo-200 px-4 py-12"
>
	<div
		class="hover:shadow-3xl w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl transition-all duration-300 hover:scale-105"
	>
		<h1 class="mb-6 text-center text-3xl font-extrabold text-blue-700 drop-shadow">
			Ajouter une tâche
		</h1>
		<form method="post" use:enhance action="?/add" class="space-y-6">
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="title">Titre</label>
				<input
					id="title"
					name="title"
					required
					class="block w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50"
					placeholder="Titre de la tâche"
				/>
			</div>
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="description">Description</label>
				<textarea
					id="description"
					name="description"
					required
					class="block w-full rounded-lg border-2 border-fuchsia-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-400/50"
					placeholder="Décrivez la tâche"
				></textarea>
			</div>
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="points">Points</label>
				<input
					id="points"
					name="points"
					type="number"
					min="1"
					required
					class="block w-full rounded-lg border-2 border-indigo-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50"
					placeholder="Nombre de points"
				/>
			</div>
			{#if form?.message}
				<div
					class="mb-2 rounded-md border-l-4 border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-md"
				>
					{form.message}
				</div>
			{/if}
			<button
				type="submit"
				class="w-full rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-4 py-3 text-lg font-bold text-white shadow-md transition hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Ajouter
			</button>
		</form>
	</div>
</div>
