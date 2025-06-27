import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const HOSTELITE_API_URL = process.env.HOSTELITE_API_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(`POST`, `${HOSTELITE_API_URL}`, `/api/Hostelite/HosteliteDetail`, headers, data);
  } catch (error: any) {
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
    return handleApiMethod(`PUT`, `${HOSTELITE_API_URL}`, `/api/hostelite/HosteliteDetail`, headers, data);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(`PATCH`, `${HOSTELITE_API_URL}`, `/api/hostelite/HosteliteDetail`, headers, data);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  try {
    return handleApiMethod(
      `GET`,
      `${HOSTELITE_API_URL}`,
      `/api/hostelite/HosteliteDetail/GetHosteliteDetails`,
      headers,
    );
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
