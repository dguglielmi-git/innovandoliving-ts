import { Categories } from '@/types/interfaces/common';
import { FormikValues } from 'formik';

export interface AddEditProductDetailsProps {
  setFormModified: () => void;
  title: string;
  formik: FormikValues;
  categories: Categories[];
}
