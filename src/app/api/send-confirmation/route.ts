import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

function fmt(amount: number): string {
  return `฿${amount.toLocaleString("en-US")}`;
}

function buildConfirmationEmail({
  name,
  packageName,
  tier,
  duration,
  accommodation,
  totalPrice,
  depositPaid,
  remainingBalance,
  heroImageUrl,
}: {
  name: string;
  packageName: string;
  tier: string;
  duration: string;
  accommodation: string;
  totalPrice: number;
  depositPaid: number;
  remainingBalance: number;
  heroImageUrl: string;
}): string {
  const greeting = name ? name : "there";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your FitKoh Adventure Starts Now</title>
</head>
<body style="margin:0;padding:0;background-color:#f0eded;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0eded;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.1);">

          <!-- HERO IMAGE -->
          <tr>
            <td style="position:relative;">
              <img src="${heroImageUrl}" alt="FitKoh & Lionheart Samui" width="600" style="display:block;width:100%;height:auto;max-height:280px;object-fit:cover;" />
              <div style="background:linear-gradient(transparent,rgba(0,0,0,0.7));height:120px;margin-top:-120px;position:relative;"></div>
            </td>
          </tr>

          <!-- LOGO BAR -->
          <tr>
            <td style="background-color:#111111;padding:20px 40px;text-align:center;">
              <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:4px;">
                <span style="color:#ffffff;">FIT</span><span style="color:#009966;">KOH</span><span style="color:#009966;font-size:10px;vertical-align:super;">●</span>
              </h1>
              <p style="margin:4px 0 0;font-size:11px;color:#777;letter-spacing:2px;text-transform:uppercase;">
                &amp; Lionheart Samui &nbsp;•&nbsp; Koh Samui, Thailand
              </p>
            </td>
          </tr>

          <!-- GREEN SUCCESS BANNER -->
          <tr>
            <td style="background:linear-gradient(135deg,#009966,#00b377);padding:24px 40px;text-align:center;">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:36px;height:36px;background-color:rgba(255,255,255,0.2);border-radius:50%;text-align:center;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:20px;font-weight:bold;">✓</span>
                  </td>
                  <td style="padding-left:14px;">
                    <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:1px;">
                      You're Booked!
                    </h2>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WELCOME MESSAGE -->
          <tr>
            <td style="padding:36px 40px 12px;">
              <h3 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111;">
                Hey ${greeting} 🌴
              </h3>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#444;">
                <strong>Your adventure at FitKoh starts now.</strong> Your deposit is confirmed and your spot is reserved. Whether you're here to train Muay Thai, transform your body, or find your edge — we're ready for you.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#444;">
                Here's everything you need to know:
              </p>
            </td>
          </tr>

          <!-- BOOKING DETAILS CARD -->
          <tr>
            <td style="padding:8px 40px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf8;border-radius:12px;border:1px solid #eee;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td colspan="2" style="padding-bottom:16px;border-bottom:1px solid #eee;">
                          <span style="font-size:11px;font-weight:700;color:#009966;text-transform:uppercase;letter-spacing:2px;">📋 Your Package</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0 6px;font-size:13px;color:#999;width:140px;">Program</td>
                        <td style="padding:12px 0 6px;font-size:15px;font-weight:700;color:#111;">${packageName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#999;">Tier</td>
                        <td style="padding:6px 0;font-size:15px;font-weight:600;color:#111;">${tier}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:13px;color:#999;">Duration</td>
                        <td style="padding:6px 0;font-size:15px;font-weight:600;color:#111;">${duration}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0 0;font-size:13px;color:#999;">Accommodation</td>
                        <td style="padding:6px 0 0;font-size:15px;font-weight:600;color:#111;">${accommodation || "Self-arranged"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PAYMENT SUMMARY -->
          <tr>
            <td style="padding:0 40px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <span style="font-size:11px;font-weight:700;color:#009966;text-transform:uppercase;letter-spacing:2px;">💳 Payment</span>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#aaa;">Total Package</td>
                        <td style="padding:6px 0;font-size:14px;color:#fff;text-align:right;">${fmt(totalPrice)}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#aaa;">Deposit Paid</td>
                        <td style="padding:6px 0;font-size:14px;color:#009966;font-weight:700;text-align:right;">- ${fmt(depositPaid)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:10px 0 0;border-top:1px solid #333;"></td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:16px;font-weight:700;color:#fff;">Remaining Balance</td>
                        <td style="padding:4px 0;font-size:20px;font-weight:800;color:#de5f04;text-align:right;">${fmt(remainingBalance)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:8px 0 0;">
                          <span style="font-size:11px;color:#666;">Due at check-in</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SAMPLE WEEKLY SCHEDULE -->
          <tr>
            <td style="padding:0 40px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f0faf5,#f5f8f0);border-radius:12px;border:1px solid #d4edda;">
                <tr>
                  <td style="padding:24px 28px;">
                    <span style="font-size:11px;font-weight:700;color:#009966;text-transform:uppercase;letter-spacing:2px;">🗓️ Your Typical Day at FitKoh</span>
                    <p style="margin:12px 0 16px;font-size:13px;color:#666;line-height:1.5;">Here's a taste of what's waiting for you:</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">7:00 AM</span>
                          <span style="font-size:13px;color:#333;">Morning Yoga at the Beach Sala 🧘</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">8:00 AM</span>
                          <span style="font-size:13px;color:#333;">Breakfast at the Gym Café — macros tracked 🥗</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">9:30 AM</span>
                          <span style="font-size:13px;color:#333;">Muay Thai / Fitness Class 🥊</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">12:00 PM</span>
                          <span style="font-size:13px;color:#333;">Healthy lunch — chef-prepared, nutritionist-designed 🍽️</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">2:00 PM</span>
                          <span style="font-size:13px;color:#333;">Personal Training / S&C Session 💪</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(0,153,102,0.1);">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">4:00 PM</span>
                          <span style="font-size:13px;color:#333;">Beach walk — Ban Tai Beach is 200m away 🏖️</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:12px;font-weight:700;color:#009966;display:inline-block;width:70px;">6:00 PM</span>
                          <span style="font-size:13px;color:#333;">Dinner at the Beach Café — sunset views 🌅</span>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0;font-size:12px;color:#999;font-style:italic;">
                      * Your personalized schedule will be sent before arrival
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT TO DO NEXT -->
          <tr>
            <td style="padding:0 40px 28px;">
              <h3 style="margin:0 0 20px;font-size:18px;font-weight:700;color:#111;">
                Before You Arrive
              </h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#009966;border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:800;">1</td>
                        <td style="padding-left:16px;">
                          <strong style="font-size:14px;color:#111;">Check your inbox</strong>
                          <br /><span style="font-size:13px;color:#666;">We'll send your detailed itinerary within 24 hours</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#009966;border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:800;">2</td>
                        <td style="padding-left:16px;">
                          <strong style="font-size:14px;color:#111;">Download the Rezerv app</strong>
                          <br /><span style="font-size:13px;color:#666;">You'll use it to book classes and check in each day</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#009966;border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:800;">3</td>
                        <td style="padding-left:16px;">
                          <strong style="font-size:14px;color:#111;">Pack your training gloves & wraps</strong>
                          <br /><span style="font-size:13px;color:#666;">Mandatory for Muay Thai/boxing — also available at our shop</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;height:36px;background:#009966;border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:14px;font-weight:800;">4</td>
                        <td style="padding-left:16px;">
                          <strong style="font-size:14px;color:#111;">Need airport transfer?</strong>
                          <br /><span style="font-size:13px;color:#666;">Email us 48hrs before with your flight details — ~600 THB</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA BUTTON (bulletproof table-based) -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="background:#009966;border-radius:50px;padding:14px 40px;">
                    <a href="https://wa.me/66808848280" target="_blank" style="color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;display:block;">WhatsApp Us With Any Questions</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#111;padding:32px 40px;text-align:center;">
              <h3 style="margin:0 0 4px;font-size:20px;font-weight:700;letter-spacing:3px;">
                <span style="color:#fff;">FIT</span><span style="color:#009966;">KOH</span>
              </h3>
              <p style="margin:0 0 12px;font-size:11px;color:#777;letter-spacing:1px;">& LIONHEART SAMUI</p>
              <p style="margin:0 0 4px;font-size:12px;color:#888;">Ban Tai, Koh Samui, Thailand</p>
              <p style="margin:0 0 4px;font-size:12px;color:#888;">info@fitkoh.com &nbsp;|&nbsp; +66 80 884 82 80</p>
              <p style="margin:16px 0 0;font-size:11px;color:#009966;">
                fitkoh.com &nbsp;|&nbsp; lionheartsamui.com
              </p>
            </td>
          </tr>

          <!-- DEMO NOTICE -->
          <tr>
            <td style="padding:14px 40px;text-align:center;background-color:#fafafa;">
              <p style="margin:0;font-size:10px;color:#bbb;">
                This is a prototype demo by Rebelz AI Agency. No real charges were made.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name ?? "";

    if (!customerEmail) {
      return NextResponse.json(
        { error: "No customer email found on session" },
        { status: 400 }
      );
    }

    const metadata = session.metadata ?? {};
    const packageName = metadata.programName || "FitKoh Package";
    const tier = metadata.tier || "Standard";
    const duration = metadata.duration || "1 Week";
    const accommodation = metadata.accommodation || "Self-arranged";
    const totalAmountRaw = Number(metadata.totalAmount || 0);
    const depositPaidRaw = (session.amount_total ?? 0) / 100;

    const totalPrice = totalAmountRaw > 0 ? totalAmountRaw : depositPaidRaw * 2;
    const depositPaid = depositPaidRaw;
    const remainingBalance = totalPrice - depositPaid;

    // Use a publicly hosted hero image — once deployed to Vercel this will be the real URL
    const origin = request.headers.get("origin") || "https://fitkoh-prototype.vercel.app";
    const heroImageUrl = `${origin}/images/camp-aerial.jpg`;

    const html = buildConfirmationEmail({
      name: customerName.split(" ")[0],
      packageName,
      tier,
      duration,
      accommodation,
      totalPrice,
      depositPaid,
      remainingBalance,
      heroImageUrl,
    });

    const { error: emailError } = await resend.emails.send({
      from: "FitKoh Bookings <bookings@thinkbig.rebelz-ai.com>",
      to: customerEmail,
      subject: "You're Booked! Your FitKoh Adventure Starts Now 🌴🥊",
      html,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { error: "Failed to send confirmation email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("send-confirmation error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
