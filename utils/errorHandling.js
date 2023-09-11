const httpErrorHandling = {
  /**
   * Show toast with error message
   */
  handleBadRequest (error) {
    console.log(error.response)
    const title = error.response?.data?.message || error.message
    notifications.addNotification({ icon: 'x-circle', color: 'red', title })
  },

  /**
   * Log out user on 401 requests
   */
  handleBadAuth (error) {
    console.log(error.response)
    const title = 'Authentication failed'
    const description = error.response?.data || error.message
    notifications.addNotification({
      icon: 'x-circle',
      color: 'red',
      title,
      description
    })
  },

  /**
   *
   * @param { import('axios').AxiosInstance } instance
   */
  setInterceptors (instance) {
    instance.interceptors.request.use(
      (config) => {
        // add timestamp so we never cache requests
        config.url +=
          (config.url.indexOf('?') > 0 ? '&' : '?') +
          `t=${new Date().getTime()}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // handle all HTTP errors here
        // if 400 => show a toast
        if (error.response?.status === 400) {
          this.handleBadRequest(error)
        } else if (error.response?.status === 401) {
          this.handleBadAuth(error)
        } else if (error.isAxiosError && error.message) {
          this.handleBadRequest(error)
        } else {
          console.error('some other response threw an error', { error })
        }
        return Promise.reject(error)
      }
    )
  }
}

export default httpErrorHandling
