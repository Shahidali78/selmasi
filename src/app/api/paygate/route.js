import crypto from 'crypto'

export async function POST(request) {
  try {
    const { amount, planName, learners, monthlyTotal } = await request.json()

    if (!amount || !planName || !learners) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const MERCHANT_ID = process.env.NEXT_PUBLIC_PAYGATE_MERCHANT_ID
    const SECRET_KEY = process.env.PAYGATE_SECRET_KEY
    const PASSPHRASE = process.env.PAYGATE_PASSPHRASE
    const MODE = process.env.NEXT_PUBLIC_PAYGATE_MODE || 'test'
    const PAYGATE_URL = process.env.NEXT_PUBLIC_PAYGATE_URL || 'https://secure.paygate.co.za/payweb3/initiate.trans'

    if (!MERCHANT_ID || !SECRET_KEY || MERCHANT_ID === 'YOUR_MERCHANT_ID') {
      return Response.json(
        { error: 'Online payment will be activated once merchant setup is complete.' },
        { status: 503 }
      )
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://selmasi.africa'
    const amountInCents = Math.round(amount * 100).toString()

    const fields = {
      PAYGATE_ID: MERCHANT_ID,
      REFERENCE: `SELMASI-${planName.toUpperCase().replace(/\s/g, '')}-${learners}-${Date.now()}`,
      AMOUNT: amountInCents,
      CURRENCY: 'ZAR',
      RETURN_URL: `${SITE_URL}/?payment=success`,
      TRANSACTION_DATE: new Date().toISOString().replace('T', ' ').slice(0, 19),
      LOCALE: 'en-za',
      COUNTRY: 'ZAF',
      EMAIL: 'Info@selmasi.africa',
    }

    const checksumString = Object.values(fields).join('') + (PASSPHRASE || '')
    fields.CHECKSUM = crypto.createHash('md5').update(checksumString).digest('hex')

    const formData = new URLSearchParams(fields)
    const paygateRes = await fetch(PAYGATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    })

    const responseText = await paygateRes.text()
    const params = new URLSearchParams(responseText)
    const payRequestId = params.get('PAY_REQUEST_ID')

    if (payRequestId) {
      const redirectUrl = `https://secure.paygate.co.za/payweb3/process.trans?PAY_REQUEST_ID=${payRequestId}&CHECKSUM=${params.get('CHECKSUM')}`
      return Response.json({ redirectUrl })
    }

    return Response.json(
      { error: 'Payment setup is being finalized. Please contact us to proceed.' },
      { status: 502 }
    )
  } catch {
    return Response.json(
      { error: 'Payment setup is being finalized. Please contact us to proceed.' },
      { status: 500 }
    )
  }
}
