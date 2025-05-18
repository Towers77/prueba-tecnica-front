'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import ResizableTextArea from './ResizableTextArea';

type ChatInputProps = {
	onSubmitAction: (payload: FormData) => void;
	isDisabled: boolean;
};

function ChatInput({ onSubmitAction, isDisabled }: ChatInputProps) {
	const { setMessages } = useChatContext();
	const [query, setQuery] = useState<string>('');

	const handleSubmit = () => {
		if (query.trim() === '') return;
		setMessages((prev) => [...prev, { text: query.trim(), isFromUser: true }]);
	};

	useEffect(() => {
		if (!isDisabled) {
			setQuery('');
		}
	}, [isDisabled]);

	return (
		<form
			action={onSubmitAction}
			className="bg-zinc-800 rounded-2xl w-full flex gap-4 items-center py-4 outline-zinc-600 outline-1 shadow-lg"
		>
			<ResizableTextArea
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				isDisabled={isDisabled}
			/>
			<button
				className="bg-zinc-900 px-4 py-2 flex items-center text-sm rounded-xl mr-3 hover:scale-105 hover:shadow-lg active:scale-100 disabled:text-zinc-800 disabled:cursor-auto disabled:scale-100 transition-all duration-200 cursor-pointer"
				type="submit"
				onClick={handleSubmit}
				disabled={isDisabled}
			>
				Send
			</button>
		</form>
	);
}

export default ChatInput;
