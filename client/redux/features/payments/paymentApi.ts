import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStripePublishKey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetStripePublishKeyQuery, useCreatePaymentIntentMutation } =
  paymentApi;
