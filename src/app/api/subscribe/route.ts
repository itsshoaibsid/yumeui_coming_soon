import { NextResponse } from 'next/server';
import crypto from 'crypto';

function getSubscriberHash(email: string) {
	return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		if (!email || !email.includes('@')) {
			return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
		}

		const API_KEY = process.env.MAILCHIMP_API_KEY!;
		const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
		const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX!;

		const subscriberHash = getSubscriberHash(email);
		const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

		const data = {
			email_address: email,
			status_if_new: 'subscribed',
			status: 'subscribed',
		};

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `apikey ${API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.status === 200 || response.status === 201) {
			return NextResponse.json(
				{ message: 'Subscribed successfully' },
				{ status: 200 }
			);
		} else {
			const errorData = await response.json();
			return NextResponse.json(
				{ error: errorData.detail },
				{ status: response.status }
			);
		}
	} catch (error) {
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
