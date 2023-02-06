import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import config from '@essential-js/server/config';
import { Controller } from './controller';

export /*bundle*/ class SocketConexion {
	#conexion: Server;
	#controller: Controller;

	constructor(server: HttpServer) {
		this.#conexion = new Server(server, {
			cors: { origin: config.params.client, methods: ['GET', 'POST', 'PUT'] },
		});

		this.#init();
	}

	#init() {
		this.#conexion.on('connection', (socket) => {
			this.#controller = new Controller(socket);

			console.log('CONNECTED', socket.id);
			socket.on('join', this.#controller.join);
		});
	}
}
