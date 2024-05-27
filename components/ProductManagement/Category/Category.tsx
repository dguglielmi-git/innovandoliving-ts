import { Divider } from 'primereact/divider';
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import { Platform } from '@/types/models/Platform';

interface RowCategoryProps {
  id: string;
  label: string;
  handleEdit: () => void;
  handleRemove: () => void;
}

const RowCategory = ({ id, label, handleEdit, handleRemove }: RowCategoryProps) => {
  return (
    <section className='category-management__mainbox__list__rows-element'>
      <section className='category-management__mainbox__list__rows-element__label'>
        <p>{label}</p>
      </section>
      <Divider layout='vertical' />
      <section className='category-management__mainbox__list__rows-element__actions'>
        <Tooltip target='.edit' content='Edit' position='bottom' />
        <i className='pi pi-pencil edit' style={{ fontSize: '1.5rem', color: '#3723c7' }} onClick={handleEdit} />
        <Tooltip target='.remove' content='Remove' position='bottom' />
        <i className='pi pi-trash remove' style={{ fontSize: '1.5rem', color: '#910c0c' }} onClick={handleRemove} />
      </section>
    </section>
  );
};
interface CategoryProps {
  categories?: Platform[] | [];
}

const Category = ({ categories }: CategoryProps) => {
  const toast = useRef<Toast>(null);
  const [removeDialogVisible, setRemoveDialogVisible] = useState<boolean>(false);

  const acceptRemove = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'The selected record has been removed.',
      life: 3000,
    });
    setRemoveDialogVisible(false);
  };

  const rejectRemove = () => {
    toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'Operation Canceled.', life: 3000 });
    setRemoveDialogVisible(false);
  };
  const editRow = (id: string) => {
    console.log('edit', id);
  };

  const removeRow = (id: string) => {
    console.log('remove', id);
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: acceptRemove,
      reject: rejectRemove,
    });
  };

  return (
    <div className='category-management'>
      <Toast ref={toast} />
      <ConfirmDialog visible={removeDialogVisible} />
      <div className='category-management__mainbox'>
        <div className='category-management__mainbox__title'>
          <h2 className='poppins-600-regular'>Categories</h2>
        </div>
        <div className='category-management__mainbox__list'>
          <div className='category-management__mainbox__list__headers'>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>Category Title</h2>
            </div>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>Options</h2>
            </div>
          </div>
          <div className='category-management__mainbox__list__rows'>
            {categories?.map((category) => (
              <RowCategory
                key={category._id}
                id={category._id}
                label={category.title}
                handleEdit={() => editRow(category._id)}
                handleRemove={() => removeRow(category._id)}
              />
            ))}
          </div>
        </div>
        <div className='category-management__mainbox__options'>
          <Button label='Add' severity='info' iconPos='left' icon='pi pi-plus' rounded />
        </div>
      </div>
    </div>
  );
};
export default Category;
