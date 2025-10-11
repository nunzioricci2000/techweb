import { computed, signal } from "@preact/signals";
import { html } from "htm/preact";
import { currentNotification, popNotification } from "../services/notification";

const areNotificationDisplayable = signal(true);

const isOpen = computed(() => {
  return currentNotification.value !== null && areNotificationDisplayable.value;
});

/**
 * Handles the dismissal of the current notification.
 * Temporarily hides notifications for 500ms, then re-enables them.
 * Calls the `onDismiss` method of the current notification and
 * removes it from the notification stack.
 */
function onDismiss() {
  areNotificationDisplayable.value = false;
  setTimeout(() => {
    areNotificationDisplayable.value = true;
  }, 500);
  currentNotification.value.onDismiss();
  popNotification();
}

/**
 * NotificationComponent displays a notification dialog with a message and type.
 *
 * It shows an error or generic notification based on the notification type.
 * The dialog includes a title, message, and a dismiss button.
 *
 * @returns {import('preact').VNode} The rendered notification dialog component.
 */
export default function NotificationComponent() {
  const notification = currentNotification.value ?? {
    message: "An error occurred",
    type: "error",
  };
  const title = notification.type === "error" ? "Error!" : "Notification";
  return html`
    <dialog open=${isOpen.value}>
      <article>
        <h2>${title}</h2>
        ${notification.message}
        <footer>
          <button onClick=${onDismiss}>Continue</button>
        </footer>
      </article>
    </dialog>
  `;
}
