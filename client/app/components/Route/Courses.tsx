import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useState, useEffect } from "react";
import CourseCard from "../Course/CourseCard";
type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});
  const [course, setCourse] = useState<any[]>([]);

  useEffect(() => {
    setCourse(data?.courses);
  }, [data]);
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className=" text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Expand Your Career{" "}
          <span className=" bg-clip-text text-[#0000] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]">
            Opportunity
          </span>
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {course &&
            course
              .slice(course.length - 4, course.length)
              .map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
