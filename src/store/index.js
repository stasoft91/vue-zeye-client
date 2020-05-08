import randomString from '../utils/randomString'

export const actions = {
  notify({ commit }, { type = 'info', text, title, timeout }) {
    if (!timeout) {
      switch (type) {
        case 'info':
          timeout = 3000
          break
        case 'error':
          timeout = 5000
          break
      }
    }

    const notification = {
      id: randomString(6),
      type,
      title,
      text,
      timeout
    }

    commit('notifications/addNotification', notification)

    setTimeout(() => {
      commit('notifications/removeNotification', {
        notificationId: notification.id
      })
    }, timeout)
  }
}

const module = {
  actions
}

export default module
