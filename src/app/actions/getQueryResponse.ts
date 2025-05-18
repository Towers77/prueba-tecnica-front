'use server';

type QueryResponseType = {
	res: string;
};

type QueryErrorType = {
	detail: string;
};

export async function getQueryResponse(
	previousState: string | undefined,
	formData: FormData
) {
	try {
		const res = await fetch(
			`http://localhost:8000/query?q=${formData.get('query')}`,
			{
				method: 'GET',
			}
		);

		if (!res.ok) {
			const error: QueryErrorType = await res.json();
			throw new Error(error.detail);
		}

		const data: QueryResponseType = await res.json();
		return data.res;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		return;
	}
}
