import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import Category from '../components/ProductManagement/Category/Category'
import Products from '../components/ProductManagement/Products'
import ProductManagementTitle from '../components/ProductManagement/ProdManagementTitle/ProdManagementTitle'

export default function ProductManagement () {
  return (
    <BasicLayout className='queries' style={{ backgroundColor: '#F6F6F6' }}>
      <ProductManagementTitle />
      <Category />
      <Products />
    </BasicLayout>
  )
}
