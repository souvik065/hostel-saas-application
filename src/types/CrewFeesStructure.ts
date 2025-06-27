export interface FeeStructureData {
  id?: string;
  name?: string;
  planTypeId?: string;
  feeTypeId?: string;
  amount?: string;
  noOfInstallments?: string;
  hostelId?: string;
  dueDate?: Date;
  installments: Installment[];
}
export interface Installment {
  id: string;
  name: string;
  dueDate: Date;
  amount: string;
  isActive: boolean;
}

export interface FeeStructureProps {
  feesStructureDate: FeeStructureData;
  isModal?: boolean;
  closeModal?: () => void;
  getFeesList?: (id: string) => void;
}

export interface AssignFeesStructureFormError {
  id?: string;
  name?: string;
  planTypeId?: string;
  feeTypeId?: string;
  amount?: string;
  noOfInstallments?: string;
  hostelId?: string;
  installments?: AssignInstallmentError[];
}

export type AssignInstallmentError = {
  id?: string;
  name?: string;
  dueDate?: string;
  amount?: string;
};
