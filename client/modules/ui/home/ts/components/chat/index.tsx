import React, { useEffect } from 'react';
import { messages } from '@essential-js/client/entities';
import { useBinder } from '@essential-js/client/hooks/use-binder';
import { socket } from '@essential-js/client/socket-conexion';
import { useHomeContext } from '../../context';

export function Chat() {
	const { room, user } = useHomeContext();
	const [currentMessage, setCurrentMessage] = React.useState('');
	const [messagesList, setMessagesList] = React.useState(messages.items);

	useEffect(() => {
		socket.getRoomMembers();
	}, [socket]);

	useBinder([messages], () => setMessagesList(messages.items), 'messages-list-changed');

	function onChange(event: { target: { value: string } }) {
		const { value } = event.target;
		setCurrentMessage(value);
	}

	function onSubmit(event: { preventDefault: () => void }) {
		event.preventDefault();
		if (!currentMessage) return;

		messages.send({ content: currentMessage, room, user, date: new Date() });
	}

	const output = messagesList.map((message) => <li key={message.content}>{message.content}</li>);

	return (
		<article>
			<h3>{room}</h3>
			<ul>{output}</ul>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={onChange} value={currentMessage} />
				<button>▶</button>
			</form>
		</article>
	);
}
