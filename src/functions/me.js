import * as cookiesManager from '../utils/cookiesManager'
import randomName from '../utils/randomName'
import deviceInfo from '../utils/deviceInfo'
import randomString from '../utils/randomString'

export default function registerFunctions({ app, store }) {
  /**
   * @method
   * @name getMe
   * @returns {Object}
   */
  app.$zeyeClient.getMe = () => store.state.zeyeClient.me

  /**
   * @method
   * @param peerId?
   * @param displayName?
   * @returns {void}
   */
  app.$zeyeClient.setMe = (peerId, displayName) => {
    peerId = peerId !== undefined ? peerId : randomString(6)
    displayName = displayName !== undefined ? displayName : randomName()

    store.commit('zeyeClient/me/setMe', {
      peerId,
      displayName,
      device: deviceInfo()
    })
  }

  /**
   * @method
   * @name getWebcamState
   * @returns {string}
   */
  app.$zeyeClient.getWebcamState = () => {
    let webcamState

    if (!app.$zeyeClient.getMe().canSendWebcam) {
      webcamState = 'unsupported'
    } else if (
      app.$zeyeClient.getVideoProducer() &&
      app.$zeyeClient.getVideoProducer().type !== 'share'
    ) {
      webcamState = 'on'
    } else {
      webcamState = 'off'
    }

    return webcamState
  }

  /**
   * @method
   * @name canIChangeWebcam
   * @returns {boolean}
   */
  app.$zeyeClient.canIChangeWebcam = () =>
    app.$zeyeClient.getVideoProducer() &&
    app.$zeyeClient.getVideoProducer().type !== 'share' &&
    app.$zeyeClient.getMe().canChangeWebcam

  /**
   * @method
   * @name getScreenShareState
   * @returns {string}
   */
  app.$zeyeClient.getScreenShareState = () =>
    app.$zeyeClient.getVideoProducer() &&
    app.$zeyeClient.getVideoProducer().type === 'share'
      ? 'on'
      : 'off'

  /**
   * @method
   * @name getMicAvailability
   * @returns {string}
   */
  app.$zeyeClient.getMicState = () => {
    let micState

    if (!app.$zeyeClient.getMe().canSendMic) {
      micState = 'unsupported'
    } else if (!app.$zeyeClient.getAudioProducer()) {
      micState = 'unsupported'
    } else if (!app.$zeyeClient.getAudioProducer().paused) {
      micState = 'on'
    } else {
      micState = 'off'
    }

    return micState
  }

  /**
   * @method
   * @name toggleWebcam
   */
  app.$zeyeClient.toggleWebcam = () => {
    if (app.$zeyeClient.getWebcamState() === 'on') {
      cookiesManager.setDevices({ webcamEnabled: false })
      app.$zeyeClient.disableWebcam()
    } else {
      cookiesManager.setDevices({ webcamEnabled: true })
      app.$zeyeClient.enableWebcam()
    }
  }

  /**
   * @method
   * @name toggleShare
   */
  app.$zeyeClient.toggleShare = () => {
    if (app.$zeyeClient.getScreenShareState() === 'on') {
      app.$zeyeClient.disableShare()
    } else {
      app.$zeyeClient.enableShare()
    }
  }

  /**
   * @method
   * @name toggleMicState
   */
  app.$zeyeClient.toggleMicState = () => {
    app.$zeyeClient.getMicState() === 'on'
      ? app.$zeyeClient.muteMic()
      : app.$zeyeClient.unmuteMic()
  }
}