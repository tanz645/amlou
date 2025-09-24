// Minimal API helper for client-side requests using env-based base URL

export type ApiError = {
	status: number;
	message: string;
	details?: unknown;
};

export type ApiResponse<T> = {
	success: boolean;
	message?: string;
	data?: T;
};

function getBaseUrl(): string {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	if (!baseUrl) {
		throw new Error('Missing NEXT_PUBLIC_API_BASE_URL. Set it in .env.local');
	}
	return baseUrl.replace(/\/$/, '');
}

export async function postJson<TRequest extends Record<string, unknown>, TResponse>(
	path: string,
	body: TRequest,
	init?: RequestInit
): Promise<ApiResponse<TResponse>> {
	const baseUrl = getBaseUrl();
	const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers || {}),
		},
		body: JSON.stringify(body),
		...init,
	});

	const contentType = response.headers.get('content-type') || '';
	const isJson = contentType.includes('application/json');
	const payload = isJson ? await response.json() : undefined;

	if (!response.ok) {
		const apiError: ApiError = {
			status: response.status,
			message: (payload && (payload.message || payload.error)) || response.statusText || 'Request failed',
			details: payload,
		};
		throw apiError;
	}

	return payload as ApiResponse<TResponse>;
}
