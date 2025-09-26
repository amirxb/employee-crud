const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const errMsg = body && body.error ? body.error : body;
    const details = body && body.details ? body.details : undefined;
    const err = new Error(errMsg || 'API error');
    err.details = details;
    err.status = res.status;
    throw err;
  }
  return body;
};

export const getAll = async () => {
  const res = await fetch(`${API_BASE}/employee`);
  return handleResponse(res);
};

export const getById = async (id) => {
  const res = await fetch(`${API_BASE}/employee/${id}`);
  return handleResponse(res);
};

export const create = async (payload) => {
  const res = await fetch(`${API_BASE}/employee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
};

export const update = async (id, payload) => {
  const res = await fetch(`${API_BASE}/employee/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
};

export const remove = async (id) => {
  const res = await fetch(`${API_BASE}/employee/${id}`, { method: 'DELETE' });
  return handleResponse(res);
};