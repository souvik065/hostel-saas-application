import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const PARENT_API_URL = process.env.PARENT_API_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  try {
    return handleApiMethod(`GET`, `${PARENT_API_URL}`, `/api/parent/Parent/GetparentDetails`, headers);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
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
    return handleApiMethod(`POST`, `${PARENT_API_URL}`, `/api/parent/Parent`, headers, data);
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
    return handleApiMethod(`PUT`, `${PARENT_API_URL}`, `/api/parent/Parent`, headers, data);
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
    return handleApiMethod(`PATCH`, `${PARENT_API_URL}`, `/api/parent/Parent`, headers, data);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
