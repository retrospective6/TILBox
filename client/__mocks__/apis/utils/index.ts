export function mockApiURL(path: string): string {
  return process.env.API_HOST + path;
}
