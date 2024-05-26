import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import i18n from '../../../locales/i18n'
import LoginForm from './LoginForm'
import {server} from '../../../__tests__/__mocks__/server'

beforeAll(() => {
    server.listen();
  });
  
  afterAll(() => {
    server.close();
  });

const t = i18n.getFixedT()

describe('Test LoginForm', () => {
  it('Check existence of required fields in the LoginForm: identifier, password', async () => {
    render(<LoginForm />)
    const userEmailLoginInput = await screen.findByPlaceholderText(
      t('authLoginFormInputEmail')
    )

    const passwordInput = screen.getByPlaceholderText(
      t('authLoginFormInputPassword')
    )

    expect(userEmailLoginInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('Check Buttons to Register, Login', () => {
    render(<LoginForm />)
    const registerButton = screen.getByRole('button', {
      name: t('authLoginFormButtonRegister')
    })
    const loginButton = screen.getByRole('button', {
      name: t('authLoginFormButtonLogin')
    })

    expect(registerButton).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
})
