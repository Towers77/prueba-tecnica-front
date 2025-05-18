'use server';

type QueryResponseType = {
	res: string;
};

// TODO: Handle errors
export async function getQueryResponse(
	previousState: string,
	formData: FormData
) {
	try {
		const res = await fetch(
			`http://localhost:8000/query?q=${formData.get('query')}`,
			{
				method: 'GET',
			}
		);
		const data: QueryResponseType = await res.json();

		return data.res;
	} catch (error) {
		throw new Error('Error fetching query response');
	}
}
