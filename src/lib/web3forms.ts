/**
 * Single place that talks to Web3Forms. Both the site contact form and the
 * demo builder's enquiry form go through here, so there is one email path.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

export const web3formsConfigured = Boolean(ACCESS_KEY)

export interface SubmitOptions {
  subject: string
  fromName: string
  /** Flat key/value pairs; keys become the labels in the email. */
  fields: Record<string, string>
}

export class Web3FormsError extends Error {}

export async function submitToWeb3Forms({ subject, fromName, fields }: SubmitOptions): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Web3FormsError('The form is not connected yet. Please email us directly.')
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, subject, from_name: fromName, ...fields }),
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  if (!res.ok || !json.success) {
    throw new Web3FormsError(json.message || 'Something went wrong. Please try again or email us.')
  }
}
