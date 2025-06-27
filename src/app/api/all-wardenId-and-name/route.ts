import { handleApiMethod } from '../../../utils/api';
import { NextRequest, NextResponse } from 'next/server';

const WARDEN_API_URL = process.env.WARDEN_API_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };

  try {
    return handleApiMethod(`GET`, `${WARDEN_API_URL}`, `/api/warden/AllIdAndName`, headers);
  } catch (error) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
