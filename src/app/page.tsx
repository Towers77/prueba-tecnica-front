'use client';

import { useActionState, useEffect } from 'react';
import ChatInput from './components/ChatInput';
import { useChatContext } from './context/chatContext';
import { getQueryResponse } from './actions/getQueryResponse';
import Chat from './components/Chat';

export default function Home() {
	const [state, action, isLoading] = useActionState(getQueryResponse, '');
	const { setMessages } = useChatContext();

	useEffect(() => {
		if (state) {
			setMessages((prev) => [...prev, { text: state, isFromUser: false }]);
		}
	}, [state]);

	return (
		<main className="h-full w-full mx-4 md:w-2/3 lg:w-1/2 flex flex-col justify-end py-4 md:py-8 gap-4">
			<Chat isLoading={isLoading} />
			<ChatInput onSubmitAction={action} isDisabled={isLoading} />
		</main>
	);
}
