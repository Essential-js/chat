import React from 'react';
import { room as roomEntity } from '@essential-js/client/entities/room';
import { useHomeContext } from '../context';

export function Room() {
	const { user, setUser, setHasChatOpen, room, setRoom } = useHomeContext();

	function handleRoomChanges(event: { target: { value: string; name: string } }) {
		const { value } = event.target;
		setRoom(value);
	}
	function handleUserChanges(event: { target: { value: string; name: string } }) {
		const { value } = event.target;
		setUser({ username: value });
	}

	function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		if (!user.username || !room) return;
		roomEntity.join({ username: user.username, room });
		setHasChatOpen(true);
	}

	return (
		<form onSubmit={onSubmit} className="room">
			<h3>ROOM</h3>
			<label htmlFor="name">Name</label>
			<input onChange={handleUserChanges} type="text" name="username" value={user.username} id="name" />

			<label htmlFor="room">Room</label>
			<input onChange={handleRoomChanges} type="text" name="room" id="room" value={room} />

			<button>Join</button>
		</form>
	);
}
