import React, { useState, useEffect } from 'react'
import { forEach } from 'lodash'
import { Divider } from 'primereact/divider'
import ButtonBack from './sections/ButtonBack'
import ListItemsCart from './sections/ListItemsCart'
import ButtonContinue from './sections/ButtonContinue'
import HeaderTotalCart from './sections/HeaderTotalCart'
import FooterTotalCart from './sections/FooterTotalCart'
import {
  DELIVERY_OPTION_DELIVERY,
  DELIVERY_OPTION_EXTERNAL_PROVIDER,
  ERROR_GETTING_ADDRESS_DETAILS
} from '../../../utils/constants'
import useAuth from '../../../hooks/useAuth'
import { getAddressById } from '../../../api/address'
import { calcShippingDelivery, getDiscountPrice } from '../../../utils/util'
import { getConfigurations } from '../../../api/configurations'

export default function ConfirmCart (props) {
  const {
    t,
    setStep,
    products,
    address,
    deliveryOption,
    shippingPrice,
    setShippingPrice
  } = props
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()

  const setConfigurations = async () => {
    const configs = await getConfigurations()

    if (address) {
      const clientAddress = await getAddressById(address, logout)
      try {
        switch (deliveryOption) {
          case DELIVERY_OPTION_DELIVERY:
            setShippingPrice(calcShippingDelivery(configs, clientAddress))
            break
          case DELIVERY_OPTION_EXTERNAL_PROVIDER:
            setShippingPrice(configs.external_provider_price?.$numberDecimal)
            break
          default:
            setShippingPrice(0)
        }
      } catch (error) {
        console.error(`${ERROR_GETTING_ADDRESS_DETAILS}  ${error}`)
      }
    }
  }
  useEffect(() => {
    setLoading(true)
    setConfigurations()
    setLoading(false)
  }, [])

  const updateTotalPrice = async () => {
    let price = 0
    await forEach(products, product => {
      if (product.producto.discount) {
        let discountPrice = getDiscountPrice(
          parseFloat(product.producto?.price?.$numberDecimal),
          product.producto.discount
        )
        price += parseFloat(discountPrice) * parseFloat(product.quantity)
      } else {
        price +=
          parseFloat(product.producto?.price?.$numberDecimal) *
          parseFloat(product.quantity)
      }
    })
    setTotalPrice(price)
  }
  useEffect(() => {
    updateTotalPrice()
  }, [products])

  return (
    <div className='confirm-cart'>
      <ButtonBack setStep={setStep} />

      <HeaderTotalCart />

      <ListItemsCart products={products} />

      <FooterTotalCart
        t={t}
        deliveryOption={deliveryOption}
        totalPrice={totalPrice}
        shippingPrice={shippingPrice}
      />

      <Divider align='center' />

      <ButtonContinue setStep={setStep} loading={loading} />
    </div>
  )
}
