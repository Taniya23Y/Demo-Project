import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation } = orderApi;
