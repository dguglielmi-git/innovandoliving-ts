import '@testing-library/jest-dom'
import 'jest-fetch-mock'; 

import { server } from './__tests__/__mocks__/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



