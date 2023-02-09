import React from 'react';
import { messages } from '@essential-js/client/entities';
import { useHomeContext } from '../context';

export function Room() {
	const { setHasChatOpen, room } = useHomeContext();
	const [formValues, setFormValues] = React.useState({ username: '', room: '' });

	function handleChanges(event: { target: { value: string; name: string } }) {
		const { name, value } = event.target;
		console.log('FORM VALUES => ', name, value);
		setFormValues({ ...formValues, [name]: value });
	}

	function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		if (!formValues.username || !formValues.room) return;
		console.log('USER => ', messages);
		user.login(user.username);
		user.joinRoom(room);
		setHasChatOpen(true);
	}

	return (
		<form onSubmit={onSubmit} className="room">
			<h3>ROOM</h3>
			<label htmlFor="name">Name</label>
			<input onChange={handleChanges} type="text" name="username" value={formValues.username} id="name" />

			<label htmlFor="room">Room</label>
			<input onChange={handleChanges} type="text" name="room" id="room" value={formValues.room} />

			<button>Join</button>
		</form>
	);
}
