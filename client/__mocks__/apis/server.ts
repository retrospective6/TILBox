import { setupServer, SetupServerApi } from 'msw/node';
import { mockApis } from '@mocks/apis';

export const server: SetupServerApi = setupServer(...mockApis);
