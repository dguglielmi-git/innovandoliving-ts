import { saveProduct, uploadFileToS3 } from '@/api/producto';
import { AddEditProductDetails } from '@/components/ProductManagement/AddEditProduct/AddEditProductDetails';
import AddEditProductHeader from '@/components/ProductManagement/AddEditProduct/AddEditProductHeader';
import AddEditProductPicture from '@/components/ProductManagement/AddEditProduct/AddEditProductPicture/AddEditProductPicture';
import BasicLayout from '@/layouts/BasicLayout';
import { useFormik } from 'formik';
import { FileUpload } from 'primereact/fileupload';
import { useRef } from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';

export default function AddProduct() {
  const mainPictureReference = useRef<FileUpload>(null);
  const filesReference = useRef<FileUpload>(null);
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
    onSubmit: async () => {
      let urlMainFile: string = '';
      let galleryUrls: string[] = [];

      const mainFile = mainPictureReference.current?.getFiles()[0];
      const galleryFiles = filesReference.current?.getFiles();
      console.log('filesReference', filesReference.current);
      console.log('mainPictureReference.current', mainPictureReference.current);

      if (mainFile) {
        const result = await uploadFileToS3(mainFile);

        if (result.error === '') {
          console.log('aws response', result);
          urlMainFile = result.filename;
        } else {
          console.log('error recibido:', result.error);
        }
      }

      if (galleryFiles) {
        galleryFiles.forEach(async (file) => {
          const result = await uploadFileToS3(file);
          if (result.error === '') {
            console.log('aws response', result);
            galleryUrls.push(result.filename);
          } else {
            console.log('error recibido:', result.error);
          }
        });
      }

      console.log('filesReference', filesReference.current?.getFiles());
      console.log('urlMainFile', urlMainFile);
      console.log('galleryUrls', galleryUrls);

      // todo: archivo svg provoca error al subirlo
      // todo: los archivos que se hayan subido a S3 deben ser seteados como ok
      // todo: los archivos que provoquen error deben mantenerse en la lista para reintentar

      try {
        // const newProduct = {
        //   summary: formik.values.productSummary,
        //   title: formik.values.productTitle,
        //   price: formik.values.price,
        //   url: urlMainFile ?? '',
        //   platform: '60b07d2f7e16e29cc034ec75',
        //   screenshots: galleryUrls,
        //   discount: formik.values.discount,
        //   releaseDate: formik.values.releaseDate,
        //   publish: formik.values.publish,
        // };
        // const responseNewProduct = await saveProduct(newProduct);
        // if (responseNewProduct) {
        //   console.log('Product created')
        // }
        // else  {
        //   console.log('Error adding the new product')
        // }
      } catch (error) {
        console.error('Error uploading files:', error);
      }
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
            <AddEditProductPicture mainPictureReference={mainPictureReference} filesReference={filesReference} />
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
