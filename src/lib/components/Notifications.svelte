<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { notifications } from '$lib/stores/notification';

	function getBackgroundColor(type: string): string {
		switch (type) {
			case 'success':
				return 'bg-green-500';
			case 'error':
				return 'bg-red-500';
			case 'warning':
				return 'bg-yellow-500';
			case 'info':
			default:
				return 'bg-blue-500';
		}
	}
</script>

<div class="notifications-container fixed top-4 right-4 z-50 w-72 space-y-2">
	{#each $notifications as notification (notification.id)}
		<div
			class="notification flex items-center justify-between rounded-lg p-3 text-white shadow-md {getBackgroundColor(
				notification.type
			)}"
			in:fly={{ y: -30, duration: 300 }}
			out:fade
		>
			<p>{notification.message}</p>
			<button
				class="ml-2 text-white hover:text-gray-200"
				on:click={() => notifications.remove(notification.id)}
			>
				✕
			</button>
		</div>
	{/each}
</div>
