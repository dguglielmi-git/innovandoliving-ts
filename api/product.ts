import { fetchRetryParams } from '@/utils/fetch';
import { getToken } from './token';

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

export async function saveProduct(product: ProductDTO) {
  try {
    const token = getToken();
    const body = JSON.stringify(product);

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/product`;
    const params = {
      method: 'POST',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetchRetryParams(url, params);

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateProduct(productId: string, product: ProductDTO) {
  try {
    const token = getToken();
    const body = JSON.stringify(product);

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/product/${productId}`;
    const params = {
      method: 'PUT',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetchRetryParams(url, params);

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
