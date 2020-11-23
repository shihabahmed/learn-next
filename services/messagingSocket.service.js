import { WebSocketClientHelper } from '../helper/websocketClient.helper';
import { WS_API } from '../constants';
import SocketService from './socket.service';

export class MessagingSocketService extends SocketService {
  #private = {
    registrationData: () => {
      const itemToSend = {};
      itemToSend.EventName = 'register';
      itemToSend.AuthToken =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlNDBiMGQwOC0zNjBhLTRjNDgtOGZhNy1jNjJmZDc3ZDc1MDQiLCJ1bmlxdWVfbmFtZSI6IlNoaWhhYiBBaG1lZCIsImVtYWlsIjoic2hpaGFiQG1vYWt0LmNjIiwic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjA2MDM0NTY1LCJuYmYiOjE2MDYwMzQ1NjUsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjA1LzIxLzIwMjEgMDg6NDI6NDUiLCJqdGkiOiI0ZWRjMzc0MC0wMzcxLTQzMDUtODcwYy1mMjgyM2Y4NGU1MDQiLCJleHAiOjE2MDYxMjA5NjV9.1nplshnPnXxneNxWKTlQ31JZxiF4KEo-0rqFLu6CuJKY7seprCxj0L6AFi8fMjUycTkUMcaySsN54b8xVLylow';
      itemToSend.Register = {};
      itemToSend.Register.UserId = 'e40b0d08-360a-4c48-8fa7-c62fd77d7504';
      return itemToSend;
    },
    keepAlive: () => {
      const itemToSend = {};
      itemToSend.EventName = 'keep_alive';
      itemToSend.AuthToken =
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlNDBiMGQwOC0zNjBhLTRjNDgtOGZhNy1jNjJmZDc3ZDc1MDQiLCJ1bmlxdWVfbmFtZSI6IlNoaWhhYiBBaG1lZCIsImVtYWlsIjoic2hpaGFiQG1vYWt0LmNjIiwic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjA2MDM0NTY1LCJuYmYiOjE2MDYwMzQ1NjUsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjA1LzIxLzIwMjEgMDg6NDI6NDUiLCJqdGkiOiI0ZWRjMzc0MC0wMzcxLTQzMDUtODcwYy1mMjgyM2Y4NGU1MDQiLCJleHAiOjE2MDYxMjA5NjV9.1nplshnPnXxneNxWKTlQ31JZxiF4KEo-0rqFLu6CuJKY7seprCxj0L6AFi8fMjUycTkUMcaySsN54b8xVLylow';
      itemToSend.UserId = 'e40b0d08-360a-4c48-8fa7-c62fd77d7504';
  
      return itemToSend;
    }
  };

  constructor() {
    super();
  }

  init(onMessageRecieved) {
    const socketOptions = {
      url: WS_API,
      keepAlive: this.#private.keepAlive,
      onOpen: this.#private.registrationData,
      onMessage: (message) => {
        // more code...
        if (message.EventName === 'messageposted' && typeof onMessageRecieved === 'function') {
          onMessageRecieved(message.Message);
        }
      },
    };

    this.connection = WebSocketClientHelper.connect(socketOptions);
  }
}
