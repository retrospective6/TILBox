/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';
import { server } from '@mocks/apis/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockFunc = () => {};
Object.defineProperty(window, 'scrollTo', { value: mockFunc, writable: true });
