import type Stripe from 'stripe'
// Centralised service instances (handles build-time stubs & runtime keys)
import { stripe } from '@/lib/services-init'

// re-export the shared instance for convenience
export { stripe }

export interface CreatePaymentIntentParams {
  amount: number // in cents
  currency: string
  customerId?: string
  metadata?: Record<string, string>
  description?: string
}

export interface CreateCustomerParams {
  email: string
  name?: string
  metadata?: Record<string, string>
}

export interface CreateSubscriptionParams {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

// Payment Intent operations
export async function createPaymentIntent(params: CreatePaymentIntentParams): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: params.amount,
    currency: params.currency,
    customer: params.customerId,
    metadata: params.metadata,
    description: params.description,
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

export async function retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.retrieve(paymentIntentId)
}

export async function confirmPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.confirm(paymentIntentId)
}

// Customer operations
export async function createCustomer(params: CreateCustomerParams): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email: params.email,
    name: params.name,
    metadata: params.metadata,
  })
}

export async function retrieveCustomer(customerId: string): Promise<Stripe.Customer> {
  return await stripe.customers.retrieve(customerId) as Stripe.Customer
}

export async function updateCustomer(customerId: string, params: Partial<CreateCustomerParams>): Promise<Stripe.Customer> {
  return await stripe.customers.update(customerId, {
    email: params.email,
    name: params.name,
    metadata: params.metadata,
  })
}

// Payment Method operations
export async function listPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  })
  return paymentMethods.data
}

export async function attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<Stripe.PaymentMethod> {
  return await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  })
}

export async function detachPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
  return await stripe.paymentMethods.detach(paymentMethodId)
}

// Subscription operations
export async function createSubscription(params: CreateSubscriptionParams): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.create({
    customer: params.customerId,
    items: [{ price: params.priceId }],
    metadata: params.metadata,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })
}

export async function retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId)
}

export async function updateSubscription(subscriptionId: string, params: { priceId?: string }): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  
  return await stripe.subscriptions.update(subscriptionId, {
    items: [{
      id: subscription.items.data[0].id,
      price: params.priceId,
    }],
    proration_behavior: 'create_prorations',
  })
}

export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId)
}

// Webhook utilities
export function constructWebhookEvent(body: string, signature: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set in environment variables')
  }
  
  return stripe.webhooks.constructEvent(body, signature, webhookSecret)
}

// Price utilities
export async function listPrices(): Promise<Stripe.Price[]> {
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })
  return prices.data
}

export async function createPrice(params: {
  productId: string
  unitAmount: number
  currency: string
  recurring?: {
    interval: 'month' | 'year'
  }
}): Promise<Stripe.Price> {
  return await stripe.prices.create({
    product: params.productId,
    unit_amount: params.unitAmount,
    currency: params.currency,
    recurring: params.recurring,
  })
}

// Product utilities
export async function createProduct(params: {
  name: string
  description?: string
  metadata?: Record<string, string>
}): Promise<Stripe.Product> {
  return await stripe.products.create({
    name: params.name,
    description: params.description,
    metadata: params.metadata,
  })
} 