import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { PictureGalleryProps } from './interface';
import { carouselResponsiveOptionsList } from '@/utils/common';
import { useTranslation } from 'react-i18next';

export default function PictureGallery({ updateGallery, screenshots }: PictureGalleryProps) {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const responsiveOptions: CarouselResponsiveOption[] = carouselResponsiveOptionsList;

  const confirmDelete = async (urlImage: string) => {
    const responseUpdate = await updateGallery('remove', urlImage);
    if (responseUpdate) {
      toast.current?.show({
        severity: 'info',
        summary: t('pictureGalleryConfirmDeleteSummary'),
        detail: t('pictureGalleryConfirmDeleteDetail'),
        life: 3000,
      });
    }
  };

  const cancelDelete = () => {
    toast.current?.show({
      severity: 'warn',
      summary: t('pictureGalleryConfirmDeleteRejectedSummary'),
      detail: t('pictureGalleryConfirmDeleteRejected'),
      life: 3000,
    });
  };

  const openDeleteDialog = (urlImage: string) => {
    confirmDialog({
      message: t('pictureGalleryConfirmDeleteQuestion'),
      header: t('pictureGalleryConfirmDeleteHeader'),
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => confirmDelete(urlImage),
      reject: cancelDelete,
    });
  };

  const productTemplate = (urlProduct: string) => {
    return (
      <div className='border-1 surface-border border-round m-2 text-center py-5 px-3'>
        <div className='mb-3'>
          <img src={urlProduct} alt={urlProduct} className='w-6 shadow-2' height='250px' />
        </div>
        <div>
          <div className='mt-5 flex flex-wrap gap-2 justify-content-center'>
            <Button
              icon='pi pi-trash'
              label={t('pictureGalleryProductRemoveLabel')}
              className='p-button p-button-rounded'
              type='button'
              onClick={() => openDeleteDialog(urlProduct)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='card'>
      <Toast ref={toast} />
      <ConfirmDialog />
      <Carousel
        value={screenshots.flatMap((u) => u.url)}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
