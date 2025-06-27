import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const PARENT_API_URL = process.env.PARENT_API_URL;

const HOSTELITE_API_URL = process.env.HOSTELITE_API_URL;

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
      `${PARENT_API_URL}`,
      `/api/parent/HosteliteParentMapping/HosteliteByLoggedParentId`,
      headers,
    );
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
// Parent approval
export async function PUT(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };

  try {
    return handleApiMethod(`PUT`, `${HOSTELITE_API_URL}`, `/api/hostelite/Leave/ParentLeaveApproval`, headers, data);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
