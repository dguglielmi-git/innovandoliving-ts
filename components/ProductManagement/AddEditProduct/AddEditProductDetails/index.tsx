import { useMemo } from 'react';
import { FormCheckbox } from 'semantic-ui-react';
import CustomDropdown from '@/components/Common/CustomDropdown';
import CustomInput from '@/components/Common/CustomInput/CustomInput';
import CustomInputCalendar from '@/components/Common/CustomInputCalendar/CustomInputCalendar';
import { AddEditProductDetailsProps } from './interface';
import { useTranslation } from 'react-i18next';

export const AddEditProductDetails = ({ setFormModified, title, formik, categories }: AddEditProductDetailsProps) => {
  const { t } = useTranslation();
  const loadCategories = useMemo(() => {
    return categories?.map((cat) => ({ key: cat._id, text: cat.title, value: cat._id }));
  }, [categories]);

  return (
    <section className='add-edit-product-details'>
      <section className='add-edit-product-details__title'>
        <h3>{title}</h3>
      </section>
      <section className='add-edit-product-details__form'>
        <CustomInput
          label={t('addEditProductTitle')}
          placeholder={t('addEditProductPlaceHolder')}
          name='productTitle'
          onChange={(e: any) => {
            formik.setFieldValue('productTitle', e.target.value);
            setFormModified();
          }}
          value={formik.values.productTitle}
        />
        <CustomInput
          label={t('addEditProductBriefDescriptionLabel')}
          placeholder={t('addEditProductBriefDescriptionPlaceholder')}
          name='productSummary'
          onChange={(e: any) => {
            formik.setFieldValue('productSummary', e.target.value);
            setFormModified();
          }}
          value={formik.values.productSummary}
        />
        <label>{t('addEditProductCategoryLabel')}</label>
        <CustomDropdown
          options={loadCategories}
          name='productCategory'
          onChange={(_event, data) => {
            setFormModified();
            formik.setFieldValue('productCategory', data.value);
          }}
          value={formik.values.productCategory}
        />
        <CustomInput
          label={t('addEditProductPriceLabel')}
          placeholder={t('addEditProductPricePlaceholder')}
          name='price'
          onChange={(e: any) => {
            formik.setFieldValue('price', e.target.value);
            setFormModified();
          }}
          value={formik.values.price}
        />
        <CustomInput
          label={t('addEditProductDiscountLabel')}
          placeholder={t('addEditProductDiscountPlaceholder')}
          name='discount'
          onChange={(e: any) => {
            formik.setFieldValue('discount', e.target.value);
            setFormModified();
          }}
          value={formik.values.discount}
        />
        <CustomInputCalendar
          value={formik.values.releaseDate}
          onChange={(e: any) => {
            formik.setFieldValue('releaseDate', e.target.value);
            setFormModified();
          }}
          name='releaseDate'
          label={t('addEditProductReleaseLabel')}
        />
        <FormCheckbox
          value={formik.values['publish']}
          label={t('addEditProductPublishCheckboxLabel')}
          name='publish'
          onChange={(_event, data) => {
            formik.setFieldValue('publish', data.checked);
            setFormModified();
          }}
        />
      </section>
    </section>
  );
};

export default AddEditProductDetails;
