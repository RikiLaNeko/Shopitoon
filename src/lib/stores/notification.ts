import { writable } from 'svelte/store';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
	id: string;
	type: NotificationType;
	message: string;
	timeout?: number;
}

function createNotificationStore() {
	const { subscribe, update } = writable<Notification[]>([]);

	return {
		subscribe,
		add: (message: string, type: NotificationType = 'info', timeout = 3000) => {
			const id = crypto.randomUUID();
			update((n) => [...n, { id, type, message, timeout }]);

			if (timeout) {
				setTimeout(() => {
					update((n) => n.filter((notification) => notification.id !== id));
				}, timeout);
			}
		},
		remove: (id: string) => {
			update((n) => n.filter((notification) => notification.id !== id));
		}
	};
}

export const notifications = createNotificationStore();
