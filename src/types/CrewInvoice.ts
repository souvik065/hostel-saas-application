export interface InvoiceData {
  id?: string;
  date?: Date;
  hostelId?: string;
  invoiceNumber?: string;
  hosteliteId?: string;
  address?: string;
  roomNumber?: string;
  mobile?: string;
  countryCodeValue?: string;
  feeTypeId?: string;
  amount?: string;
  dueDate?: Date;
  accounts?: string;
}

export interface InvoiceDetail {
  id?: string;
  invoiceNumber?: string;
  hosteliteId?: string;
  firstName?: string;
  lastName?: string;
  planTypeId?: string;
  planType?: string;
  installmentId?: string;
  installmentName?: string;
  feeTypeId?: string;
  feeType?: string;
  typeOfGeneration?: string;
  dueDate?: string;
  amount?: number;
  status?: string;
  date?: string;
  hostelId?: string;
}

export interface InvoiceProps {
  invoiceData?: InvoiceData;
  isModal?: boolean;
  closeModal?: () => void;
  getInvoiceListByHostelId?: (id: string) => void;
}

export type InvoiceFormError = {
  date?: string;
  hostelId?: string;
  invoiceNumber?: string;
  hosteliteId?: string;
  address?: string;
  roomNumber?: string;
  mobile?: string;
  countryCodeValue?: string;
  feeTypeId?: string;
  amount?: string;
  dueDate?: string;
  accounts?: string;
};
