import config from '@essential-js/client/config';
import { connect } from 'socket.io-client';

class Socket {
	#conexion;

	get conexion() {
		return this.#conexion;
	}

	constructor() {
		this.#conexion = connect(config.params.server);
	}
}

export /*bundle*/ const socket = new Socket();
