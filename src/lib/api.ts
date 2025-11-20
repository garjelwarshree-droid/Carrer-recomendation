const DEFAULT_API_BASE_URL = 'https://carrer-recomendation.onrender.com/api';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? DEFAULT_API_BASE_URL;

type ApiRequestOptions = RequestInit & {
  token?: string | null;
  skipJsonParsing?: boolean;
};

export async function apiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { token, headers, skipJsonParsing, ...init } = options;
  const finalHeaders: HeadersInit = {
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };

  if (token) {
    finalHeaders['Authorization'] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: finalHeaders,
  });

  if (response.status === 204 || skipJsonParsing) {
    return undefined as T;
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.detail ||
      data?.message ||
      `Request to ${path} failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

