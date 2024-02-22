export async function GET(request) {
  
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  const pageParam = searchParams.get('page');

  const page = pageParam ? `?page=${pageParam}` : '';

  const baseUrl = 'https://swapi.dev/api/';
  const url = `${baseUrl}${endpoint}/${page}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

