
export type AgreementFormError = {
    hostel?:string;
    agreement?:string;
    text?:string;
  };

export type AgreementFormData={
    id?:string;
    hostel?:string;
    agreement?:string;
    text?:string;
}

export interface AgreementProps{
    agreementData?:AgreementFormData;
    isModal?:boolean;
    closeModal?: () => void;
}