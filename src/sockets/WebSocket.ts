import { webSocket } from '../index';
import { Socket } from 'socket.io';
import WelcomeSocket from './WelcomeSocket';

export default class WebSocket {
  static emit(name: string, ...args: string[]) {
    webSocket.emit(name, ...args);
  }

  static onEvents(socket: Socket) {
    return [socket.on('connection', (s) => 's.').emit('news', 'aeeeeeeeeeeeeeeeeeeee')];
  }

  static newChallenge(name: string) {
    webSocket.emit('challenge', `You have a new challenge: ${name}`);
  }
}
