'use client';

import { ChangeEvent, useLayoutEffect, useRef } from 'react';

type ResizableTextAreaProps = {
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
	isDisabled: boolean;
};

/**
 * A resizable text area component that automatically adjusts its height
 *
 * @type {Object} ResizableTextAreaProps
 * @property {function} onChange - The function to call when the text area value changes.
 * @property {string} value - The current value of the text area.
 * @property {boolean} isDisabled - Indicates if the text area is disabled.
 *
 * @returns {JSX.Element} The rendered ResizableTextArea component.
 */
function ResizableTextArea({
	onChange,
	value,
	isDisabled,
}: ResizableTextAreaProps) {
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
	}, [textAreaRef, value]);

	return (
		<textarea
			onChange={onChange}
			className="w-full text-sm placeholder:text-zinc-400 px-6 scrollbar-fancy focus:outline-none resize-none max-h-[120px]"
			ref={textAreaRef}
			placeholder="Ask anything..."
			id="query"
			name="query"
			value={isDisabled ? '' : value}
			disabled={isDisabled}
		/>
	);
}

export default ResizableTextArea;
