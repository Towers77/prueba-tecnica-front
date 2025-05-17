'use client';

import { useActionState, useEffect, useRef } from 'react';
import ChatInput from './components/ChatInput';
import { useChatContext } from './utils/chatContext';
import { getQueryResponse } from './utils/actions';
import ChatBubble from './components/ChatBubble';

export default function Home() {
	const chatRef = useRef<HTMLDivElement>(null);
	const [state, action, isLoading] = useActionState(getQueryResponse, '');
	const { messages, setMessages } = useChatContext();

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages, state, isLoading]);

	useEffect(() => {
		if (state) {
			setMessages((prev) => [...prev, { text: state, isFromUser: false }]);
		}
	}, [state]);

	return (
		<main className="h-full w-2/3 lg:w-1/3 flex flex-col justify-end py-8 gap-4">
			<div
				ref={chatRef}
				className="flex flex-col gap-4 overflow-y-scroll scrollbar-fancy px-2"
			>
				{messages.map((message, index) => (
					<ChatBubble
						key={index}
						text={message.text}
						isFromUser={message.isFromUser}
					/>
				))}
				{isLoading && <div className="animate-pulse">Thinking...</div>}
			</div>
			<ChatInput action={action} isLoading={isLoading} />
		</main>
	);
}
