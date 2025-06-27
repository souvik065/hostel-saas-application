import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_URL = process.env.ADMIN_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = req?.headers?.get('Authorization');
  const id = searchParams.get('id');

  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };

  try {
    return handleApiMethod(`GET`, `${ADMIN_API_URL}`, `/api/admin/Room/${id}`, headers);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' });
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
    return handleApiMethod(`PUT`, `${ADMIN_API_URL}`, `/api/admin/Room`, headers, data);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' });
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
    return handleApiMethod(`DELETE`, `${ADMIN_API_URL}`, `/api/admin/Room/${data?.roomId}/${data?.floorId}`, headers);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
