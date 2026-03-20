import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // If Resend API key is configured, send via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey !== 'your_resend_api_key_here') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AOX <noreply@aox.llc>',
          to: [email],
          subject: 'Welcome to AOX — Agent Opportunity Exchange',
          html: '<p>You have been added to the AOX waitlist. We will notify you when access is available.</p>',
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
