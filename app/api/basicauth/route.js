// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  console.log('GET /api/basicauth/route.ts');
  return new Response('Authentication Required!', {
    status: 401,
    headers: {
      'WWW-Authenticate': "Basic realm='private_pages'",
    },
  });
}
