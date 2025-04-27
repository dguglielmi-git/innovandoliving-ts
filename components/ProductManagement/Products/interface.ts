import { Product } from '@/types/models/Product';
import { ConfirmDialogProps, ConfirmDialogReturn } from 'primereact/confirmdialog';

export interface ProductsProps {
  products?: Product[] | [];
  updateProductList: () => void;
  search: string;
  updateSearch: (value: string) => void;
  confirmDialog: (props: ConfirmDialogProps) => ConfirmDialogReturn;
  closeDeleteDialog: () => void;
}

export interface RowProductProps {
  id: string;
  productImage: string;
  title: string;
  price: string;
  category: string;
  edit?: () => void;
  remove?: () => void;
}
