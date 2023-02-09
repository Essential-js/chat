import { socket } from '@essential-js/client/socket-conexion';
import { ReactiveModel } from '@essential-js/client/utils/reactive';
import { Room } from '../room';
import { IRoom } from '../interfaces/room';

class User extends ReactiveModel {
	#name: string;
	#rooms: Map<string, IRoom> = new Map();

	set rooms(newValue: Map<string, IRoom>) {
		this.#rooms = newValue;
		this.triggerEvent('rooms-changed');
	}

	constructor() {
		super();
	}

	login = (name: string) => {
		this.#name = name;
	};

	joinRoom = (roomId: string) => {
		const newRoom = new Room(roomId);
		this.#rooms = new Map([...this.#rooms.entries(), [roomId, newRoom]]);

		socket.joinRoom(newRoom, { name: this.#name });
	};
}

export /*bundle*/ const messages = new User();
