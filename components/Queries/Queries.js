import React, { useState, useEffect } from 'react'
import QueryAsUser from './QueryAsUser'
import QueryAsAdmin from './QueryAsAdmin'
import useAuth from '../../hooks/useAuth'
import { isUserOwner } from '../../api/orderMessage'
import BasicLoading from '../BasicLoading/BasicLoading'
import { USER_CLIENT, USER_OWNER } from '../../utils/constants'

export default function Queries () {
  const { auth } = useAuth()
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(false)

  const setTypeOfUser = async () => {
    if (auth) {
      const { idUser } = auth
      const res = await isUserOwner(idUser)
      if (res) {
        setUserType(USER_OWNER)
      } else {
        setUserType(USER_CLIENT)
      }
    }
  }
  useEffect(() => {
    setLoading(true)
    setTypeOfUser()
    setLoading(false)
  }, [auth])

  if (loading)
    return <BasicLoading classValue='questions' label='Loading ...' />

  if (userType === USER_OWNER) return <QueryAsAdmin />
  else return <QueryAsUser />
}
