import PictureGallery from '@/components/Common/PictureGallery/PictureGallery';
import UploadFiles from '@/components/Common/UploadFiles/UploadFiles';
import { Button, Image } from 'semantic-ui-react';
import { Divider } from 'primereact/divider';

interface AddEditProductPictureProps {
  edit?: boolean;
}

const AddEditProductPicture = ({ edit }: AddEditProductPictureProps) => {
  return (
    <section className='add-edit-product-picture'>
      <section className='add-edit-product-picture__picture-box'>
        <section className='add-edit-product-picture__picture-box__container'>
          <Image src='/img_not_available.png' size='medium' />
        </section>
        <section className='add-edit-product-picture__picture-box__upload-btn'>
          <Button>Upload</Button>
        </section>
      </section>
      <section className='add-edit-product-picture__picture-gallery-upload'>
        <label>Add multiple pictures for the Product's Gallery</label>
        <UploadFiles />
      </section>
      {edit && (
        <section className='add-edit-product-picture__picture-gallery-added'>
          <Divider />
          <label>List of Picture Added to the product</label>
          <PictureGallery />
        </section>
      )}
    </section>
  );
};

export default AddEditProductPicture;
