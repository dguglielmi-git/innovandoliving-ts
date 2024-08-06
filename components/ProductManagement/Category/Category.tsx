import { Divider } from 'primereact/divider';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialogProps, ConfirmDialogReturn } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Platform } from '@/types/models/Platform';
import { createCategory, deletePlatform } from '@/api/platform';
import UpdateModal from '@/components/Modal/UpdateModal/UpdateModal';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

interface RowCategoryProps {
  id: string;
  label: string;
  handleRemove: () => void;
}

const RowCategory = ({ id, label, handleRemove }: RowCategoryProps) => {
  const {t} = useTranslation();
  return (
    <section className='category-management__mainbox__list__rows-element'>
      <section className='category-management__mainbox__list__rows-element__label'>
        <p>{label}</p>
      </section>
      <Divider layout='vertical' />
      <section className='category-management__mainbox__list__rows-element__actions'>
        <Tooltip target='.remove' content={t('pmCategoryRemoveTooltip')} position='bottom' />
        <i className='pi pi-trash remove' style={{ fontSize: '1.5rem', color: '#910c0c' }} onClick={handleRemove} />
      </section>
    </section>
  );
};
interface CategoryProps {
  categories?: Platform[] | [];
  updateCategories: () => void;
  confirmDialog: (props: ConfirmDialogProps) => ConfirmDialogReturn;
  closeDeleteDialog: () => void;
}

const Category = ({ categories, updateCategories, confirmDialog, closeDeleteDialog }: CategoryProps) => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');

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
      const removeCategory = await deletePlatform(id, logout);

      if (removeCategory) {
        showToast('info', t('pmCategoryTitleAddedSuccessfully'), t('pmCategoryRemovedSuccessfully'));
        updateCategories();
      }
    } catch (error) {
      console.error(error);
      showToast('error', t('pmCategoryTitleAddError'), t('pmErrorRemovingCategory'));
    } finally {
      closeDeleteDialog();
    }
  };

  const rejectRemove = () => {
    toast.current?.show({ severity: 'warn', summary: t('pmCategoryTitleAddRejected'), detail: t('pmOperationCancelCategory'), life: 3000 });
    closeDeleteDialog();
  };

  const removeRow = (id: string) => {
    confirmDialog({
      message: t('pmRemoveCategoryDialog'),
      header: t('pmRemoveCategoryDialogTitle'),
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => acceptRemove(id),
      reject: rejectRemove,
    });
  };

  const confirmAddCategory = async () => {
    const newCategoryToSave = {
      title: newCategory,
      position: 1,
    };
    try {
      const resultAddedCategory = await createCategory(newCategoryToSave, logout);
      if (resultAddedCategory) {
        showToast('info', t('pmCategoryTitleAddedSuccessfully'), t('pmCategoryAddedSuccessfully'));
        updateCategories();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalAddCategoryVisible(false);
    }
  };

  const openAddNewCategoryModal = () => {
    setNewCategory('');
    setIsModalAddCategoryVisible(true);
  };

  return (
    <div className='category-management'>
      <Toast ref={toast} />
      <div className='category-management__mainbox'>
        <div className='category-management__mainbox__title'>
          <h2 className='poppins-600-regular'>{t('pmCategoryTitle')}</h2>
        </div>
        <div className='category-management__mainbox__list'>
          <div className='category-management__mainbox__list__headers'>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>{t('pmCategoryLabelTitle')}</h2>
            </div>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>{t('pmCategoryLabelOptions')}</h2>
            </div>
          </div>
          <div className='category-management__mainbox__list__rows'>
            {categories?.map((category) => (
              <RowCategory
                key={category._id}
                id={category._id}
                label={category.title}
                handleRemove={() => removeRow(category._id)}
              />
            ))}
          </div>
        </div>
        <div className='category-management__mainbox__options'>
          <Button
            label={t('pmCategoryLabelButtonAdd')}
            severity='info'
            iconPos='left'
            icon='pi pi-plus'
            rounded
            onClick={() => openAddNewCategoryModal()}
          />
        </div>
      </div>
      <UpdateModal
        size='tiny'
        open={isModalAddCategoryVisible}
        dimmer='blurring'
        closeModal={() => setIsModalAddCategoryVisible(false)}
        handleCancel={() => setIsModalAddCategoryVisible(false)}
        handleUpdate={confirmAddCategory}
        header={t('pmCategoryUpdateModalTitle')}
        cancelBtnLabel={t('pmCategoryUpdateModalCancelButton')}
        updateBtnLabel={t('pmCategoryLabelButtonAdd')}
      >
        <section className='category-management__add-category'>
          <span>{t('pmAddCategoryModalMsg')}</span>
          <IconField iconPosition='left'>
            <InputIcon className='pi pi-search'> </InputIcon>
            <InputText
              v-model={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={t('pmAddCategoryModalPlaceholder')}
            />
          </IconField>
        </section>
      </UpdateModal>
    </div>
  );
};
export default Category;
