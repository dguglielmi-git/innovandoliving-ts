import { fetchRetryParams } from '@/utils/fetch';
import { getToken } from './token';
import { ProductDTO } from './interface';

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
    console.log('updateProduct finished ok');
    if (response) {
      return response.json();
    }
    return null;
  } catch (error) {
    console.error('updateProduct error', error);
    return null;
  }
}
