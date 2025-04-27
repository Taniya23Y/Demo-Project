import { useGetCoursesDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState, useEffect } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishKeyQuery,
} from "@/redux/features/payments/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import LoaderOne from "../Loader/LoaderOne";
import Footer from "@/app/utils/Footer";
import HighlightText from "@/app/UI/HighlightText";
import Subscribe from "@/app/utils/Subscribe";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const { data, isLoading } = useGetCoursesDetailsQuery(id);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data: config } = useGetStripePublishKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }

    if (data) {
      const amount = Math.round(data?.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <LoaderOne />
      ) : (
        <div>
          <Heading
            title={data.course.name + " - Edumeet"}
            description="EduMeet organizes structured coding courses from YouTube and other resources, providing clear roadmaps and tailored assignments for efficient learning. 🚀"
            keyword={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            route={route}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setOpen={setOpen}
              setRoute={setRoute}
            />
          )}
          {/* Subscribe Section */}
          <div className="w-11/12 pt-[1rem] mx-auto max-w-maxContent flex-col items-center justify-between gap-8 text-white">
            <h2 className="text-center text-4xl font-semibold mt-10 ">
              <HighlightText text="Subscribe to Newsletter ✨" />
            </h2>
            <div className="pt-4">
              <Subscribe />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
