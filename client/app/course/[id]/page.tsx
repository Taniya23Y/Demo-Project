"use client";
import React from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

const page = ({ params }: any) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
