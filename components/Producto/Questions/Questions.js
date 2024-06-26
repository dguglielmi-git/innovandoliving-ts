import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Container, Comment } from 'semantic-ui-react'
import useAuth from '../../../hooks/useAuth'
import { getMeApi } from '../../../api/user'
import useMsgs from '../../../hooks/useMsgs'
import { isUserOwner } from '../../../api/orderMessage'
import { USER_CLIENT, USER_OWNER } from '../../../utils/constants'
import {
  addMessageToProduct,
  getChatMessagesByProduct,
  markChatMessageAsRead
} from '../../../api/producto'
import CommentsEmpty from './sections/CommentsEmpty'
import CommentsHeader from './sections/CommentHeader'
import BasicLoading from '../../BasicLoading/BasicLoading'
import FormComment from '../../Orders/Order/FormComment'
import CommentBody from '../../Orders/Order/content/sections/CommentBody'

export default function Questions (props) {
  const { product } = props
  const { t } = useTranslation()
  const { auth, logout } = useAuth()
  const { queryCounter, setReloadMsgCounter } = useMsgs()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [renderMsg, setRenderMsg] = useState([])
  const [userType, setUserType] = useState(false)
  const [reloadChat, setReloadChat] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (auth) {
        const user = await getMeApi(logout)
        setUsername(user.name + ' ' + user.lastname)
        const { idUser } = auth
        const res = await isUserOwner(idUser)
        if (res) {
          setUserType(USER_OWNER)
        } else {
          setUserType(USER_CLIENT)
        }
      }
      setLoading(false)
    })()
  }, [auth])

  const setMsgs = async () => {
    const msgs = await getChatMessagesByProduct(product?._id, auth?.idUser)
    await markChatMessageAsRead(product?._id, auth?.idUser, userType)
    setReloadMsgCounter(true)
    setRenderMsg(msgs)
    setReloadChat(false)
  }

  useEffect(() => {
    setMsgs()
  }, [reloadChat, queryCounter])

  const addComment = async event => {
    if (!auth) {
      toast.error(t('questionsErrorSendQuestionNotLogged'))
    }
    event.preventDefault()
    const comment = event.target[0].value
    event.target[0].value = ''
    await addMessageToProduct(
      product?.title,
      product?._id,
      auth?.idUser,
      username,
      comment,
      userType
    )
    setReloadChat(true)
  }

  if (loading)
    return (
      <BasicLoading
        classValue='questions'
        label={t('questionsLoadingProduct')}
      />
    )

  return (
    <div className='questions'>
      <Container>
        <Comment.Group>
          <CommentsHeader />

          {size(renderMsg) > 0 ? (
            <CommentBody renderMsg={renderMsg} />
          ) : (
            <CommentsEmpty />
          )}

          <FormComment
            addComment={addComment}
            sendLabel={t('questionsSendMessageLabel')}
            orderBlocked={false}
          />
        </Comment.Group>
      </Container>
    </div>
  )
}
