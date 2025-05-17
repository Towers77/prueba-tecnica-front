type ChatBubbleProps = {
	text: string;
	isFromUser: boolean;
};

function ChatBubble({ text, isFromUser }: ChatBubbleProps) {
	return (
		<div
			className={`max-w-2/3 py-3 px-5 break-all text-sm ${
				isFromUser
					? 'rounded-t-full rounded-bl-full bg-zinc-800 self-end'
					: 'rounded-t-full rounded-br-full bg-zinc-700 self-start'
			}`}
		>
			{text}
		</div>
	);
}

export default ChatBubble;
