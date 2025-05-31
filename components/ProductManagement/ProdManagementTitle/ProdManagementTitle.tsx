import React from 'react';
import { faTag, faGifts, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import ProdManagementCard from './ChildComponents/ProdManagementCard';
import { useTranslation } from 'react-i18next';

interface ProductManagementTitleProps {
  totalCategories: string;
  totalProducts: string;
}
interface ProductManagementConfigEntity {
  id: number | string;
  icon: IconDefinition;
  iconColor: string;
  label: string;
  value: string;
}

const ProductManagementTitle = ({ totalCategories, totalProducts }: ProductManagementTitleProps) => {
  const { t } = useTranslation();

  const productManagementConfiguration: ProductManagementConfigEntity[] = [
    {
      id: 1,
      icon: faTag,
      iconColor: '#F68D2C',
      label: t('pmProdManagementTotalCategories'),
      value: totalCategories,
    },
    {
      id: 2,
      icon: faGifts,
      iconColor: '#00A0D3',
      label: t('pmProdManagementtotalProducts'),
      value: totalProducts,
    },
  ];

  return (
    <div className='prodmanagement-title'>
      <div className='prodmanagement-title__label'>
        <h1 className='poppins-600-regular'>{t('pmProdManagementTitle')}</h1>
      </div>
      <div className='prodmanagement-title__cards-box'>
        {productManagementConfiguration.map((config) => (
          <ProdManagementCard
            key={config.id}
            icon={config.icon}
            iconColor={config.iconColor}
            label={config.label}
            value={config.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductManagementTitle;
