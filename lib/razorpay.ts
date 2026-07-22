import Razorpay from 'razorpay'

let instance: Razorpay | null = null

export function getRazorpay() {
  if (!instance) {
    const key_id = process.env.RAZORPAY_KEY_ID
    const key_secret = process.env.RAZORPAY_KEY_SECRET
    if (!key_id || !key_secret) {
      throw new Error('Razorpay keys are not configured')
    }
    instance = new Razorpay({ key_id, key_secret })
  }
  return instance
}
