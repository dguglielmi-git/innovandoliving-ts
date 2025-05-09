import React from 'react'
import { Menu, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import {
  LINK_TO_CART,
  LINK_TO_QUESTIONS,
  LINK_TO_ORDERS,
  LINK_TO_WISHLIST,
  LINK_TO_SHOWROOM,
  LINK_TO_ACCOUNT,
  LINK_TO_PRODUCT_MGMT
} from '../../../utils/constants'
import DropdownLanguages from './MenuItems/DropdownLanguages'

export default function LargeMenu (props) {
  const {
    onShowModal,
    user,
    logout,
    prodCounter,
    t,
    queryCounter,
    ordersCounter,
    languages,
    selectLang,
    languageSelected
  } = props

  return (
    <Menu secondary>
      {user ? (
        <>
          <Link href={LINK_TO_PRODUCT_MGMT}>
            <Menu.Item as='a'>
              <Icon name='warehouse alternate' />
              {t('headerMenuProductManagement')}
            </Menu.Item>
          </Link>
          <Link href={LINK_TO_QUESTIONS}>
            <Menu.Item as='a'>
              {queryCounter > 0 && (
                <Label color='red' floating circular size='mini'>
                  {queryCounter}
                </Label>
              )}
              <Icon name='comment' />
              {t('headerMenuQueries')}
            </Menu.Item>
          </Link>
          <Link href={LINK_TO_ORDERS}>
            <Menu.Item as='a'>
              {ordersCounter > 0 && (
                <Label color='red' floating circular size='mini'>
                  {ordersCounter}
                </Label>
              )}
              <Icon name='file alternate' />
              {t('headerMenuMyOrders')}
            </Menu.Item>
          </Link>
          <Link href={LINK_TO_WISHLIST}>
            <Menu.Item as='a'>
              <Icon name='heart outline' />
              {t('headerMenuFavorites')}
            </Menu.Item>
          </Link>
          <Link href={LINK_TO_ACCOUNT}>
            <Menu.Item as='a'>
              <Icon name='user outline' />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <DropdownLanguages
            languages={languages}
            onClick={selectLang}
            languageSelected={languageSelected}
          />
          <Link href={LINK_TO_CART}>
            <Menu.Item as='a' className='m-0'>
              <Icon name='cart' />
              {prodCounter > 0 && (
                <Label color='red' floating circular size='mini'>
                  {prodCounter}
                </Label>
              )}
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout}>
            {/* <div className='m-0' onClick={logout}> */}
            <Icon name='power off' />
            {/* </div> */}
          </Menu.Item>
        </>
      ) : (
        <Menu.Item as='a' onClick={onShowModal}>
          <Icon name='user outline' />
          {t('headerMenuMyAccount')}
        </Menu.Item>
      )}
    </Menu>
  )
}
