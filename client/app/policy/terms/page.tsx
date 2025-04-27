/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Heading from "../../utils/Heading";
import Footer from "../../utils/Footer";
import React, { useEffect, useState } from "react";
import TermsOfService from "./TermsOfService";

const page = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);

  // Set document title dynamically
  useEffect(() => {
    if (user?.name) {
      document.title = `${user.name} Profile`;
    } else {
      document.title = "Profile";
    }
  }, [user]);
  return (
    <div>
      <Heading
        title={`${user?.name} profile`}
        description="EduMeet organizes structured coding courses from YouTube and other resources, providing clear roadmaps and tailored assignments for efficient learning. 🚀"
        keywords="Edumeet, coding courses, programming tutorials, free coding resources, structured learning, YouTube coding, web development, DSA, MERN stack, JavaScript, Python, React, software development"
      />
      <Header open={open} setOpen={setOpen} setRoute={setRoute} route={route} />
      <div className="pt-[5rem] md:pt-[9rem] pb-[2rem]">
        <TermsOfService />
      </div>
      <Footer />
    </div>
  );
};

export default page;
