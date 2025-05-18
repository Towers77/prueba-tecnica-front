type ChatBubbleProps = {
	text: string;
	isFromUser: boolean;
};

function ChatBubble({ text, isFromUser }: ChatBubbleProps) {
	return (
		<div
			className={`max-w-4/5 py-3 px-5 text-wrap text-sm shadow-lg ${
				isFromUser
					? 'rounded-t-xl rounded-bl-xl bg-zinc-800 self-end animate-fade-in-right'
					: 'rounded-t-xl rounded-br-xl bg-zinc-700 self-start animate-fade-in-left'
			}`}
		>
			{text}
		</div>
	);
}

export default ChatBubble;
