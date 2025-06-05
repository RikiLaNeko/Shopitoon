<script lang="ts">
	// Correction de la syntaxe des props avec Svelte 5
	export let task = $props({
		id: '',
		title: '',
		description: '',
		points: 1,
		priority: 0,
		isRecurring: false,
		recurrenceType: 'daily',
		recurrenceInterval: 1,
		recurrenceCount: 1
	});

	const recurrenceTypes = [
		{ value: 'daily', label: 'Quotidien' },
		{ value: 'weekly', label: 'Hebdomadaire' },
		{ value: 'monthly', label: 'Mensuel' }
	];
</script>

<div class="space-y-4 rounded-lg bg-white p-6 shadow-md">
	<div>
		<label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
		<input
			type="text"
			id="title"
			name="title"
			bind:value={task.title}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
			required
		/>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea
			id="description"
			name="description"
			bind:value={task.description}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		></textarea>
	</div>

	<div>
		<label for="points" class="block text-sm font-medium text-gray-700">Points</label>
		<input
			type="number"
			id="points"
			name="points"
			bind:value={task.points}
			min="1"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
			required
		/>
	</div>

	<div>
		<label for="priority" class="block text-sm font-medium text-gray-700">Priorité</label>
		<select
			id="priority"
			name="priority"
			bind:value={task.priority}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		>
			<option value="0">Basse</option>
			<option value="1">Moyenne</option>
			<option value="2">Haute</option>
		</select>
	</div>

	<div class="flex items-center">
		<input
			type="checkbox"
			id="isRecurring"
			name="isRecurring"
			bind:checked={task.isRecurring}
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
		/>
		<label for="isRecurring" class="ml-2 block text-sm font-medium text-gray-700">
			Tâche récurrente
		</label>
	</div>

	{#if task.isRecurring}
		<div class="space-y-4 border-l-2 border-indigo-200 pl-6">
			<div>
				<label for="recurrenceType" class="block text-sm font-medium text-gray-700"
					>Type de récurrence</label
				>
				<select
					id="recurrenceType"
					name="recurrenceType"
					bind:value={task.recurrenceType}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					{#each recurrenceTypes as type (type.value)}
						<option value={type.value}>{type.label}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="recurrenceInterval" class="block text-sm font-medium text-gray-700">
					Tous les
				</label>
				<div class="mt-1 flex items-center gap-2">
					<input
						type="number"
						id="recurrenceInterval"
						name="recurrenceInterval"
						bind:value={task.recurrenceInterval}
						min="1"
						class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					<span class="text-sm text-gray-500">
						{task.recurrenceType === 'daily'
							? 'jours'
							: task.recurrenceType === 'weekly'
								? 'semaines'
								: 'mois'}
					</span>
				</div>
			</div>

			<div>
				<label for="recurrenceCount" class="block text-sm font-medium text-gray-700">
					Nombre de fois par jour
				</label>
				<input
					type="number"
					id="recurrenceCount"
					name="recurrenceCount"
					bind:value={task.recurrenceCount}
					min="1"
					class="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				/>
			</div>
		</div>
	{/if}
</div>
