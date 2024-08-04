import React, { useCallback, useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import Category from '../components/ProductManagement/Category/Category';
import Products from '../components/ProductManagement/Products';
import ProductManagementTitle from '../components/ProductManagement/ProdManagementTitle/ProdManagementTitle';
import { getSortedPlatforms } from '../api/platform';
import { Product } from '../types/models/Product';
import { Platform } from '../types/models/Platform';
import { getAllProducts } from '@/api/producto';
import { size } from 'lodash';
import useAuth from '@/hooks/useAuth';
import BasicLoading from '@/components/BasicLoading/BasicLoading';

export default function ProductManagement() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Platform[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await updateCategoryList();
      await updateProductList();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategoryList = async () => {
    const catResult = await getSortedPlatforms();
    setCategories(catResult);
  };

  const updateProductList = async () => {
    const prodResult = await getAllProducts(logout);
    setProducts(prodResult);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      {loading ? (
        <BasicLoading />
      ) : (
        <>
          <ProductManagementTitle
            totalCategories={size(categories).toString()}
            totalProducts={size(products).toString()}
          />
          <Category categories={categories} updateCategories={updateCategoryList} />
          <Products products={products} updateProductList={updateProductList}/>
        </>
      )}
    </BasicLayout>
  );
}
