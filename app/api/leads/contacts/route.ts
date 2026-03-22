import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return Response.json({ error: 'id parameter required' }, { status: 400 });
  }

  try {
    const res = await fetch(`http://3.142.118.148:3200/lead/contacts?id=${encodeURIComponent(id)}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      return Response.json({ error: 'Contact data not available' }, { status: 404 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: 'Failed to fetch contact data' }, { status: 500 });
  }
}
