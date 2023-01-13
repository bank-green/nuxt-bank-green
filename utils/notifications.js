import { reactive } from 'vue'

/**
 * @typedef Notification
 * @prop { 'lock-closed'|'x-circle'|'check'|'wave' } icon hard coded icons for now
 * @prop { string } title
 * @prop { string } description
 */

const store = {
    state: reactive({
        notifications: [],
    }),

    /**
     * @param {Notification} notif 
     */
    addNotification(notif) {
        this.state.notifications.push(notif)
        if (this.state.notifications.length > 3) {
            this.state.notifications.shift()
        }
        setTimeout(() => {
            this.closeNotification(notif)
        }, 6000)
    },

    /**
     * @param {Notification} notif
     */
    closeNotification(notif) {
        const index = this.state.notifications.indexOf(notif)
        if (index > -1) {
            this.state.notifications.splice(index, 1)
        }
    },
}

export default store