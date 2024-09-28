import PictureGallery from '@/components/Common/PictureGallery/PictureGallery';
import UploadFiles from '@/components/Common/UploadFiles/UploadFiles';
import { Button, Image } from 'semantic-ui-react';
import { Divider } from 'primereact/divider';
import { RefObject, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

interface AddEditProductPictureProps {
  edit?: boolean;
  mainPictureReference: RefObject<FileUpload>;
  filesReference: RefObject<FileUpload>;
}

const AddEditProductPicture = ({ edit, mainPictureReference, filesReference }: AddEditProductPictureProps) => {
  const toast = useRef<Toast>(null);

  const errorOnSelectedFile = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'File error: Please ensure the file size is less than 1MB.',
    });
  };

  useEffect(() => {
    console.log('Ref refresh');
  }, [mainPictureReference.current?.getFiles()]);

  return (
    <section className='add-edit-product-picture'>
      <section className='add-edit-product-picture__picture-box'>
        <section className='add-edit-product-picture__picture-box__container'>
          <Image
            src={
              mainPictureReference.current && mainPictureReference.current?.getFiles()?.length > 0
                ? mainPictureReference.current?.getFiles()[0]?.objectURL
                : '/img_not_available.png'
            }
            alt=''
            size='medium'
          />
        </section>
        <section className='add-edit-product-picture__picture-box__upload-btn'>
          <FileUpload
            ref={mainPictureReference}
            mode='basic'
            name='demo[]'
            url='/api/upload'
            chooseLabel='Upload a Picture'
            accept='image/*'
            maxFileSize={1000000}
            onValidationFail={errorOnSelectedFile}
          />
        </section>
      </section>
      <section className='add-edit-product-picture__picture-gallery-upload'>
        <label>Add multiple pictures for the Product's Gallery</label>
        <UploadFiles filesReference={filesReference} />
      </section>
      {edit && (
        <section className='add-edit-product-picture__picture-gallery-added'>
          <Divider />
          <label>List of Picture Added to the product</label>
          <PictureGallery />
        </section>
      )}
      <Toast ref={toast}></Toast>
    </section>
  );
};

export default AddEditProductPicture;
