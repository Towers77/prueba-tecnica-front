'use server';

export async function getQueryResponse(
	previousState: string,
	formData: FormData
) {
	console.log('query', formData);
	return 'response';
}
