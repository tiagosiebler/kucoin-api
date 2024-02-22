import { createHmac } from 'crypto';

/** This is async because the browser version uses a promise (see browser-support.ts) */
export async function signMessage(
  message: string,
  secret: string,
  method: 'hex' | 'base64',
): Promise<string> {
  // console.log('sign message: ', { message, secret, method });
  const hmac = createHmac('sha256', secret).update(message);

  switch (method) {
    case 'hex': {
      return hmac.digest('hex');
    }
    case 'base64': {
      return hmac.digest().toString('base64');
    }
    default: {
      ((x: never) => {})(method);
      throw new Error(`Unhandled sign method: ${method}`);
    }
  }
}
