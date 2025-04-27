import { GalleryFiles } from '@/api/interface';

export interface PictureGalleryProps {
  updateGallery: (option: string, urlImage?: string) => Promise<Boolean>;
  screenshots: GalleryFiles[];
}
