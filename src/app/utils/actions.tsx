'use server';

export async function getQueryResponse(
	previousState: string,
	formData: FormData
) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const query = formData.get('query') as string;
	return query;
}
