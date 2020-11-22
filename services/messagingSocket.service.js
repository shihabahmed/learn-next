import { WebSocketClientHelper } from '../helper/WebSocketClientHelper';
import { WS_API, SOCKET_HEART_BEAT_INTERVAL_IN_SECONDS } from '../constants';

export class MessagingSocketService {
  #interval;

  constructor() {
    this.connection = null;
  }

  init() {
    this.connection = WebSocketClientHelper.connect({
      url: WS_API,
      onOpen: this.registrationData
    });
    this.setKeepAliveCycle();
  }

  registrationData() {
    const itemToSend = {};
    itemToSend.EventName = 'register';
    itemToSend.AuthToken ='AUTH_TOKEN';
    itemToSend.Register = {};
    itemToSend.Register.UserId = 'USER_ID';
    return itemToSend;
  }

  setKeepAliveCycle() {
    const itemToSend = {};
    itemToSend.EventName = 'keep_alive';
    itemToSend.AuthToken ='AUTH_TOKEN';
    itemToSend.UserId = 'USER_ID';

    this.#interval = setInterval(() => {
      if (this.connection.isConnectionAlive()) {
        this.connection.send(JSON.stringify(itemToSend));
      }
    }, SOCKET_HEART_BEAT_INTERVAL_IN_SECONDS * 1000);
  }
}
