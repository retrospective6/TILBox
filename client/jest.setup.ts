/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';

import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { server } from '@mocks/apis/server';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
