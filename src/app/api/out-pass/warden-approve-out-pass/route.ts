import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const HOSTELITE_API_URL = process.env.HOSTELITE_API_URL;

// Warden approval
export async function PUT(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };

  try {
    return handleApiMethod(
      `PUT`,
      `${HOSTELITE_API_URL}`,
      `/api/hostelite/OutPass/WardenOutPassApproval`,
      headers,
      data,
    );
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
