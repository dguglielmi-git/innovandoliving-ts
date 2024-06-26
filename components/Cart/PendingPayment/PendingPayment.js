import React, { useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import useCart from '../../../hooks/useCart'
import { orderUpdate } from '../../../api/mercadopago'
import { PATH_PENDING_IMG } from '../../../utils/constants'
import { parsePendingFinalOrder } from '../../../utils/mercadopago'
import ButtonContinueShop from '../ButtonContinueShop/ButtonContinueShop'

export default function PendingPayment (props) {
  const { incomingData } = props
  const { cleanCart } = useCart()
  const { t } = useTranslation()
  const { merchant_order_id } = incomingData || null

  useEffect(() => {
    ;(async () => {
      const finalOrder = await parsePendingFinalOrder(incomingData)
      await orderUpdate(finalOrder)
      cleanCart()
    })()
  }, [])

  return (
    <div className='pending-payment'>
      <div className='title'>
        <h3>{t('cartPendingPaymentTitle')}</h3>
      </div>
      <div className='image'>
        <Image src={`./${PATH_PENDING_IMG}`} alt='' />
      </div>
      <div className='order-pending'>
        <h4>{t('cartPendingPaymentOrderNumber') + merchant_order_id}.</h4>
      </div>
      <div className='message'>
        <p>{t('cartPendingPaymentMsgFirstLine')}</p>
      </div>
      <div className='footer'>
        <p>
          <strong>{t('businessName')} 💕 </strong>
        </p>
      </div>
      <ButtonContinueShop label={t('continueShopping')} />
    </div>
  )
}
