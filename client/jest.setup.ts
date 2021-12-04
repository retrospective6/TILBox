/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';

const mockFunc = () => {};
Object.defineProperty(window, 'scrollTo', { value: mockFunc, writable: true });
