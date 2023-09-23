import { reactive } from 'vue'

export interface NotificationInterface {
  icon: 'lock-closed' | 'x-circle' | 'check' | 'wave';
  title: String;
  description: String;
}

const store = {
  state: reactive<{
    notifications: Array<NotificationInterface>;
  }>({
    notifications: []
  }),

  addNotification (notif: NotificationInterface) {
    this.state.notifications.push(notif)
    if (this.state.notifications.length > 3) {
      this.state.notifications.shift()
    }
    setTimeout(() => {
      this.closeNotification(notif)
    }, 6000)
  },

  closeNotification (notif: NotificationInterface) {
    const index = this.state.notifications.indexOf(notif)
    if (index > -1) {
      this.state.notifications.splice(index, 1)
    }
  }
}

export default store
