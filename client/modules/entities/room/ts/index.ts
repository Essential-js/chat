import { Socket } from 'socket.io-client';
import { socket } from '@essential-js/client/entities/socket-conexion';
import { ReactiveModel } from '@essential-js/client/utils/reactive';

class Room extends ReactiveModel {
	#conexion: Socket;
	#users: Array<{ username: string }> = [];

	get users() {
		return this.#users;
	}

	constructor() {
		super();
		this.#conexion = socket.conexion;
	}

	join = (data: { username: string; room: string }) => {
		this.#conexion.emit('join', data);
		this.#users = [...this.#users, { username: data.username }];
	};

	receiveUser = (user: { username: string }) => {
		console.log(user, this.#users);
		this.#users = [...this.#users, user];
		this.triggerEvent('users-list-changed');
	};
}

export /*bundle*/ const room = new Room();
