'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useChatContext } from '../utils/chatContext';

type ChatInputProps = {
	action: (payload: FormData) => void;
	isLoading: boolean;
};

function ChatInput({ action, isLoading }: ChatInputProps) {
	const { setMessages } = useChatContext();
	const [query, setQuery] = useState<string>('');

	// TODO: Move to a custom hook
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useLayoutEffect(() => {
		const textArea =
			textAreaRef.current ??
			(document.getElementById('query') as HTMLTextAreaElement);

		if (textArea) {
			textArea.style.height = '0px';
			const scrollHeight = textArea.scrollHeight;
			textArea.style.height = `${scrollHeight}px`;
		}
	}, [textAreaRef, query]);

	const handleSubmit = () => {
		if (query.trim() === '') return;
		setMessages((prev) => [...prev, { text: query.trim(), isFromUser: true }]);
	};

	useEffect(() => {
		if (!isLoading) {
			setQuery('');
		}
	}, [isLoading]);

	return (
		<form
			action={action}
			className="bg-zinc-800 rounded-2xl w-full flex gap-4 items-center py-4 outline-zinc-600 outline-1 shadow-lg"
		>
			<textarea
				onChange={(e) => setQuery(e.target.value)}
				className="w-full text-sm placeholder:text-zinc-400 px-6 scrollbar-fancy focus:outline-none resize-none max-h-[120px]"
				ref={textAreaRef}
				placeholder="Ask anything..."
				id="query"
				name="query"
				value={isLoading ? '' : query}
				disabled={isLoading}
			/>
			<button
				className="bg-zinc-900 px-4 py-2 flex items-center text-sm rounded-xl mr-3 hover:scale-105 hover:shadow-lg active:scale-100 disabled:text-zinc-800 disabled:cursor-auto disabled:scale-100 transition-all duration-200 cursor-pointer"
				type="submit"
				onClick={handleSubmit}
				disabled={isLoading}
			>
				Send
			</button>
		</form>
	);
}

export default ChatInput;
