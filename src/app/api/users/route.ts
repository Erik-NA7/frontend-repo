import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export async function GET(req: NextRequest) {  
  try {
    const authorization = req.cookies.get('accessToken')?.value;
    const res = await fetch(`${apiBaseUrl}/users/fetch-user-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorization}`
      },
    })
    
    const data = await res.json();
    const response = NextResponse.json(data);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const authorization = req.cookies.get('accessToken')?.value;
    const res = await fetch(`${apiBaseUrl}/users/update-user-data`, {
      method: 'PUT',
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
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}