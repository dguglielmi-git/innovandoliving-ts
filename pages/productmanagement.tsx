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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ProductManagement() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Platform[] | []>([]);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [paginatedProducts, setPaginatedProducts] = useState<Product[] | []>([]);
  const [removeDialogVisible, setRemoveDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    if (searchProduct !== '') {
      setPaginatedProducts(
        products.filter((product) => product.title.toLowerCase().includes(searchProduct.toLowerCase()))
      );
    } else {
      setPaginatedProducts(products);
    }
  }, [products, searchProduct]);

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

  const updateSearchProduct = (value: string) => setSearchProduct(value);

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

  const closeDeleteDialog = () => setRemoveDialogVisible(false);

  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      {loading ? (
        <BasicLoading />
      ) : (
        <>
          <ConfirmDialog visible={removeDialogVisible} />
          <ProductManagementTitle
            totalCategories={size(categories).toString()}
            totalProducts={size(products).toString()}
          />
          <Category
            categories={categories}
            updateCategories={updateCategoryList}
            confirmDialog={confirmDialog}
            closeDeleteDialog={closeDeleteDialog}
          />
          <Products
            products={paginatedProducts}
            updateProductList={updateProductList}
            search={searchProduct}
            updateSearch={updateSearchProduct}
            confirmDialog={confirmDialog}
            closeDeleteDialog={closeDeleteDialog}
          />
        </>
      )}
    </BasicLayout>
  );
}
