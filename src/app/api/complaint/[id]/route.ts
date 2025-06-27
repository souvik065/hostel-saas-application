import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const HOSTELITE_API_URL = process.env.HOSTELITE_API_URL;

// Get Complaints By Hostel Id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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
      `/api/hostelite/Complaint/AllComplaints/${params.id}`,
      headers,
    );
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
