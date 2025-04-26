import { useMemo } from 'react';
import { FormikValues } from 'formik';
import { FormCheckbox } from 'semantic-ui-react';
import CustomDropdown from '@/components/Common/CustomDropdown';
import CustomInput from '@/components/Common/CustomInput/CustomInput';
import CustomInputCalendar from '@/components/Common/CustomInputCalendar/CustomInputCalendar';
import { Categories } from '@/types/interfaces/common';

interface AddEditProductDetails {
  setFormModified: () => void;
  title: string;
  formik: FormikValues;
  categories: Categories[];
}

export const AddEditProductDetails = ({ setFormModified, title, formik, categories }: AddEditProductDetails) => {
  const loadCategories = useMemo(() => {
    return categories?.map((cat) => ({ key: cat._id, text: cat.title, value: cat._id }));
  }, [categories]);

  return (
    <section className='add-edit-product-details'>
      <section className='add-edit-product-details__title'>
        <h3>{title}</h3>
      </section>
      <section className='add-edit-product-details__form'>
        <CustomInput
          label='Product Title'
          placeholder='Product Title'
          name='productTitle'
          onChange={(e: any) => {
            formik.setFieldValue('productTitle', e.target.value);
            setFormModified();
          }}
          value={formik.values.productTitle}
        />
        <CustomInput
          label='Summary / Brief Description'
          placeholder='Brief description'
          name='productSummary'
          onChange={(e: any) => {
            formik.setFieldValue('productSummary', e.target.value);
            setFormModified();
          }}
          value={formik.values.productSummary}
        />
        <label>Category</label>
        <CustomDropdown
          options={loadCategories}
          name='productCategory'
          onChange={(_event, data) => {
            setFormModified();
            formik.setFieldValue('productCategory', data.value);
          }}
          value={formik.values.productCategory}
        />
        <CustomInput
          label='Price $'
          placeholder='Price $'
          name='price'
          onChange={(e: any) => {
            formik.setFieldValue('price', e.target.value);
            setFormModified();
          }}
          value={formik.values.price}
        />
        <CustomInput
          label='Discount % (0-100)'
          placeholder='Discount '
          name='discount'
          onChange={(e: any) => {
            formik.setFieldValue('discount', e.target.value);
            setFormModified();
          }}
          value={formik.values.discount}
        />
        <CustomInputCalendar
          value={formik.values.releaseDate}
          onChange={(e: any) => {
            formik.setFieldValue('releaseDate', e.target.value);
            setFormModified();
          }}
          name='releaseDate'
          label='Release Date'
        />
        <FormCheckbox
          value={formik.values['publish']}
          label='Publish this product on the main page'
          name='publish'
          onChange={(_event, data) => {
            formik.setFieldValue('publish', data.checked);
            setFormModified();
          }}
        />
      </section>
    </section>
  );
};

export default AddEditProductDetails;
