/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';

import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { server } from '@mocks/apis/server';
import cookie from '@mocks/cookie';
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cookie.clear();
});
afterAll(() => server.close());

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
