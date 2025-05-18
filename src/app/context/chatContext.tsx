'use client';

import { createContext, useContext, useState } from 'react';

type Message = {
	text: string;
	isFromUser: boolean;
};

type ChatContextProviderProps = {
	children: React.ReactNode;
};

type ChatContextType = {
	messages: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const chatContext = createContext<ChatContextType | null>(null);

export default function ChatContextProvider({
	children,
}: ChatContextProviderProps) {
	const [messages, setMessages] = useState<Message[]>([]);

	return (
		<chatContext.Provider
			value={{
				messages,
				setMessages,
			}}
		>
			{children}
		</chatContext.Provider>
	);
}

export function useChatContext() {
	const context = useContext(chatContext);
	if (!context) {
		throw new Error('useChatContext must be used within a ChatContextProvider');
	}
	return context;
}
