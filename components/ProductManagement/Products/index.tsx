import React, { useState } from 'react';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Tooltip } from 'primereact/tooltip';
import { Product } from '@/types/models/Product';
import { numToDollar } from '@/utils/util';

const tableHeaders = [
  {
    id: 1,
    header: 'Picture',
    colSize: 'mid',
  },
  {
    id: 2,
    header: 'Title',
    colSize: 'large',
  },
  {
    id: 3,
    header: 'Price',
    colSize: 'mid',
  },
  {
    id: 4,
    header: 'Category',
    colSize: 'mid',
  },
  {
    id: 5,
    header: 'Options',
    colSize: 'mid',
  },
];
interface ProductsProps {
  products?: Product[] | [];
}

const Products = ({ products }: ProductsProps) => {
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  interface RowProductProps {
    id: string;
    productImage: string;
    title: string;
    price: string;
    category: string;
    edit?: () => void;
    remove?: () => void;
  }
  const RowProduct = ({ id, productImage, title, price, category }: RowProductProps) => (
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
        <Tooltip target='.edit' content='Edit' position='bottom' />
        <i className='pi pi-pencil edit' style={{ fontSize: '1.5rem', color: '#3723c7' }} />
        <Tooltip target='.remove' content='Remove' position='bottom' />
        <i className='pi pi-trash remove' style={{ fontSize: '1.5rem', color: '#910c0c' }} />
      </article>
    </section>
  );

  return (
    <section className='product-management__products'>
      <article className='product-management__products__title'>
        <h2 className='poppins-600-regular'>Products</h2>
      </article>
      <section className='product-management__products__search'>
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search'> </InputIcon>
          <InputText v-model='value1' placeholder='Search' />
        </IconField>
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
          {products?.map((product) => (
            <RowProduct
              key={product._id}
              id={product._id || product.title}
              productImage={product.url}
              title={product.title}
              category={product.platform.title}
              price={product.price.$numberDecimal}
            />
          ))}
        </section>
        <section className='product-management__products__table__paginator'>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={120}
            rowsPerPageOptions={[10, 50, 100]}
            onPageChange={onPageChange}
          />
        </section>
      </section>
    </section>
  );
};

export default Products;
