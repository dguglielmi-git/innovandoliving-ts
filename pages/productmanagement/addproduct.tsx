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
  const [urlMainFile, setUrlMainFile] = useState<string | undefined>(undefined);
  const [galleryUrls, setGalleryUrls] = useState<GalleryFiles[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formModified, setFormModified] = useState<Boolean>(false);
  const router = useRouter();
  const { edit: productId } = router.query;

  const getProductStructure = (): ProductDTO => ({
    summary: formik.values.productSummary,
    title: formik.values.productTitle,
    price: formik.values.price,
    url: urlMainFile ?? '',
    platform: formik.values.productCategory,
    screenshots: galleryUrls,
    discount: formik.values.discount,
    releaseDate: formik.values.releaseDate,
    publish: formik.values.publish,
  });

  const performUpdate = async (updateProd: ProductDTO): Promise<boolean> => {
    const updateResponse = await updateProduct(String(productId), updateProd);
    if (updateResponse) {
      getUpdatingProduct();
      return true;
    }
    return false;
  };

  const uploadMainPicture = async (): Promise<string> => {
    try {
      if (singleFile === undefined) {
        singleFile = {
          data: {
            file: mainPictureReference.current?.getFiles()[0],
            uploaded: false,
          },
        };
      }
      let tmpSingleFile: string = '';

      if (singleFile.data.file) {
        if (!singleFile.data.uploaded) {
          const result = await uploadFileToS3(singleFile.data.file);

          if (result.error === '') {
            const awsUploadedFileName = await result.filename;
            tmpSingleFile = awsUploadedFileName;

            mainPictureReference.current?.clear();
          } else {
            console.error('Error response received from AWS:', result.error);
          }
        }
      }
      return tmpSingleFile;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const uploadGalleryMultipleFiles = async (): Promise<GalleryFiles[]> => {
    try {
      const notUploadedFiles: File[] = [];
      const tmpGalleryUrls: GalleryFiles[] = [];

      const files = filesReference.current?.getFiles() || [];
      for (const file of files) {
        const result = await uploadFileToS3(file);
        if (result.error === '') {
          tmpGalleryUrls.push({ url: result.filename });
        } else {
          notUploadedFiles.push(file);
          console.error('error received:', result.error);
        }
      }

      filesReference.current?.setFiles(notUploadedFiles);

      const filteredScreenshots: GalleryFiles[] = Object.values(galleryUrls ?? [])
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
        )
        .filter((screenshot) => screenshot.url.startsWith('https'));
      return filteredScreenshots;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const uploadPictures = async (): Promise<boolean> => {
    try {
      const tmpSingleFile: string = await uploadMainPicture();

      const filteredScreenshots: GalleryFiles[] = await uploadGalleryMultipleFiles();

      const updateProd: ProductDTO = {
        ...getProductStructure(),
        url: (tmpSingleFile !== '' ? tmpSingleFile : urlMainFile) ?? '',
        screenshots: filteredScreenshots,
      };

      return await performUpdate(updateProd);
    } catch (error) {
      console.error('error uploading pictures', error);
      return false;
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
      url: undefined,
    },
    validationSchema: validateForm,
    validateOnChange: false,

    onSubmit: async () => {
      try {
        setLoading(true);
        if (editionMode) {
          const updateResultOperation = await uploadPictures();
          if (updateResultOperation) {
            getUpdatingProduct();
            toast.success('Product was successfully updated');
          }
          setLoading(false);
        } else {
          const newProduct: ProductDTO = {
            ...getProductStructure(),
            screenshots: [],
          };

          const responseNewProduct = await saveProduct(newProduct);
          if (!responseNewProduct.error && responseNewProduct._id) {
            router.push(`/productmanagement/addproduct?edit=${responseNewProduct._id}`);
            toast.success('Product created successfully, you can now add images to the product.');
          } else {
            console.error('Error adding the new product');
            toast.error('Something went wrong trying to save the file, review the data added and try again');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error uploading files:', error);
        toast.error('Something went wrong trying to save the file, review the data added and try again');
        setLoading(false);
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

    if (response?.screenshots?.length > 0) {
      const tmpGallery: GalleryFiles[] = [];
      tmpGallery.push(response.screenshots.map((screenshot: { url: string }) => screenshot.url));
      setGalleryUrls(tmpGallery);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      formik.setFieldValue('productTitle', selectedProduct?.title ?? '');
      formik.setFieldValue('productSummary', selectedProduct?.summary);
      formik.setFieldValue('productCategory', selectedProduct?.platform?._id);
      formik.setFieldValue('price', selectedProduct?.price.$numberDecimal);
      formik.setFieldValue('discount', selectedProduct?.discount);
      formik.setFieldValue('releaseDate', selectedProduct?.releaseDate);
      formik.setFieldValue('url', selectedProduct?.url);

      if (selectedProduct?.url.trim() !== '') {
        setUrlMainFile(selectedProduct.url);
      }

      if (selectedProduct?.screenshots?.length > 0) {
        setGalleryUrls(selectedProduct?.screenshots);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (productId) {
      getUpdatingProduct();
      setEditionMode(true);
    }
  }, [productId]);

  useEffect(() => {
    getCategories();
  }, []);

  const updateGallery = async (option: string, urlImage?: string): Promise<Boolean> => {
    if (option === 'remove') {
      try {
        setGalleryUrls(galleryUrls.filter((picture) => picture.url !== urlImage));
        setFormModified(true);
        return true;
      } catch (error) {
        console.error('Error when trying to remove a picture from the gallery: ', error);
        return false;
      }
    } else if (option === 'clearMainPicture') {
      try {
        setUrlMainFile(undefined);
        setFormModified(true);
        return true;
      } catch (error) {
        console.error('Error when trying to remove a picture from the gallery: ', error);
        return false;
      }
    }
    return false;
  };

  const formHasBeenModified = () => setFormModified(true);
  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      <Form onSubmit={formik.handleSubmit}>
        <section className='product-management'>
          <section className='product-management__header'>
            <AddEditProductHeader title={editionMode ? 'Edit the product' : 'Add a Product'} />
          </section>
          <section className='product-management__form-area'>
            <AddEditProductDetails title='Product Details' formik={formik} categories={categories} />
            {editionMode && (
              <AddEditProductPicture
                updateGallery={updateGallery}
                urlMainPicture={urlMainFile}
                mainPictureReference={mainPictureReference}
                filesReference={filesReference}
                galleryUrl={galleryUrls}
                setFormModified={formHasBeenModified}
              />
            )}
          </section>
          <section className='product-management__actions'>
            <Button type='submit' icon='save' loading={loading} disabled={!formModified}>
              <Icon name='save' />
              {editionMode ? 'Save Changes' : 'Create'}
            </Button>
          </section>
        </section>
      </Form>
    </BasicLayout>
  );
}
