import { computed, signal } from "@preact/signals";

/**
 * A reactive signal holding the current queue of notifications.
 * Each notification is represented as an object within the array.
 *
 * @type {import('@preact/signals').Signal<Array<Notification>>}
 */
const notificationQueue = signal([]);

/**
 * Computed property that returns the current notification from the notification queue.
 * If the queue is empty, it returns null.
 *
 * @type {import('@preact/signals').ReadonlySignal<Notification|null>}
 */
export const currentNotification = computed(() => {
  return notificationQueue.value[0] || null;
});

/**
 * Adds a new notification to the notification queue.
 *
 * @param {string} message - The notification message to display.
 * @param {'success' | 'error' | 'info'} [type='info'] - The type of notification, which can affect its styling.
 * @param {(function(): void)?} [onDismiss] - Optional callback function to execute when the notification is dismissed.
 */
export function pushNotification(message, type = "info", onDismiss) {
  notificationQueue.value = [
    ...notificationQueue.value,
    { message, type, onDismiss },
  ];
}

/**
 * Removes the first notification from the notification queue and temporarily disables
 * notification display for 500ms before re-enabling it. Returns the next notification in the queue.
 *
 * @returns {Notification|null} The next notification in the queue after popping the first one.
 */
export function popNotification() {
  if (notificationQueue.value.length === 0) return null;
  notificationQueue.value = notificationQueue.value.slice(1);
  return notificationQueue.value[0];
}

/**
 * @typedef {object} Notification
 * @property {string} message - The notification message
 * @property {'success' | 'error' | 'info'} type - The type of notification
 * @property {(function(): void)?} onDismiss - Callback function to execute when the notification is dismissed
 */
