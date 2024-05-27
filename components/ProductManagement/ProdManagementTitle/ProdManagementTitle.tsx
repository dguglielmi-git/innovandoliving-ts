import React from 'react';
import { faTag, faGifts } from '@fortawesome/free-solid-svg-icons';
import ProdManagementCard from './ChildComponents/ProdManagementCard';

interface ProductManagementTitleProps {
  totalCategories: string;
  totalProducts: string;
}
const ProductManagementTitle = ({ totalCategories, totalProducts }: ProductManagementTitleProps) => {
  return (
    <div className='prodmanagement-title'>
      <div className='prodmanagement-title__label'>
        <h1 className='poppins-600-regular'>Product Management</h1>
      </div>
      <div className='prodmanagement-title__cards-box'>
        <ProdManagementCard icon={faTag} iconColor='#F68D2C' label='Total Categories' value={totalCategories} />
        <ProdManagementCard icon={faGifts} iconColor='#00A0D3' label='Total Products' value={totalProducts} />
      </div>
    </div>
  );
};

export default ProductManagementTitle;
