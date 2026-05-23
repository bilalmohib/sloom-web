import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** Sample response shape — replace with your API types. */
export type ExamplePost = {
  id: number;
  title: string;
  body: string;
};

/**
 * Minimal RTK Query reference slice.
 * Swap `baseUrl` and endpoints when wiring real APIs (e.g. `/api`).
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getExamplePost: builder.query<ExamplePost, number>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetExamplePostQuery } = apiSlice;
