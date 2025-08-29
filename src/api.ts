// src/services/api.ts
import axios, { AxiosInstance, AxiosHeaders } from 'axios';

async function generateSignature(body: string, timestamp: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const data = encoder.encode(`${body}|${timestamp}`);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}


const api: AxiosInstance = axios.create({
    baseURL: 'https://api.doclet.app/',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

// --- Request Interceptor ---
api.interceptors.request.use(async (config) => {
    const timestamp = Date.now().toString();
    let body = config.data ? JSON.stringify(config.data) : '{}';

    const signature = await generateSignature(body, timestamp, import.meta.env.VITE_SIGNATURE_SECRET || '');
    console.log(signature)

    if (!config.headers) {
        config.headers = new AxiosHeaders();
    }

    config.headers['X-Timestamp'] = timestamp;
    config.headers['X-Signature'] = signature;

    return config;
});