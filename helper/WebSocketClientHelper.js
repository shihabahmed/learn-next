let AuthHelper = { isAuthenticated: () => true };
// import { AuthHelper } from "./auth.helper";
import { SOCKET_CONNECTION_RETRY_IN_SECONDS } from '../constants';

export class WebSocketClientHelper {
  #private = {
    currentUrl: '',
    fallbackUrl: '',
    queuedMessages: new Array(),
    retryIntervalId: null,
    start: (url, events) => {
      this.websocket = new WebSocket(url);
  
      this.websocket.addEventListener('error', (error) => {
        this.#private.triggerOnConnectionError(events.onError, error);
      });
  
      this.websocket.addEventListener('open', (listener) => {
        this.#private.triggerOnConnectionOpen(events.onOpen);
      });
  
      this.websocket.addEventListener('close', (listener) => {
        if (this.#private.fallbackUrl) {
          if (this.#private.currentUrl == this.url) {
            this.#private.currentUrl = this.#private.fallbackUrl;
          } else {
            this.#private.currentUrl = this.url;
          }
        }
        this.#private.triggerOnConnectionClose(events.onClose);
      });
  
      this.websocket.addEventListener('message', (data) => {
        this.#private.updateInputStream(this.onMessageReceived, data);
      });
    },
    sendQueuedMessages: () => {
      if (this.#private.queuedMessages && this.#private.queuedMessages.length > 0) {
        const messageCount = this.#private.queuedMessages.length;
        for (let i = 0; i < messageCount; i++) {
          const queuedMessage = this.#private.queuedMessages.pop();
          this.send(queuedMessage);
        }
      }
    },
    updateInputStream: (onMessageReceived, data) => {
      const value = JSON.parse(data.data);
      this.inputStream = value;
  
      if (value.EventName === 'messageposted' && typeof onMessageReceived === 'function') {
        onMessageReceived(value.Message);
      }
    },
    triggerOnConnectionOpen: (onOpen) => {
      if (typeof onOpen === 'function') {
        this.send(JSON.stringify(onOpen()));
      }
      this.#private.sendQueuedMessages();
      // this.onOpen = onOpen;
    },
    triggerOnConnectionClose: (onClose) => {
      if (typeof onClose === 'function') {
        onClose();
      }
      // this.onClose = onClose;
    },
    triggerOnConnectionError: (onError, error) => {
      if (typeof onError === 'function') {
        onError(error);
      }
      // this.onError = onError;
    }
  }

  static connect(options) {
    const newConn = new WebSocketClientHelper();
    newConn.#private.currentUrl = options.url + '';
    newConn.#private.fallbackUrl = options.fallbackUrl + '';

    this.onMessageReceived = () => { };

    const callbacks = { onOpen: options.onOpen, onClose: options.onClose, onError: options.onError };

    if (AuthHelper.isAuthenticated()) {
      newConn.#private.start(newConn.#private.currentUrl, callbacks);
    }

    newConn.#private.retryIntervalId = setInterval(() => {
      if (
        AuthHelper.isAuthenticated() &&
        newConn.websocket &&
        WebSocket.CLOSED === newConn.websocket.readyState
      ) {
        newConn.#private.start(newConn.#private.currentUrl, callbacks);
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

  closeConnection() {
    if (this.websocket && this.websocket.readyState !== WebSocket.CLOSED) {
      this.websocket.close();
      clearInterval(this.#private.retryIntervalId);
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
