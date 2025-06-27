import { SubmitHandler } from "react-hook-form";
import * as yup from 'yup';

export interface FormProviderProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>; // You should define a proper type for the form data
  validationSchema: yup.AnyObjectSchema;
}
