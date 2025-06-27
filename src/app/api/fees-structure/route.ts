import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const PAYMENT_API_URL = process.env.PAYMENT_API_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const token = req?.headers?.get('Authorization');
  const id = searchParams.get('id');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  try {
    return handleApiMethod(
      `GET`,
      `${PAYMENT_API_URL}`,
      `/api/payment/FeeStructure/GetFeeStructuresByHostelId/${id}`,
      headers,
    );
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
    return handleApiMethod(`POST`, `${PAYMENT_API_URL}`, `/api/payment/FeeStructure`, headers, data);
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
    return handleApiMethod(`PUT`, `${PAYMENT_API_URL}`, `/api/payment/FeeStructure`, headers, data);
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
    return handleApiMethod(`DELETE`, `${PAYMENT_API_URL}`, `/api/payment/FeeStructure/${data.id}`, headers);
  } catch (error) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
