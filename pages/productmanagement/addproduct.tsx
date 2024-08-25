import { AddEditProductDetails } from '@/components/ProductManagement/AddEditProduct/AddEditProductDetails';
import AddEditProductHeader from '@/components/ProductManagement/AddEditProduct/AddEditProductHeader';
import AddEditProductPicture from '@/components/ProductManagement/AddEditProduct/AddEditProductPicture/AddEditProductPicture';
import BasicLayout from '@/layouts/BasicLayout';
import { useFormik } from 'formik';
import { Icon, Button, Form } from 'semantic-ui-react';

export default function AddProduct() {
  const formik = useFormik({
    initialValues: {
      productTitle: '',
      productSummary: '',
      productCategory: '',
      releaseDate: '',
      price: 0,
      discount: 0,
      publish: false,
    },
    validateOnChange: false,
    onSubmit: async (formData) => {
      console.log('sending formData', formData);
    },
  });

  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      <Form onSubmit={formik.handleSubmit}>
        <section className='product-management'>
          <section className='product-management__header'>
            <AddEditProductHeader title='Add a Product' />
          </section>
          <section className='product-management__form-area'>
            <AddEditProductDetails title='Product Details' formik={formik} />
            <AddEditProductPicture edit />
          </section>
          <section className='product-management__actions'>
            <Button type='submit' icon='save'>
              <Icon name='save' />
              Save Changes
            </Button>
          </section>
        </section>
      </Form>
    </BasicLayout>
  );
}
