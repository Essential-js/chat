import { IUser } from './user';

export /*bundle*/ interface IRoom {
	members: Array<IUser | undefined>;
	id: string;
}
