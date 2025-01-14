import {
  DEFAULT_SORT_PRODUCT_ITEMS,
  FILTER_PRODUCTS_BY_PLATFORM,
  USER_CLIENT,
  USER_OWNER
} from '../utils/constants'
import { fetchRetryParams } from '../utils/fetch'
import { getBackendURL } from '../utils/util'
import { getToken } from './token'

export async function getPublishedProducts (limit) {
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/publishedProducts?${DEFAULT_SORT_PRODUCT_ITEMS}${limit}`
    const result = await fetchRetryParams(url, params)
    return await result.json()
  } catch (error) {
    console.error(`getPublishedProducts error: ${error}`)
    return []
  }
}

export async function getAllProducts (logout) {
  const token = getToken()

  if (!token) {
    logout()
  }

  try {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/getAllProducts`
    const result = await fetchRetryParams(url, params)
    return await result.json()
  } catch (error) {
    console.error(`getAllProducts error: ${error}`)
    return []
  }
}

export async function getProductsByPlatform (platform, limit, start) {
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/productsByPlatform/${platform}?${FILTER_PRODUCTS_BY_PLATFORM}${start}&limit=${limit}`
    const result = await fetchRetryParams(url, params)
    return await result.json()
  } catch (error) {
    console.log(error)
    console.error(`getProductsByPlatform error: ${error}`)
    return []
  }
}

export async function getProductByID (idProduct) {
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/productById/${idProduct}`
    const result = await fetchRetryParams(url, params)
    const resultJson = await result.json()
    return resultJson
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function searchProductByTitle (title) {
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/productByTitle/${title}`
    const result = await fetchRetryParams(url, params)
    return await result.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function addMessageToProduct (
  productName,
  productId,
  userId,
  username,
  message,
  icon
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat`

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': getToken()
      },
      body: JSON.stringify({
        productName: productName,
        productId: productId,
        userId: userId,
        username: username,
        message: message,
        icon: icon,
        msgread: icon === USER_CLIENT ? 1 : 0,
        msgreadowner: icon === USER_OWNER ? 1 : 0
      })
    }

    const result = await fetchRetryParams(url, params)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function markChatMessageAsRead (productId, userId, userType) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/message`

    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-token': getToken()
      },
      body: JSON.stringify({
        productId: productId,
        userId: userId,
        userType: userType
      })
    }

    const result = await fetchRetryParams(url, params)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getChatMessagesByProduct (productId, userId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/messages/${productId}/${userId}`

    const params = getJsonHeader()

    const result = await fetchRetryParams(url, params)
    const response = await result.json()
    if (response.error !== undefined) {
      return []
    }
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getOpenChats () {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/open`

    const params = getJsonHeader()

    const result = await fetchRetryParams(url, params)
    const response = await result.json()
    if (response.error !== undefined) {
      return []
    }
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

const getJsonHeader = () => ({
  headers: {
    'Content-Type': 'application/json',
    'x-token': getToken()
  }
})

export async function getUnreadMsgs () {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/unreadmsg`

    const params = getJsonHeader()

    const result = await fetchRetryParams(url, params)
    const response = await result.json()
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function deleteProduct (idProduct, logout) {
  try {
    const token = getToken()

    if (!token) {
      logout()
    }

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/deleteProduct/${idProduct}`
    const params = {
      method: 'DELETE',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      }
    }
    await fetchRetryParams(url, params)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function uploadFileToS3 (file) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/generateSignedUrl?filename=${file.name}&filetype=${file.type}`
    )
    const { filename, url } = await response.json()

    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type
      },
      body: file
    })

    if (result.ok) {
      console.log('Archivo subido correctamente')
      return { filename, error: '' }
    } else {
      console.error('Error al subir el archivo', result)
      return { error: `filename ${file.name} error` }
    }
  } catch (err) {
    console.error('Error al subir archivo a S3:', err)
    return { error: `filename ${file.name} error` }
  }
}
export async function uploadFile (body, fileName, fileType) {
  // const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/productFile/upload?filename=${fileName}&filetype=${fileType}`
  const url = `http://localhost:5001/innovandoliving-mercadopago-cf/us-central1/innovandoLivingMP/productFile/upload?filename=${fileName}&filetype=${fileType}`
  try {
    const params = {
      method: 'POST',
      body: body
    }

    const response = await fetchRetryParams(url, params)

    if (response) {
      const data = await response.json()

      return data
    }
  } catch (error) {
    console.error(error)
  }
}

export async function saveProduct (product) {
  try {
    const token = getToken()

    if (!token) {
      logout()
    }

    console.log('product received', product)

    const body = JSON.stringify({
      summary: product.summary,
      title: product.title,
      price: product.price,
      url: product.url,
      platform: product.platform,
      screenshots: product.screenshots.map(product => {
        product.url
      }),
      discount: product.discount,
      releaseDate: product.releaseDate,
      publish: product.publish
    })
    console.log('body', body)

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/product`
    const params = {
      method: 'POST',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
      body: body
    }
    await fetchRetryParams(url, params)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
