import { setupWorker, SetupWorkerApi } from 'msw';
import { mockApis } from '@mocks/apis';

export const worker: SetupWorkerApi = setupWorker(...mockApis);
