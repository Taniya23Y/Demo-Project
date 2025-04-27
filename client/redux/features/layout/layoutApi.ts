import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLAyout: builder.mutation({
      query: ({
        type,
        image,
        firstTitle,
        midTitle,
        lastTitle,
        faq,
        category,
      }) => ({
        url: `/edit-layout`,
        method: "PUT",
        body: {
          type,
          image,
          firstTitle,
          midTitle,
          lastTitle,
          faq,
          category,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLAyoutMutation } = layoutApi;
