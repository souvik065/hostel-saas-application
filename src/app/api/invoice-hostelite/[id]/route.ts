import { handleApiMethod } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

const PAYMENT_API_URL = process.env.PAYMENT_API_URL;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req?.headers?.get('Authorization');
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'content-type': 'application/json',
  };
  try {
    return handleApiMethod(`GET`, `${PAYMENT_API_URL}`, `/api/payment/Invoice/hostel/${params.id}`, headers);
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req?.headers?.get('Authorization');
  const data = await req.json();
  const headers = {
    Accept: 'application/json',
    Authorization: token,
    'Content-Type': 'application/json',
  };
  try {
    return handleApiMethod(
      `POST`,
      `${PAYMENT_API_URL}`,
      `/api/payment/Invoice/CreateNegativeInvoiceForSingleIncorrectInvoice/${params.id}`,
      headers,
      data,
    );
  } catch (error: any) {
    return NextResponse.json({ errorMeesage: 'Internal Server Error', error: error });
  }
}
