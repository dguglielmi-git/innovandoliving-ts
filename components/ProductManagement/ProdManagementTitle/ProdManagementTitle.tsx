import React from 'react';
import { faTag, faGifts } from '@fortawesome/free-solid-svg-icons';
import ProdManagementCard from './ChildComponents/ProdManagementCard';
import { useTranslation } from 'react-i18next';

interface ProductManagementTitleProps {
  totalCategories: string;
  totalProducts: string;
}
const ProductManagementTitle = ({ totalCategories, totalProducts }: ProductManagementTitleProps) => {
  const { t } = useTranslation();
  return (
    <div className='prodmanagement-title'>
      <div className='prodmanagement-title__label'>
        <h1 className='poppins-600-regular'>{t('pmProdManagementTitle')}</h1>
      </div>
      <div className='prodmanagement-title__cards-box'>
        <ProdManagementCard
          icon={faTag}
          iconColor='#F68D2C'
          label={t('pmProdManagementTotalCategories')}
          value={totalCategories}
        />
        <ProdManagementCard
          icon={faGifts}
          iconColor='#00A0D3'
          label={t('pmProdManagementtotalProducts')}
          value={totalProducts}
        />
      </div>
    </div>
  );
};

export default ProductManagementTitle;
