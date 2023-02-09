import { ReactiveModel } from '@essential-js/client/utils/reactive';
import { IUser } from '../interfaces/user';
import { Messages } from './messages';

export class Room extends ReactiveModel {
	#messages: Messages;
	get messages() {
		return this.#messages;
	}

	#members: Array<IUser | undefined> = [];
	get members() {
		return this.#members;
	}

	set members(newValue: Array<IUser>) {
		this.#members = newValue;
		this.triggerEvent('members-changed');
	}

	#id: string;

	get id() {
		return this.#id;
	}

	constructor(id: string) {
		super();
		this.#id = id;
		this.#messages = new Messages();
	}
}
