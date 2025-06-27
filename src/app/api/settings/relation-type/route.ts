import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const PARENT_API_URL = process.env.PARENT_API_URL;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = req?.headers?.get('Authorization');

  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };

  try {
    return handleApiMethod(`GET`, `${PARENT_API_URL}`, `/api/parent/Relation/all`, headers);
  } catch (error) {
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
    return handleApiMethod(`POST`, `${PARENT_API_URL}`, `/api/parent/Relation`, headers, data);
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
    return handleApiMethod(`PUT`, `${PARENT_API_URL}`, `/api/parent/Relation`, headers, data);
  } catch (error: any) {
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
    return handleApiMethod(`DELETE`, `${PARENT_API_URL}`, `/api/parent/Relation/${data?.id}`, headers);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
