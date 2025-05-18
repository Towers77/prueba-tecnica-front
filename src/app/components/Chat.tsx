'use client';

import { useEffect, useRef } from 'react';
import { useChatContext } from '../context/chatContext';
import ChatBubble from './ChatBubble';

type ChatProps = {
	isLoading: boolean;
};

function Chat({ isLoading }: ChatProps) {
	const { messages } = useChatContext();

	const chatRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages, isLoading]);

	return (
		<div
			ref={chatRef}
			className="flex flex-col gap-4 overflow-y-scroll scrollbar-fancy px-2 overflow-x-hidden"
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
	);
}

export default Chat;
