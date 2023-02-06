import { socket } from '@essential-js/client/entities/socket-conexion';

class Room {
	#conexion;

	constructor() {
		this.#conexion = socket.conexion;
	}

	join(data: { name: string; room: string }) {
		this.#conexion.emit('join', data);
	}
}

export /*bundle*/ const room = new Room();
