import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { ProductService } from './service/ProductService';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function PictureGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const toast = useRef<Toast>(null);

  const confirmDelete = () => {
    toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const cancelDelete = () => {
    toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  const openDeleteDialog = () => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: confirmDelete,
      reject: cancelDelete,
    });
  };

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
  }, []);

  const productTemplate = (product: Product) => {
    return (
      <div className='border-1 surface-border border-round m-2 text-center py-5 px-3'>
        <div className='mb-3'>
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
            className='w-6 shadow-2'
          />
        </div>
        <div>
          <div className='mt-5 flex flex-wrap gap-2 justify-content-center'>
            <Button icon='pi pi-trash' className='p-button p-button-rounded' onClick={openDeleteDialog}>
              Remove
            </Button>
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
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
