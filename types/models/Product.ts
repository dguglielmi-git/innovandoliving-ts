import { Platform } from './Platform';

export interface Product {
  _id?: string;
  title: string;
  summary: string;
  platform: Platform;
  releaseDate: string;
  updateAd: string;
  created_by: string;
  poster: string;
  updated_by: string;
  url: string;
  price: {
    $numberDecimal: string;
  };
  published_at: string;
  createAt: string;
  publish: boolean;
}
