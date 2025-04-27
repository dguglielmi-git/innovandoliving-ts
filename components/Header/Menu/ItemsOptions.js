import React from 'react'
import { Label, Dropdown } from 'semantic-ui-react'
import Link from 'next/link'
import {
  LINK_TO_QUESTIONS,
  LINK_TO_ORDERS,
  LINK_TO_WISHLIST,
  LINK_TO_PRODUCT_MGMT
} from '../../../utils/constants'

export default function ItemsOptions (props) {
  const { t } = props
  return (
    <>
      <Label content={t('headerMenuOptions')} />
      <Link href={LINK_TO_QUESTIONS}>
        <Dropdown.Item icon='comment' text={t('headerMenuQueries')} />
      </Link>
      <Link href={LINK_TO_ORDERS}>
        <Dropdown.Item icon='file alternate' text={t('headerMenuMyOrders')} />
      </Link>
      <Link href={LINK_TO_WISHLIST}>
        <Dropdown.Item icon='heart outline' text={t('headerMenuFavorites')} />
      </Link>
      <Link href={LINK_TO_PRODUCT_MGMT}>
        <Dropdown.Item
          icon='warehouse alternate'
          text={t('headerMenuProductManagement')}
        />
      </Link>
      <Dropdown.Divider />
    </>
  )
}
