export interface OutPassFormData {
  id?: string;
  hostelId?: string;
  date?: Date;
  timeFrom?: string;
  timeTo?: string;
}

export interface OutPassFormProps {
  outPassData?: OutPassFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllOutPassList?: () => void;
}

export interface CreateOutPassFormError {
  hostelId?: string;
  date?: Date;
  timeFrom?: string;
  timeTo?: string;
}

export interface OutPassDetail {
  id?: string;
  hosteliteId?: string;
  hostelId?: string;
  date?: string;
  timeFrom?: string;
  timeTo?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface OutPassApprovalFormProps {
  outPassData?: OutPassFormData;
  statusId?: string;
  role?: string;
  isModal?: boolean;
  closeModal?: () => void;
  getAllOutPass?: () => void;
}

export interface OutPassApprovalFormError {
  reason?: string;
}
