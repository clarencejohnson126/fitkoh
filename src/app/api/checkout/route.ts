import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: NextRequest) {
  try {
    const {
      programName,
      tier,
      duration,
      accommodation,
      totalAmount,
      depositAmount,
    } = await request.json();

    if (!programName || !totalAmount || !depositAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: programName, totalAmount, depositAmount' },
        { status: 400 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Build a descriptive item name
    const parts = [programName];
    if (tier) parts[0] = `${programName} ${tier}`;
    if (duration) parts.push(`(${duration})`);
    if (accommodation) parts.push(`+ ${accommodation}`);
    const itemName = `FitKoh — ${parts.join(' ')} — 50% Deposit`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: itemName,
              description: `Total package: ฿${totalAmount.toLocaleString()} THB. This is a 50% deposit payment.`,
            },
            unit_amount: Math.round(depositAmount * 100), // Stripe expects smallest currency unit (satang for THB)
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        programName,
        tier: tier || '',
        duration: duration || '',
        accommodation: accommodation || '',
        totalAmount: String(totalAmount),
        depositAmount: String(depositAmount),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Checkout API error:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
