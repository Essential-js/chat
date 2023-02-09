import { Socket } from 'socket.io';

interface IMessage {
	username: string;
	content: string;
	room: string;
	date: Date;
}

export class Controller {
	#conexion: Socket;

	constructor(socket: Socket) {
		this.#conexion = socket;
	}

	join = (data: { username: string; room: string }) => {
		const { room, username } = data;

		this.#conexion.join(room);
		this.#conexion.emit('user-joined');
		this.#conexion.to(room).emit('user-joined', { username });
	};

	sendMessages = (data: IMessage) => {
		const { room } = data;
		this.#conexion.to(room).emit('receive-message', data);
	};
}
