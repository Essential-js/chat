import config from '@essential-js/client/config';
import { IUser } from '@essential-js/client/entities';
import { connect } from 'socket.io-client';

class Socket {
	#conexion;

	get conexion() {
		return this.#conexion;
	}

	constructor() {
		this.#conexion = connect(config.params.server);
	}

	joinRoom(roomId: string, user: IUser) {
		this.#conexion.emit('join-room', { roomId, user });
	}

	getRoomMembers = () => {
		let members: Array<IUser | undefined> = [];
		this.#conexion.on('user-joined', (membersList: Array<IUser | undefined>) => (members = membersList));
		return members;
	};
}

export /*bundle*/ const socket = new Socket();
