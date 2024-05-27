import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import Category from '../components/ProductManagement/Category/Category';
import Products from '../components/ProductManagement/Products';
import ProductManagementTitle from '../components/ProductManagement/ProdManagementTitle/ProdManagementTitle';
import { getSortedPlatforms } from '../api/platform';
import { Product } from '../types/models/Product';
import { Platform } from '../types/models/Platform';
import { getPublishedProducts } from '@/api/producto';
import { size } from 'lodash';

export default function ProductManagement() {
  const [categories, setCategories] = useState<Platform[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);

  const getData = async () => {
    const catResult = await getSortedPlatforms();
    const prodResult = await getPublishedProducts(50);
    setCategories(catResult);
    setProducts(prodResult);
    console.log(prodResult);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      <ProductManagementTitle totalCategories={size(categories).toString()} totalProducts={size(products).toString()} />
      <Category categories={categories} />
      <Products products={products} />
    </BasicLayout>
  );
}
