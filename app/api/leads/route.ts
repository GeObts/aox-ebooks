export async function GET() {
  try {
    const res = await fetch('http://3.142.118.148:3200/leads', {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ listings: [], count: 0 });
  }
}
