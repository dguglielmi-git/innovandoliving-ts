import PictureGallery from '@/components/Common/PictureGallery/PictureGallery';
import UploadFiles from '@/components/Common/UploadFiles/UploadFiles';
import { Icon, Image } from 'semantic-ui-react';
import { Divider } from 'primereact/divider';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { GalleryFiles } from '@/api/product';
import { Tooltip } from 'primereact/tooltip';

interface AddEditProductPictureProps {
  updateGallery: (option: string, urlImage?: string) => Promise<Boolean>;
  urlMainPicture?: string;
  mainPictureReference: RefObject<FileUpload>;
  filesReference: RefObject<FileUpload>;
  galleryUrl: GalleryFiles[];
  setFormModified: () => void;
}

const AddEditProductPicture = ({
  updateGallery,
  urlMainPicture,
  mainPictureReference,
  filesReference,
  galleryUrl,
  setFormModified,
}: AddEditProductPictureProps) => {
  const toast = useRef<Toast>(null);
  const [mainPicture, setMainPicture] = useState<string | undefined>(undefined);

  const errorOnSelectedFile = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'File error: Please ensure the file size is less than 1MB.',
    });
  };
  const isMainPictureAvailable = (): boolean =>
    !!(mainPictureReference.current && mainPictureReference.current?.getFiles()?.length > 0);

  useEffect(() => {
    if (isMainPictureAvailable()) {
      setMainPicture(mainPictureReference.current?.getFiles()[0]?.objectURL);
    } else {
      if (urlMainPicture && urlMainPicture.trim() !== '') {
        setMainPicture(urlMainPicture);
      } else {
        setMainPicture('/img_not_available.png');
      }
    }
  }, [mainPictureReference, urlMainPicture]);

  const onFileSelected = (event: FileUploadSelectEvent) => {
    setMainPicture(event.files[0].objectURL);
    setFormModified();
  };

  const onClearFile = () => {
    setMainPicture('/img_not_available.png');
    setFormModified();
  };

  const removeMainPicture = async () => {
    try {
      mainPictureReference.current?.clear();
      const resultUpdate = await updateGallery('clearMainPicture');
      if (resultUpdate) {
        toast.current?.show({
          severity: 'info',
          summary: 'Successfully Removed',
          detail: 'Main picture was removed',
          life: 3000,
        });
        setFormModified();
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error trying to remove the main picture',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='add-edit-product-picture'>
      <section className='add-edit-product-picture__picture-box'>
        <section className='add-edit-product-picture__picture-box__container'>
          <Image src={mainPicture} alt='' size='medium' />
          <Tooltip target='.removing' content='Remove main picture' position='bottom' />
          <article className='add-edit-product-picture__picture-box__container-remove-pic'>
            <Icon className='removing' color='red' name='x' size='large' onClick={() => removeMainPicture()} />
          </article>
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
        <UploadFiles filesReference={filesReference} setFormModified={setFormModified} />
      </section>

      <section className='add-edit-product-picture__picture-gallery-added'>
        <Divider />
        {galleryUrl && galleryUrl.length > 0 ? (
          <>
            <label>Pictures Added to the product</label>
            <PictureGallery screenshots={galleryUrl} updateGallery={updateGallery} />
          </>
        ) : (
          <article className='add-edit-product-picture__picture-gallery-empty'>
            <label>Image Gallery is empty for this product</label>
          </article>
        )}
      </section>

      <Toast ref={toast}></Toast>
    </section>
  );
};

export default AddEditProductPicture;
