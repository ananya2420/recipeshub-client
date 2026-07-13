import SuccessClient from '@/components/SuccessClient';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
//import SuccessClient from '@/components/SuccessClient'; // Ensure this path is correct

export default async function Success({ searchParams }) {
  const params = await searchParams;
  const session_id = params?.session_id;

  if (!session_id) return redirect('/');

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items']
    });

    if (session.status === 'complete') {
      const plainSession = JSON.parse(JSON.stringify(session));
      // This passes the data to your new client component
      return <SuccessClient session={plainSession} session_id={session_id} />;
    }
    return redirect('/');
  } catch (error) {
    return <div>Error loading payment details.</div>;
  }
}