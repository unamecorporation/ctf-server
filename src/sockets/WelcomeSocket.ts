import { Socket } from 'socket.io';

export default function WelcomeSocket(socket: Socket) {
  socket.emit('news', 'Difference instance, bitch');
  return socket;
}
