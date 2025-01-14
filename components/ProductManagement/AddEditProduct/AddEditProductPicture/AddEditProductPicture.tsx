import PictureGallery from '@/components/Common/PictureGallery/PictureGallery';
import UploadFiles from '@/components/Common/UploadFiles/UploadFiles';
import { Image } from 'semantic-ui-react';
import { Divider } from 'primereact/divider';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { GalleryFiles } from '@/api/product';

interface AddEditProductPictureProps {
  mainPictureReference: RefObject<FileUpload>;
  filesReference: RefObject<FileUpload>;
  galleryUrl: GalleryFiles[];
}

const AddEditProductPicture = ({ mainPictureReference, filesReference, galleryUrl }: AddEditProductPictureProps) => {
  const toast = useRef<Toast>(null);
  const [mainPicture, setMainPicture] = useState<string>('');

  console.log(galleryUrl)
  const errorOnSelectedFile = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'File error: Please ensure the file size is less than 1MB.',
    });
  };

  useEffect(() => {
    if (mainPictureReference.current && mainPictureReference.current?.getFiles()?.length > 0) {
      setMainPicture(mainPictureReference.current?.getFiles()[0]?.objectURL);
    } else {
      setMainPicture('/img_not_available.png');
    }

    if (mainPictureReference.current?.onFileSelect) {
      console.log('file selected');
    }
  }, [mainPictureReference]);

  const onFileSelected = (event: FileUploadSelectEvent) => {
    setMainPicture(event.files[0].objectURL);
  };

  const onClearFile = () => {
    setMainPicture('/img_not_available.png');
  };

  return (
    <section className='add-edit-product-picture'>
      <section className='add-edit-product-picture__picture-box'>
        <section className='add-edit-product-picture__picture-box__container'>
          <Image src={mainPicture} alt='' size='medium' />
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
            onSelect={onFileSelected}
            onClear={onClearFile}
          />
        </section>
      </section>
      <section className='add-edit-product-picture__picture-gallery-upload'>
        <label>Add multiple pictures for the Product's Gallery</label>
        <UploadFiles filesReference={filesReference} />
      </section>

      <section className='add-edit-product-picture__picture-gallery-added'>
        <Divider />
        <label>Pictures Added to the product</label>
        <PictureGallery screenshots={galleryUrl} />
      </section>

      <Toast ref={toast}></Toast>
    </section>
  );
};

export default AddEditProductPicture;
