import React from 'react';
import { room } from '@essential-js/client/entities/room';
import { useBinder } from '@essential-js/client/hooks/use-binder';
import { socket } from '@essential-js/client/entities/socket-conexion';
import { useHomeContext } from '../context';

export function UsersList() {
	const [users, setUsers] = React.useState([]);
	const { user: currentUser } = useHomeContext();

	React.useEffect(() => {
		socket.conexion.on('user-joined', room.receiveUser);
	}, [socket.conexion]);
	useBinder([room], () => setUsers(room.users), 'users-list-changed');

	const output = users.map((user) => (
		<li key={user.username}>
			{user.username} {user.username === currentUser.username && <span>ME</span>}
		</li>
	));

	return <ul>{output}</ul>;
}
