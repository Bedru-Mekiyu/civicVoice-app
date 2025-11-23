// api.ts - FIXED FOR PRODUCTION & LOCAL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://civicvoiceapp.onrender.com');

// Optional: Auto-detect if backend is down and fallback to mock (great for demo)
const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

async function apiFetch<T>(
  path: string,
  opts: RequestInit = {},
  token?: string
): Promise<T> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const res = await fetch(url, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(opts.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Request failed: ${res.status}`);
    }

    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return (undefined as unknown) as T;

    return await res.json();
  } catch (err: any) {
    // If backend is down and mock mode is enabled → fall back to mock
    if (IS_MOCK_MODE && err.message.includes('Failed to fetch')) {
      console.warn('Backend unreachable → using mock data');
      return mockFallback(path, opts);
    }
    throw err;
  }
}

// Mock fallback (only used if backend is down and VITE_USE_MOCK=true)
function mockFallback(path: string, opts: RequestInit): any {
  if (path.includes('/api/auth/register') && opts.method === 'POST') {
    const body = JSON.parse(opts.body as string);
    const result = mockAuth.register(body.name, body.email, body.password);
    if (!result.success) throw new Error(result.error);
    return { success: true, message: "Registered (mock)", otp: result.otp };
  }
  if (path.includes('/api/auth/activate') && opts.method === 'POST') {
    const body = JSON.parse(opts.body as string);
    const result = mockAuth.activate(body.email, body.otp);
    if (!result.success) throw new Error(result.error);
    return { success: true, token: result.token };
  }
  // Add more mock paths as needed
  throw new Error('Mock not implemented for this endpoint');
}

// ----------------- Auth API -----------------
export const AuthApi = {
  signin: (body: SignInBody) =>
    apiFetch<{ token: string; user: any }>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  register: (body: RegisterBody) =>
    apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  activate: (body: ActivateBody) =>
    apiFetch('/api/auth/activate', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  me: (token: string) =>
    apiFetch('/api/auth/me', { method: 'GET' }, token),

  logout: () => apiFetch('/api/auth/logout', { method: 'POST' }),

  uploadAvatar: async (form: FormData, token: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/avatar`, {
      method: 'POST',
      body: form,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

// Other APIs remain the same
export const ServicesApi = {
  list: () => apiFetch('/api/services', { method: 'GET' }),
};

export const FeedbackApi = {
  list: (page = 1, limit = 10) =>
    apiFetch(`/api/feedback?page=${page}&limit=${limit}`, { method: 'GET' }),

  submit: async (form: FormData, token: string) => {
    const res = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      body: form,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      credentials: 'include',
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

export const DashboardApi = {
  get: (token: string) => apiFetch('/api/dashboard', { method: 'GET' }, token),
};