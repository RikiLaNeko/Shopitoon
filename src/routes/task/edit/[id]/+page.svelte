<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;
	export let form;

	// Récupération des données de la tâche
	const task = data.task;

	// État pour afficher/masquer les options de récurrence
	let showRecurrenceOptions = !!task.isRecurring;
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-fuchsia-100 to-indigo-200 px-4 py-12"
>
	<div
		class="hover:shadow-3xl w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl transition-all duration-300 hover:scale-105"
	>
		<h1 class="mb-6 text-center text-3xl font-extrabold text-blue-700 drop-shadow">
			Modifier la tâche
		</h1>
		<form method="post" use:enhance action="?/edit" class="space-y-6">
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="title">Titre</label>
				<input
					id="title"
					name="title"
					value={task.title}
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
					placeholder="Décrivez la tâche">{task.description}</textarea
				>
			</div>
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="points">Points</label>
				<input
					id="points"
					name="points"
					type="number"
					min="1"
					value={task.points}
					required
					class="block w-full rounded-lg border-2 border-indigo-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50"
					placeholder="Nombre de points"
				/>
			</div>
			<div>
				<label class="mb-1 block font-semibold text-gray-700" for="priority">Priorité</label>
				<input
					id="priority"
					name="priority"
					type="number"
					min="0"
					value={task.priority || 0}
					class="block w-full rounded-lg border-2 border-purple-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50"
					placeholder="Niveau de priorité"
				/>
			</div>

			<!-- Option de récurrence -->
			<div class="flex items-center">
				<input
					id="isRecurring"
					name="isRecurring"
					type="checkbox"
					checked={task.isRecurring}
					class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					on:change={() => (showRecurrenceOptions = !showRecurrenceOptions)}
				/>
				<label for="isRecurring" class="ml-2 block font-semibold text-gray-700">
					Tâche récurrente
				</label>
			</div>

			{#if showRecurrenceOptions}
				<div class="space-y-4 rounded-lg border-2 border-blue-100 bg-blue-50 p-4">
					<div>
						<label class="mb-1 block font-semibold text-gray-700" for="recurrenceType"
							>Type de récurrence</label
						>
						<select
							id="recurrenceType"
							name="recurrenceType"
							required={showRecurrenceOptions}
							class="block w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50"
						>
							<option value="daily" selected={task.recurrenceType === 'daily'}>Quotidien</option>
							<option value="weekly" selected={task.recurrenceType === 'weekly'}
								>Hebdomadaire</option
							>
							<option value="monthly" selected={task.recurrenceType === 'monthly'}>Mensuel</option>
						</select>
					</div>

					<div>
						<label class="mb-1 block font-semibold text-gray-700" for="recurrenceInterval"
							>Intervalle</label
						>
						<input
							id="recurrenceInterval"
							name="recurrenceInterval"
							type="number"
							min="1"
							value={task.recurrenceInterval || 1}
							required={showRecurrenceOptions}
							class="block w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50"
							placeholder="Intervalle de récurrence"
						/>
					</div>

					<div>
						<label class="mb-1 block font-semibold text-gray-700" for="recurrenceCount"
							>Nombre de répétitions</label
						>
						<input
							id="recurrenceCount"
							name="recurrenceCount"
							type="number"
							min="1"
							value={task.recurrenceCount || 1}
							class="block w-full rounded-lg border-2 border-blue-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50"
							placeholder="Nombre de répétitions"
						/>
					</div>
				</div>
			{/if}

			{#if form?.message}
				<div
					class="mb-2 rounded-md border-l-4 border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-md"
				>
					{form.message}
				</div>
			{/if}
			<div class="flex gap-3">
				<button
					type="submit"
					class="flex-1 rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-4 py-3 text-lg font-bold text-white shadow-md transition hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Enregistrer
				</button>
				<a
					href="/task"
					class="flex-1 rounded-lg bg-gray-200 px-4 py-3 text-center text-lg font-bold text-gray-700 shadow-md transition hover:scale-105 hover:bg-gray-300 hover:shadow-lg"
				>
					Annuler
				</a>
			</div>
		</form>
	</div>
</div>
