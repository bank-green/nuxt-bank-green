<template>
  <div
    class="fixed z-50 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:px-6 sm:py-12 sm:items-start sm:justify-end"
  >
    <!-- Notification panel, show/hide based on alert state.-->
    <transition-group
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      tag="div"
      class="max-w-sm w-full"
    >
      <div
        v-for="(notif, index) in computedNotifications"
        :key="`notif_${index}`"
        class="mb-2 bg-white shadow-lg rounded-lg pointer-events-auto"
      >
        <div
          class="rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div v-if="notif.icon" class="flex-shrink-0">
                <svg
                  v-if="notif.icon === 'check'"
                  class="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else-if="notif.icon === 'lock-closed'"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <svg
                  v-else-if="notif.icon === 'x-circle'"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0_5">
                <p class="text-sm leading-5 font-medium text-gray-900">
                  {{ notif.title }}
                </p>
                <p
                  v-if="notif.description"
                  class="mt-1 text-sm leading-5 text-gray-500"
                >
                  {{ notif.description }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition150"
                  @click="closeNotification(notif)"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { NotificationInterface } from "~~/utils/notifications";

const computedNotifications = computed(() => notifications.state.notifications);

const closeNotification = (notif: NotificationInterface) => {
  notifications.closeNotification(notif);
};
</script>
