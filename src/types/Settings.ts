export type AssignPlanTypeError = {
  id?: string;
  name?: string;
};

export type AssignPlanTypeFormError = {
  hostelId?: string;
  planTypes?: AssignPlanTypeError[];
};

export type AssignFeeTypeError = {
  id?: string;
  type?: string;
};

export type AssignFeeTypeFormError = {
  hostelId?: string;
  feeTypes?: AssignFeeTypeError[];
};

export type AssignRelationTypeError = {
  id?: string;
  relationname?: string;
};

export type AssignRelationTypeFormError = {
  relationTypes?: AssignPlanTypeError[];
};

export type AssignLeaveTypeError = {
  id?: string;
  name?: string;
};

export type AssignLeaveTypeFormError = {
  hostelId?: string;
  leaveTypes?: AssignLeaveTypeError[];
};
