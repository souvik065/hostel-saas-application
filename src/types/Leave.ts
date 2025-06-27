export interface LeaveDetail {
  id?: string;
  hostelId?: string;
  reason?: string;
  fromDate?: string;
  toDate?: string;
  leaveType?: string;
  firstName?: string;
  lastName?: string;
  parentApprovalStatusId?: string;
  parentApprovalStatus?: string;
  wardenApprovalStatusId?: string;
  wardenApprovalStatus?: string;
}

export interface LeaveFormData {
  id?: string;
  hostelId?: string;
  reason?: string;
  fromDate?: Date;
  toDate?: Date;
  leaveType?: string;
}

export interface leaveFormProps {
  leaveData?: LeaveFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllleaves?: () => void;
  leaveTypes: leaveTypeListforMat[];
}

export interface leaveTypeListforMat {
  label: string;
  value: string;
}

export interface CreateLeaveFormError {
  hostelId?: string;
  reason?: string;
  fromDate?: Date;
  toDate?: Date;
  leaveType?: string;
}

export interface LeaveTypeDetail {
  id: string;
  name: string;
  labelText: string;
  hostelId: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface LeaveTypeDetail {
  id: string;
  name: string;
  labelText: string;
  hostelId: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface leaveApprovalFormProps {
  leaveData?: LeaveFormData;
  statusId?: string;
  role?: string;
  isModal?: boolean;
  closeModal?: () => void;
  getAllleaves?: () => void;
}

export interface LeaveApprovalFormError {
  reason?: string;
}
