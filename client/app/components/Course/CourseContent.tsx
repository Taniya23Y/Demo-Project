import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentlist from "./CourseContentlist";
import LoaderOne from "../Loader/LoaderOne";
import HighlightText from "@/app/UI/HighlightText";
import Subscribe from "@/app/utils/Subscribe";
import Footer from "@/app/utils/Footer";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <LoaderOne />
      ) : (
        <>
          <Heading
            title={data[activeVideo]?.title}
            description="course access page information"
            keyword={data[activeVideo]?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
          />
          <div className="w-full pt-[100px] grid 800px:grid-cols-10">
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentlist
                data={data}
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
              />
            </div>
          </div>

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
        </>
      )}
    </>
  );
};

export default CourseContent;
