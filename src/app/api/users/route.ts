import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export async function GET(req: NextRequest) {  
  const authorization = req.cookies.get('accessToken')?.value;
  const res = await fetch(`${apiBaseUrl}/fetch-user-data`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization}`
    },
  })
  
  const data = await res.json();
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return response;
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  // const { email, username } = req.body;
  const authorization = req.cookies.get('accessToken')?.value;
  const res = await fetch(`${apiBaseUrl}/fetch-user-data`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authorization}`
    },
    body: JSON.stringify(body)
  })
  
  const data = await res.json();
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return response;
}