import * as React from 'react';
import { Room } from './components/room';
import { UsersList } from './components/users-list';
import { HomeContext } from './context';
import { Chat } from './components/chat';

export /*bundle*/
function Page(): JSX.Element {
	const [hasChatOpen, setHasChatOpen] = React.useState(false);
	const [user, setUser] = React.useState({ username: '' });
	const [room, setRoom] = React.useState('');

	const contextValue = {
		user,
		setUser,
		room,
		setRoom,
		setHasChatOpen,
	};
	return (
		<HomeContext.Provider value={contextValue}>
			<div className="page">
				{!hasChatOpen && <Room />}

				{hasChatOpen && <Chat />}
				{hasChatOpen && <UsersList />}
			</div>
		</HomeContext.Provider>
	);
}
