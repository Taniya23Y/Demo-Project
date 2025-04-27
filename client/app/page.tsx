"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Footer from "./utils/Footer";
import Home from "./components/Route/Home";

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Edumeet | Learning Hub"
        description="EduMeet organizes structured coding courses from YouTube and other resources, providing clear roadmaps and tailored assignments for efficient learning. 🚀"
        keyword="Edumeet, coding courses, programming tutorials, free coding resources, structured learning, YouTube coding, web development, DSA, MERN stack, JavaScript, Python, React, software development"
      />
      <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
      <Home />
      <Footer />
    </div>
  );
};

export default Page;
