'use client';

import { useActionState } from 'react';
import ChatInput from './components/ChatInput';
import ChatContextProvider from './utils/chatContext';
import { getQueryResponse } from './utils/actions';

export default function Home() {
	const [state, action, isLoading] = useActionState(getQueryResponse, '');

	return (
		<main className="h-full w-2/3 lg:w-1/3 flex flex-col justify-end py-8">
			<ChatContextProvider>
				<ChatInput action={action} />
			</ChatContextProvider>
		</main>
	);
}
