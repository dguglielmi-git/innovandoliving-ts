import React, { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import useAuth from '@/hooks/useAuth';
import { numToDollar } from '@/utils/util';
import { SYSTEM_URL } from '@/utils/common';
import { deleteProduct } from '@/api/producto';
import { ProductsProps, RowProductProps } from './interface';

const Products = ({
  products,
  updateProductList,
  search,
  updateSearch,
  confirmDialog,
  closeDeleteDialog,
}: ProductsProps) => {
  const toast = useRef<Toast>(null);
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const router = useRouter();

  const tableHeaders = [
    {
      id: 1,
      header: t('productManagementProductsPictureHeader'),
      colSize: 'mid',
    },
    {
      id: 2,
      header: t('productManagementProductsTitleHeader'),
      colSize: 'large',
    },
    {
      id: 3,
      header: t('productManagementProductsPriceHeader'),
      colSize: 'mid',
    },
    {
      id: 4,
      header: t('productManagementProductsCategoryHeader'),
      colSize: 'mid',
    },
    {
      id: 5,
      header: t('productManagementProductsOptionsHeader'),
      colSize: 'mid',
    },
  ];

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const showToast = (
    severity: 'success' | 'info' | 'warn' | 'error' | undefined,
    summary: React.ReactNode | undefined,
    detail: React.ReactNode | undefined
  ) =>
    toast.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    });

  const acceptRemove = async (id: string) => {
    try {
      const removeProduct = await deleteProduct(id, logout);

      if (removeProduct) {
        showToast('info', t('pmAcceptRemoveProductTitle'), t('pmProductRemovedSuccessfully'));
        updateProductList();
      }
    } catch (error) {
      console.error(error);
      showToast('error', t('pmProductTitleError'), t('pmProductErrorRemoving'));
    } finally {
      closeDeleteDialog();
    }
  };

  const rejectRemove = () => {
    toast.current?.show({
      severity: 'warn',
      summary: t('pmProductTitleRejected'),
      detail: t('pmProductOperationCancel'),
      life: 3000,
    });
    closeDeleteDialog();
  };

  const removeRow = (id: string) => {
    confirmDialog({
      message: t('pmProductRemoveConfirm'),
      header: t('pmProductDeleteConfirmation'),
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => acceptRemove(id),
      reject: rejectRemove,
    });
  };

  const RowProduct = ({ id, productImage, title, price, category, remove }: RowProductProps) => (
    <section className='product-management__products__table__body__product-card'>
      <article className='mid image'>
        <Image src={productImage} alt='Image' width='100' height='70' />
      </article>
      <article className='large title'>
        <p>{title}</p>
      </article>
      <article className='mid'>
        <p>{numToDollar(price)}</p>
      </article>
      <article className='mid'>
        <p>{category}</p>
      </article>
      <article className='mid'>
        <Tooltip target='.edit' content={t('pmProductEditTooltip')} position='bottom' />
        <i
          className='pi pi-pencil edit'
          style={{ fontSize: '1.5rem', color: '#3723c7' }}
          onClick={() => router.push(`/productmanagement/addproduct?edit=${id}`)}
        />
        <Tooltip target='.remove' content={t('pmProductRemoveTooltip')} position='bottom' />
        <i className='pi pi-trash remove' style={{ fontSize: '1.5rem', color: '#910c0c' }} onClick={remove} />
      </article>
    </section>
  );

  const paginatedProducts = useMemo(() => {
    return products?.slice(first, first + rows);
  }, [first, products, rows]);

  return (
    <section className='product-management__products'>
      <article className='product-management__products__title'>
        <h2 className='poppins-600-regular'>{t('pmProductTitle')}</h2>
      </article>

      <section className='product-management__products__search'>
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search'> </InputIcon>
          <InputText
            v-model={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder={t('pmProductSearchPlaceholder')}
          />
        </IconField>
        <Button
          label={t('pmProdManagementProdLabelButtonAdd')}
          severity='info'
          iconPos='left'
          icon='pi pi-plus'
          rounded
          onClick={() => router.push(SYSTEM_URL.ADD_A_PRODUCT)}
        />
      </section>

      <section className='product-management__products__table'>
        <section className='product-management__products__table__header'>
          {tableHeaders.map((header) => (
            <article key={header.id} className={header.colSize}>
              <p>{header.header}</p>
            </article>
          ))}
        </section>
        <section className='product-management__products__table__body'>
          {paginatedProducts?.map((product) => (
            <RowProduct
              key={product._id}
              id={product._id || product.title}
              productImage={product.url}
              title={product.title}
              category={product?.platform?.title}
              price={product.price.$numberDecimal}
              remove={() => removeRow(product._id ?? '')}
            />
          ))}
        </section>
        <section className='product-management__products__table__paginator'>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={products ? products.length : 0}
            rowsPerPageOptions={[10, 50, 100]}
            onPageChange={onPageChange}
          />
        </section>
      </section>
    </section>
  );
};

export default Products;
