export default class SocketService {
  constructor() {
    this.connection = null;
  }

  isConnectionAlive() {
    return this.connection && this.connection.isConnectionAlive();
  }

  closeConnection() {
    this.connection && this.connection.close();
  }
}
