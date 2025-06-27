import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { handleApiMethod } from '@/utils/api';

const HOSTELITE_API_URL = process.env.HOSTELITE_API_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const hostelIdCookie = cookieStore.get('HostelId');

  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  if (hostelIdCookie && hostelIdCookie?.value) {
    try {
      return handleApiMethod(`GET`, `${HOSTELITE_API_URL}`, `/api/hostelite/Enquiry/AllEnquiries/${hostelIdCookie?.value}`, headers);
    } catch (error: any) {
      return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
    }
  } else {
    return Response.json({ error: 'Hostel Id not set in Cookie' });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();

  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(`POST`, `${HOSTELITE_API_URL}`, `/api/hostelite/Enquiry`, headers, data);
  } catch (error) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();

  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(`PUT`, `${HOSTELITE_API_URL}`, `/api/hostelite/Enquiry`, headers, data);
  } catch (error) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();

  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(`DELETE`, `${HOSTELITE_API_URL}`, `/api/hostelite/Enquiry/${data.id}`, headers);
  } catch (error) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
