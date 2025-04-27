"use client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import CourseContent from "../../components/Course/CourseContent";
import LoaderOne from "@/app/components/Loader/LoaderOne";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user?.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, id, error]);
  return (
    <>
      {isLoading ? (
        <LoaderOne />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;
