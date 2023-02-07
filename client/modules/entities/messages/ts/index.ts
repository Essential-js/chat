import { socket } from '@essential-js/client/entities/socket-conexion';
import { ReactiveModel } from '@essential-js/client/utils/reactive';
import { Socket } from 'socket.io-client';

interface IMessage {
	username: string;
	content: string;
	room: string;
	date: Date;
}
class Messages extends ReactiveModel {
	#items: Array<IMessage | undefined>;

	get items() {
		return this.#items;
	}

	#conexion: Socket;

	constructor() {
		super();
		this.#conexion = socket.conexion;
		this.#items = [];
	}

	send = (message: IMessage) => {
		this.#conexion.emit('send-message', message);
		this.#items = [...this.#items, message];
		this.triggerEvent('messages-list-changed');
	};

	receive = (message: IMessage) => {
		this.#items = [...this.#items, message];
		this.triggerEvent('messages-list-changed');
	};
}

export /*bundle*/ const messages = new Messages();
