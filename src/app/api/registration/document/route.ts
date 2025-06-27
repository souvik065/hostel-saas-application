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
    return handleApiMethod(`POST`, `${HOSTELITE_API_URL}`, `/api/hostelite/Document`, headers, data);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
