<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-50 to-indigo-100 px-4 py-12"
>
	<div class="w-full max-w-2xl rounded-2xl bg-white/90 p-8 shadow-2xl">
		<h1 class="mb-4 text-center text-4xl font-extrabold text-blue-700 drop-shadow">
			Liste des tâches
		</h1>
		<h2 class="mb-8 text-center text-xl font-semibold text-indigo-700">
			Nombre de points : <span class="font-bold">{data.user?.nombreOfPoints ?? 0}</span>
		</h2>
		<div class="mb-8 flex justify-center">
			<a
				href="/task/add"
				class="inline-block rounded-lg bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow transition hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
			>
				Ajouter une tâche
			</a>
		</div>
		{#if data.tasks.length === 0}
			<p class="text-center text-gray-500">Aucune tâche pour le moment.</p>
		{:else}
			<ul class="space-y-4">
				{#each data.tasks as task}
					<li
						class="flex items-center justify-between rounded-xl border-l-4 border-blue-400 bg-white p-5 shadow"
					>
						<div>
							<div class="text-lg font-bold text-blue-700">{task.title}</div>
							<div class="text-sm text-gray-500">{task.description}</div>
						</div>
						<div class="flex items-center gap-3">
							<span class="text-xl font-bold text-fuchsia-600">{task.points} pts</span>
							{#if !task.completed}
								<form method="post" action="?/validate" use:enhance>
									<input type="hidden" name="id" value={task.id} />
									<button
										class="ml-2 rounded bg-green-500 px-3 py-1 text-white transition hover:bg-green-600"
										title="Valider"
									>
										✓
									</button>
								</form>
							{/if}
							<a
								href={`/task/edit/${task.id}`}
								class="ml-2 rounded bg-yellow-400 px-3 py-1 text-white transition hover:bg-yellow-500"
								title="Modifier"
							>
								✎
							</a>
							<form method="post" action="?/delete" use:enhance>
								<input type="hidden" name="id" value={task.id} />
								<button
									class="ml-2 rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
									title="Supprimer"
								>
									🗑
								</button>
							</form>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
