import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_URL = process.env.ADMIN_API_URL;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  try {
    return handleApiMethod(`GET`, `${ADMIN_API_URL}`, `/api/admin/Status/GetLeaveApprovalStatus`, headers);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
