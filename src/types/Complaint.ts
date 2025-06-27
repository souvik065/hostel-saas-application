export interface ComplaintFormProps {
  complaintData?: ComplaintFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllcomplaint?: () => void;
}
export interface ComplaintFormData {
  id?: string;
  complaintNo?: string;
  notes?: string;
  hostelId?: string;
  type?: string;
}

export interface ComplaintFormError {
  complaintNo?: string;
  notes?: string;
  hostelId?: string;
  type?: string;
}

export interface ApiErrorItem {
  propertyName: string;
  errorMessage: string;
}
export interface ApiErrorResponse {
  title: string;
  errors: ApiErrorItem[];
}
export interface complaintTypesDetail {
  id: string;
  name: string;
  notes: string;
  type: string;
  labelText: string;
  complaintNo: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface ComplaintStatusFormProps {
  complaintData?: ComplaintFormData;
  role?: string;
  isModal?: boolean;
  closeModal?: () => void;
  getAllcomplaint?: () => void;
}

export interface ComplainStatusFormError {
  reason?: string;
  statusId?: string;
}
