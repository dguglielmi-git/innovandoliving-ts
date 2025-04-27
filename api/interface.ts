
export interface GalleryFiles {
  url: string;
}

export interface Product {
  title: string;
  summary: string;
  url: string;
  platform: { _id: string };
  releaseDate: string;
  screenshots: GalleryFiles[];
  price: {
    $numberDecimal: number;
  };
  discount: number;
  publish: boolean;
}

export interface ProductDTO {
  title: string;
  summary: string;
  url: string;
  platform: string;
  releaseDate: string;
  screenshots: GalleryFiles[];
  price: number;
  discount: number;
  publish: boolean;
}