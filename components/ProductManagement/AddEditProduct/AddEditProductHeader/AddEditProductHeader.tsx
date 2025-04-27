import { AddProductHeaderProps } from './interface';

const AddEditProductHeader = ({ title }: AddProductHeaderProps) => {
  return (
    <section className='product-management-add-product'>
      <h1 className='poppins-600-regular'>{title}</h1>
    </section>
  );
};

export default AddEditProductHeader;
