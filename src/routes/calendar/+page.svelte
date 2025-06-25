<script lang="ts">
	import { page } from '$app/stores';
	import type { Task } from '$lib/server/db/schema';

	// Récupération des données de la page
	const tasks = $derived($page.data.tasks || []);
	const today = $state(new Date());

	// Générer le calendrier pour le mois en cours
	let currentMonth = $state(today.getMonth());
	let currentYear = $state(today.getFullYear());

	// Calculer les jours du calendrier
	$effect(() => {
		generateCalendarDays(currentMonth, currentYear);
	});

	// Type défini pour éviter l'utilisation de 'any'
	type CalendarDay = {
		date: Date;
		tasks: Task[];
		isCurrentMonth: boolean;
	};

	let calendarDays = $state<CalendarDay[]>([]);

	function generateCalendarDays(month: number, year: number) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysArray: CalendarDay[] = [];

		// Ajouter les jours du mois précédent pour compléter la première semaine
		const firstDayOfWeek = firstDay.getDay();
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const prevDate = new Date(year, month, -i);
			daysArray.push({
				date: prevDate,
				tasks: getTasksForDate(prevDate),
				isCurrentMonth: false
			});
		}

		// Ajouter les jours du mois en cours
		for (let i = 1; i <= lastDay.getDate(); i++) {
			const currentDate = new Date(year, month, i);
			daysArray.push({
				date: currentDate,
				tasks: getTasksForDate(currentDate),
				isCurrentMonth: true
			});
		}

		// Compléter la dernière semaine avec les jours du mois suivant
		const lastDayOfWeek = lastDay.getDay();
		for (let i = 1; i < 7 - lastDayOfWeek; i++) {
			const nextDate = new Date(year, month + 1, i);
			daysArray.push({
				date: nextDate,
				tasks: getTasksForDate(nextDate),
				isCurrentMonth: false
			});
		}

		calendarDays = daysArray;
	}

	function getTasksForDate(date: Date) {
		// Filtrer les tâches qui doivent être faites à cette date
		return tasks.filter((task: Task) => {
			if (!task.isRecurring) return false;
			if (task.nextDueDate === null) return false;

			// Correction : utilisation de task.nextDueDate qui peut être null
			const taskDate = new Date(task.nextDueDate);
			return (
				date.getDate() === taskDate.getDate() &&
				date.getMonth() === taskDate.getMonth() &&
				date.getFullYear() === taskDate.getFullYear()
			);
		});
	}

	function prevMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
	}

	const monthNames = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	];
</script>

<svelte:head>
	<title>Shopitoon - Calendrier</title>
	<meta name="description" content="Visualisez et organisez vos tâches dans le calendrier Shopitoon pour une meilleure productivité." />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="mb-6 text-3xl font-bold text-indigo-700">Calendrier des tâches</h1>

	<div class="overflow-hidden rounded-lg bg-white shadow-md">
		<div
			class="flex items-center justify-between bg-gradient-to-r from-blue-600 via-fuchsia-500 to-indigo-600 p-4 text-white"
		>
			<button on:click={prevMonth} class="rounded-full p-1 hover:bg-white/20">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<h2 class="text-xl font-bold">{monthNames[currentMonth]} {currentYear}</h2>

			<button on:click={nextMonth} class="rounded-full p-1 hover:bg-white/20">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<div class="p-4">
			<div class="grid grid-cols-7 gap-1">
				<div class="text-center font-semibold text-gray-600">Lun</div>
				<div class="text-center font-semibold text-gray-600">Mar</div>
				<div class="text-center font-semibold text-gray-600">Mer</div>
				<div class="text-center font-semibold text-gray-600">Jeu</div>
				<div class="text-center font-semibold text-gray-600">Ven</div>
				<div class="text-center font-semibold text-gray-600">Sam</div>
				<div class="text-center font-semibold text-gray-600">Dim</div>

				{#each calendarDays as day (day.date.toISOString())}
					<div
						class="h-28 overflow-y-auto rounded-md border p-1 {day.isCurrentMonth
							? 'bg-white'
							: 'bg-gray-100'}
            {day.date.toDateString() === today.toDateString() ? 'ring-2 ring-indigo-500' : ''}"
					>
						<div class="text-xs font-medium text-gray-500">{formatDate(day.date)}</div>
						{#if day.tasks.length > 0}
							<ul class="mt-1 space-y-1">
								{#each day.tasks as task (task.id)}
									<li class="truncate rounded bg-indigo-100 p-1 text-xs text-indigo-700">
										{task.title}
										{(task.recurrenceCount ?? 0) > 1 ? `(${task.recurrenceCount}x)` : ''}
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
