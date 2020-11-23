let AuthHelper = { isAuthenticated: () => true };
// import { AuthHelper } from "./auth.helper";
import { SOCKET_CONNECTION_RETRY_IN_SECONDS, SOCKET_PULSE_INTERVAL_IN_SECONDS } from '../constants';

export class WebSocketClientHelper {
  #private = {
    currentUrl: '',
    fallbackUrl: '',
    queuedMessages: [],
    keepAliveInterval: null,
    retryConnectionInterval: null,
    start: (url, events, keepAlive) => {
      this.websocket = new WebSocket(url);

      this.websocket.addEventListener('open', (event) => {
        this.#private.triggerOnConnectionOpen(events.onOpen, event);
        this.#private.keepAliveInterval = setInterval(() => {
          if (this.isConnectionAlive()) {
            this.send(JSON.stringify(keepAlive()));
          }
        }, SOCKET_PULSE_INTERVAL_IN_SECONDS * 1000);
      });

      this.websocket.addEventListener('error', (error) => {
        this.#private.triggerOnConnectionError(events.onError, error);
      });

      this.websocket.addEventListener('close', (event) => {
        if (this.#private.fallbackUrl) {
          if (this.#private.currentUrl == this.url) {
            this.#private.currentUrl = this.#private.fallbackUrl;
          } else {
            this.#private.currentUrl = this.url;
          }
        }
        this.#private.triggerOnConnectionClose(events.onClose, event);
        clearInterval(this.#private.keepAliveInterval);
      });

      this.websocket.addEventListener('message', (data) => {
        this.#private.updateInputStream(events.onMessage, data);
      });
    },
    sendQueuedMessages: () => {
      if (
        this.#private.queuedMessages &&
        this.#private.queuedMessages.length > 0
      ) {
        const messageCount = this.#private.queuedMessages.length;
        for (let i = 0; i < messageCount; i++) {
          const queuedMessage = this.#private.queuedMessages.pop();
          this.send(queuedMessage);
        }
      }
    },
    updateInputStream: (onMessage, data) => {
      const value = JSON.parse(data.data);
      if (typeof onMessage === 'function') {
        onMessage(value);
      }
    },
    triggerOnConnectionOpen: (onOpen, eventData) => {
      if (typeof onOpen === 'function') {
        this.send(JSON.stringify(onOpen(eventData)));
      }
      this.#private.sendQueuedMessages();
      // this.onOpen = onOpen;
    },
    triggerOnConnectionClose: (onClose, eventData) => {
      if (typeof onClose === 'function') {
        onClose(eventData);
      }
      // this.onClose = onClose;
    },
    triggerOnConnectionError: (onError, error) => {
      if (typeof onError === 'function') {
        onError(error);
      }
      // this.onError = onError;
    },
  };

  static connect(options) {
    const newConn = new WebSocketClientHelper();
    newConn.#private.currentUrl = options.url + '';
    newConn.#private.fallbackUrl = options.fallbackUrl + '';

    const callbacks = {
      onOpen: options.onOpen,
      onClose: options.onClose,
      onError: options.onError,
      onMessage: options.onMessage
    };

    if (AuthHelper.isAuthenticated()) {
      newConn.#private.start(newConn.#private.currentUrl, callbacks, options.keepAlive);
    }

    newConn.#private.retryConnectionInterval = setInterval(() => {
      if (
        AuthHelper.isAuthenticated() &&
        newConn.websocket &&
        WebSocket.CLOSED === newConn.websocket.readyState
      ) {
        newConn.#private.start(newConn.#private.currentUrl, callbacks, options.keepAlive);
      }
    }, SOCKET_CONNECTION_RETRY_IN_SECONDS * 1000);

    return newConn;
  }

  send(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      this.#private.queuedMessages.push(message);
    }
  }

  close() {
    if (this.websocket && this.websocket.readyState !== WebSocket.CLOSED) {
      this.websocket.close();
      clearInterval(this.#private.retryConnectionInterval);
    }
  }

  isConnectionAlive() {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      return true;
    } else {
      return false;
    }
  }
}
