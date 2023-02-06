import * as express from 'express';
import { createServer } from 'http';
import config from '@essential-js/server/config';
import { SocketConexion, hmr as socketConexion } from '@essential-js/server/entities/socket-conexion';
import { Connections } from './connections';

export class Server {
	#instance;
	#connections;
	#app;
	#port: number = config.params.port;
	#router;

	constructor() {
		this.#start();
	}

	#start = async () => {
		try {
			const app = express();
			this.#app = createServer(app);

			new SocketConexion(this.#app);

			socketConexion.on('change', this.onChange);
			this.#instance = this.#app.listen(this.#port);
			this.#connections = new Connections(this.#instance);
			console.log(`SERVER RUNNING ON ${this.#port}`);
		} catch (exc) {
			console.error('Error', exc);
		}
	};

	onChange = () => {
		this.#connections.destroy();
		this.#instance.close(() => {
			this.#start();
		});
	};
}
