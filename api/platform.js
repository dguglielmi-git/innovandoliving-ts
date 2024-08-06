import { FILTER_SORTED_PLATFORMS } from '../utils/constants'
import { fetchRetryParams } from '../utils/fetch'
import { getBackendURL } from '../utils/util'
import { getToken } from './token'

export async function createCategory (category, logout) {
  const token = getToken()

  if (!token) {
    logout()
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/platform`
    const params = {
      method: 'POST',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    }

    const result = await fetchRetryParams(url, params)

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getSortedPlatforms () {
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const url = `${getBackendURL()}/platforms?${FILTER_SORTED_PLATFORMS}`
    const result = await fetchRetryParams(url, params)
    return await result.json()
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function deletePlatform (idPlatform, logout) {
  try {
    const token = getToken()

    if (!token) {
      logout()
    }

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/platform/${idPlatform}`
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
