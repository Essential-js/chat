import React from 'react';
import { room } from '@essential-js/client/entities/room';

export function Room() {
	const [formValues, setFormValues] = React.useState({ name: '', room: '' });

	function onChange(event: { target: { value: string; name: string } }) {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	}

	function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		if (!formValues.name || !formValues.room) return;
		room.join(formValues);
	}

	return (
		<form onSubmit={onSubmit} className="room">
			<h3>ROOM</h3>
			<label htmlFor="name">Name</label>
			<input onChange={onChange} type="text" name="name" id="name" />

			<label htmlFor="room">Room</label>
			<input onChange={onChange} type="text" name="room" id="room" />

			<button>Join</button>
		</form>
	);
}
