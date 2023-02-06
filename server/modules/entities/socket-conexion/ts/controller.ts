import { Socket } from 'socket.io';

export class Controller {
	#conexion: Socket;

	constructor(socket: Socket) {
		this.#conexion = socket;
		console.log(this.#conexion);
	}

	join(data) {
		console.log(this.#conexion);
		console.log('a');
	}

	sendMessages(data) {
		console.log('SEND MESSAGE');
	}
}
