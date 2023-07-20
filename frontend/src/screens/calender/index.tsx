import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Header, MyCalendar } from "../../components";
import LeftSideBar from "../../container/leftSideBar";

export const Calender = () => {
  return (
    <div
      className="bg-[#F5F6FA]"
      style={{
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <div className="flex w-full">
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
};

const RightSideBar = (props: any) => {
  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="Calender View" />
      <MyCalendar />
    </div>
  );
};
