import { getSortedPlatforms } from '@/api/platform';
import { GalleryFiles, Product, ProductDTO, saveProduct, updateProduct } from '@/api/product';
import { getProductByID, uploadFileToS3 } from '@/api/producto';
import { AddEditProductDetails } from '@/components/ProductManagement/AddEditProduct/AddEditProductDetails';
import AddEditProductHeader from '@/components/ProductManagement/AddEditProduct/AddEditProductHeader';
import AddEditProductPicture from '@/components/ProductManagement/AddEditProduct/AddEditProductPicture/AddEditProductPicture';
import BasicLayout from '@/layouts/BasicLayout';
import { Categories, S3FileUpload } from '@/types/interfaces/common';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FileUpload } from 'primereact/fileupload';
import { useEffect, useRef, useState } from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';
import * as Yup from 'yup';

export default function AddProduct() {
  const mainPictureReference = useRef<FileUpload>(null);
  const filesReference = useRef<FileUpload>(null);
  let singleFile: S3FileUpload | undefined = undefined;
  let multipleFiles: S3FileUpload[] = [];
  let urlMainFile: string = '';
  const [galleryUrls, setGalleryUrls] = useState<GalleryFiles[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<GalleryFiles[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { edit: productId } = router.query;

  const uploadPictures = async (): Promise<void> => {
    if (singleFile === undefined) {
      singleFile = {
        data: {
          file: mainPictureReference.current?.getFiles()[0],
          uploaded: false,
        },
      };
    }

    try {
      filesReference.current?.getFiles().map((file) =>
        multipleFiles.push({
          data: {
            file: file,
            uploaded: false,
          },
        })
      );

      if (singleFile.data.file) {
        if (!singleFile.data.uploaded) {
          const result = await uploadFileToS3(singleFile.data.file);

          if (result.error === '') {
            urlMainFile = result.filename;
            mainPictureReference.current?.clear();
          } else {
            console.error('Error response received from AWS:', result.error);
          }
        }
      }

      const notUploadedFiles: File[] = [];
      const tmpGalleryUrls: GalleryFiles[] = [];

      if (filesReference.current?.getFiles()) {
        filesReference.current?.getFiles().forEach(async (data) => {
          const result = await uploadFileToS3(data);
          if (result.error === '') {
            tmpGalleryUrls.push({
              url: result.filename,
            });
          } else {
            notUploadedFiles.push(data);
            console.error('error recibido:', result.error);
          }
          setUploadedFiles((prev) => [...prev, ...tmpGalleryUrls]);
          filesReference.current?.setFiles(notUploadedFiles);

          const updateProd: ProductDTO = {
            summary: formik.values.productSummary,
            title: formik.values.productTitle,
            price: formik.values.price,
            url: urlMainFile ?? '',
            platform: formik.values.productCategory,
            screenshots: Object.values(galleryUrls ?? [])
              .flatMap((ff) =>
                Object.entries(ff).map((fff) => {
                  return { url: fff[1].replace('blob:', '') };
                })
              )
              .concat(
                Object.values(tmpGalleryUrls ?? []).flatMap((ff) =>
                  Object.entries(ff).map((fff) => {
                    return { url: fff[1].replace('blob:', '') };
                  })
                )
              ),
            discount: formik.values.discount,
            releaseDate: formik.values.releaseDate,
            publish: formik.values.publish,
          };
          const updateResponse = await updateProduct(String(productId), updateProd);
          const { product } = await updateResponse;
          if (product) {
            console.log('updateResponse', product);
            setSelectedProduct(product);
          }
        });
      }
    } catch (error) {
      console.error('error uploading pictures', error);
    }
  };

  const validateForm = Yup.object().shape({
    productCategory: Yup.string().required('Required'),
  });

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
    validationSchema: validateForm,
    validateOnChange: false,

    onSubmit: async () => {
      try {
        if (productId) {
          // Edit the product
          // todo: verify if the form data has changed
          // todo: send the pictures to the database
          // console.log('multipleFiles', filesReference.current?.getFiles());
          // console.log('formik', formik.values);
          // console.log(
          //   'filesssssss',
          //   filesReference.current?.getFiles().map((url: any) => ({ url: url.objectURL }))
          // );
          // await uploadPictures();
          await uploadPictures();
        } else {
          // Create a new Product
          const newProduct: ProductDTO = {
            summary: formik.values.productSummary,
            title: formik.values.productTitle,
            price: formik.values.price,
            url: urlMainFile ?? '',
            platform: formik.values.productCategory,
            screenshots: [],
            discount: formik.values.discount,
            releaseDate: formik.values.releaseDate,
            publish: formik.values.publish,
          };

          const responseNewProduct = await saveProduct(newProduct);
          if (!responseNewProduct.error && responseNewProduct._id) {
            router.push(`/productmanagement/addproduct?edit=${responseNewProduct._id}`);
            toast.success('Product created successfully, you can now add images to the product.');
          } else {
            console.error('Error adding the new product');
            toast.error('Something went wrong trying to save the file, review the data added and try again');
          }
        }
      } catch (error) {
        console.error('Error uploading files:', error);
        toast.error('Something went wrong trying to save the file, review the data added and try again');
      }
    },
  });

  const getCategories = async () => {
    const categs = await getSortedPlatforms();
    setCategories(categs);
  };

  const getUpdatingProduct = async () => {
    const response = await getProductByID(productId);
    if (response) {
      setSelectedProduct(response);
    }
    // formik.setFieldValue('productTitle', response?.title ?? '');
    // formik.setFieldValue('productSummary', response?.summary);
    // formik.setFieldValue('productCategory', response?.platform?._id);
    // formik.setFieldValue('price', response?.price.$numberDecimal);
    // formik.setFieldValue('discount', response?.discount);
    // formik.setFieldValue('releaseDate', response?.published_at);

    // if (response?.screenshots?.length > 0) {
    //   const tmpGallery: GalleryFiles[] = [];
    //   tmpGallery.push(response.screenshots.map((screenshot: { url: string }) => screenshot.url));
    //   setGalleryUrls(tmpGallery);
    //   console.log('getUpdatingProduct() - setGalleryUrls(tmpGallery) value:', tmpGallery);
    // }
  };

  useEffect(() => {
    if (selectedProduct) {
      formik.setFieldValue('productTitle', selectedProduct?.title ?? '');
      formik.setFieldValue('productSummary', selectedProduct?.summary);
      formik.setFieldValue('productCategory', selectedProduct?.platform?._id);
      formik.setFieldValue('price', selectedProduct?.price.$numberDecimal);
      formik.setFieldValue('discount', selectedProduct?.discount);
      formik.setFieldValue('releaseDate', selectedProduct?.releaseDate);

      if (selectedProduct?.screenshots?.length > 0) {
        setGalleryUrls(selectedProduct?.screenshots);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (productId) {
      getUpdatingProduct();
    }
  }, [productId]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      <Form onSubmit={() => formik.handleSubmit()}>
        <section className='product-management'>
          <section className='product-management__header'>
            <AddEditProductHeader title={productId ? 'Edit the product' : 'Add a Product'} />
          </section>
          <section className='product-management__form-area'>
            <AddEditProductDetails title='Product Details' formik={formik} categories={categories} />
            {productId && (
              <AddEditProductPicture
                mainPictureReference={mainPictureReference}
                filesReference={filesReference}
                galleryUrl={galleryUrls}
              />
            )}
          </section>
          <section className='product-management__actions'>
            <Button type='submit' icon='save'>
              <Icon name='save' />
              {productId ? 'Save Changes' : 'Create'}
            </Button>
          </section>
        </section>
      </Form>
    </BasicLayout>
  );
}
