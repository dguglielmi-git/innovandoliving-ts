import CustomDropdown from '@/components/Common/CustomDropdown';
import CustomInput from '@/components/Common/CustomInput/CustomInput';
import CustomInputCalendar from '@/components/Common/CustomInputCalendar/CustomInputCalendar';
import { FormikValues } from 'formik';
import { FormCheckbox } from 'semantic-ui-react';

interface AddEditProductDetails {
  title: string;
  formik: FormikValues;
}

export const AddEditProductDetails = ({ title, formik }: AddEditProductDetails) => {
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
          onChange={formik.handleChange}
        />
        <CustomInput
          label='Summary / Brief Description'
          placeholder='Brief description'
          name='productSummary'
          onChange={formik.handleChange}
        />
        <label>Category</label>
        <CustomDropdown
          options={[{ key: '1', text: 'test', value: 'test' }]}
          name='productCategory'
          onChange={formik.handleChange}
        />
        <CustomInput label='Price $' placeholder='Price $' name='price' onChange={formik.handleChange} />
        <CustomInput
          label='Discount % (0-100)'
          placeholder='Discount '
          name='productSummary'
          onChange={formik.handleChange}
        />
        <CustomInputCalendar
          value={formik.values['releaseDate']}
          onChange={formik.handlechange}
          name='releaseDate'
          label='Release Date'
        />
        <FormCheckbox
          value={formik.values['publish']}
          label='Publish this product on the main page'
          name='publish'
          onChange={(_e, event) => formik.setFieldValue('publish', event.checked)}
        />
      </section>
    </section>
  );
};

export default AddEditProductDetails;
