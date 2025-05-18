'use server';

type QueryResponseType = {
	res: string;
};

type QueryErrorType = {
	detail: string;
};

/**
 *  This function fetches a query response from the AI
 *
 * @param {string | undefined} previousState - previous state of the query
 * @param {FormData} formData - form data containing the query
 *
 * @returns {Promise<string | undefined>} response from the server as a string, or undefined if an error occurs
 */
export async function getQueryResponse(
	previousState: string | undefined,
	formData: FormData
): Promise<string | undefined> {
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
