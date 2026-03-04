import twilio from 'twilio'

let client: ReturnType<typeof twilio> | null = null

export function getTwilioClient() {
  if (!client) {
    const sid = process.env.TWILIO_ACCOUNT_SID
    const token = process.env.TWILIO_AUTH_TOKEN
    if (!sid || !token) throw new Error('Twilio credentials not configured')
    client = twilio(sid, token)
  }
  return client
}

export async function sendSMS(to: string, body: string): Promise<void> {
  const from = process.env.TWILIO_PHONE_NUMBER
  if (!from) throw new Error('TWILIO_PHONE_NUMBER is not set')
  const c = getTwilioClient()
  await c.messages.create({ to, from, body })
}
