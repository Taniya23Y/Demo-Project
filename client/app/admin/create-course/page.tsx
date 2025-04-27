"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "../../components/Admin/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminProtected from "@/app/hooks/adminProtected";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="EDUMEET | Admin"
          description="EduMeet organizes structured coding courses from YouTube and other resources, providing clear roadmaps and tailored assignments for efficient learning. 🚀"
          keyword="Edumeet, coding courses, programming tutorials, free coding resources, structured learning, YouTube coding, web development, DSA, MERN stack, JavaScript, Python, React, software development"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5 z-[99999]">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
