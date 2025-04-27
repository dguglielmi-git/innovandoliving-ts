import { GalleryFiles } from '@/api/interface';
import { FileUpload } from 'primereact/fileupload';

export interface AddEditProductPictureProps {
  updateGallery: (option: string, urlImage?: string) => Promise<Boolean>;
  urlMainPicture?: string;
  mainPictureReference: RefObject<FileUpload>;
  filesReference: RefObject<FileUpload>;
  galleryUrl: GalleryFiles[];
  setFormModified: () => void;
}
