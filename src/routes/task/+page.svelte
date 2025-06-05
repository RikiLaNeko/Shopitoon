<script lang="ts">
	export let data;
	import { enhance } from '$app/forms';
	import type { Task } from '$lib/server/db/schema';
	import { notifications } from '$lib/stores/notification';
	import Notifications from '$lib/components/Notifications.svelte';
	import { page } from '$app/stores';
	import type { ActionResult } from '@sveltejs/kit';

	// Fonction pour formater la récurrence
	function formatRecurrence(task: Task) {
		if (!task.isRecurring) return '';

		const type = {
			daily: 'jour(s)',
			weekly: 'semaine(s)',
			monthly: 'mois'
		};

		return `Récurrent: tous les ${task.recurrenceInterval} ${type[task.recurrenceType as 'daily' | 'weekly' | 'monthly'] || ''}`;
	}

	// Fonction pour déterminer la classe de priorité
	function getPriorityClass(priority: number) {
		if (priority >= 8) return 'bg-red-100 border-red-400';
		if (priority >= 5) return 'bg-orange-100 border-orange-400';
		if (priority >= 2) return 'bg-yellow-100 border-yellow-400';
		return 'bg-white border-blue-400';
	}

	// Vérifier s'il y a des messages flash dans l'URL ou dans les données
	$: {
		const successMsg = $page.url.searchParams.get('success');
		if (successMsg) {
			notifications.add(successMsg, 'success');
		}

		const errorMsg = $page.url.searchParams.get('error');
		if (errorMsg) {
			notifications.add(errorMsg, 'error');
		}

		// Afficher les messages de flash si présents dans les données
		if (data.flash?.message) {
			notifications.add(data.flash.message, data.flash.type || 'info');
		}
	}

	// Fonction pour gérer la validation des tâches
	function handleValidateSubmit() {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			console.log('Résultat de la validation:', result);

			if (result.type === 'success') {
				// Utiliser directement la valeur des points de la tâche depuis le formulaire
				const form = document.querySelector('form[action="?/validate"]') as HTMLFormElement;
				const pointsInput = form?.querySelector('input[name="points"]') as HTMLInputElement;
				const points = pointsInput?.value || '?';

				notifications.add(`Tâche validée ! Vous avez gagné ${points} points.`, 'success');
				await update();
			} else if (result.type === 'failure' || result.type === 'error') {
				notifications.add(result.data?.message || 'Une erreur est survenue.', 'error');
			} else {
				notifications.add('Tâche validée avec succès !', 'success');
				await update();
			}
		};
	}

	// Fonction pour gérer la suppression des tâches
	function handleDeleteSubmit() {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			console.log('Résultat de la suppression:', result);

			if (result.type === 'success') {
				notifications.add('Tâche supprimée avec succès.', 'success');
				await update();
			} else if (result.type === 'failure' || result.type === 'error') {
				notifications.add(result.data?.message || 'Une erreur est survenue.', 'error');
			} else {
				notifications.add('Tâche supprimée avec succès.', 'success');
				await update();
			}
		};
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-50 to-indigo-100 px-4 py-12"
>
	<Notifications />
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
				{#each data.tasks as task (task.id)}
					<li
						class="flex items-center justify-between rounded-xl border-l-4 p-5 shadow {getPriorityClass(
							task.priority
						)}"
					>
						<div class="w-3/4">
							<div class="flex items-center gap-2">
								<div class="text-lg font-bold text-blue-700">{task.title}</div>
								{#if task.priority > 0}
									<span class="rounded-full bg-purple-500 px-2 py-0.5 text-xs text-white">
										Priorité: {task.priority}
									</span>
								{/if}
							</div>
							<div class="text-sm text-gray-500">{task.description}</div>
							{#if task.isRecurring}
								<div class="mt-1 text-xs font-medium text-blue-600">
									{formatRecurrence(task)}
									{#if task.nextDueDate}
										<span class="ml-2">
											Prochaine échéance: {new Date(task.nextDueDate).toLocaleDateString()}
										</span>
									{/if}
								</div>
							{/if}
						</div>
						<div class="flex items-center gap-3">
							<span class="text-xl font-bold text-fuchsia-600">{task.points} pts</span>
							{#if !task.completed}
								<form method="post" action="?/validate" use:enhance={handleValidateSubmit}>
									<input type="hidden" name="id" value={task.id} />
									<input type="hidden" name="points" value={task.points} />
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
							<form method="post" action="?/delete" use:enhance={handleDeleteSubmit}>
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
