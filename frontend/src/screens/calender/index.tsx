import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Header, MyCalendar } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import { useGetAllLogs } from "../../hooks/useGetAllLogs";

export const Calender = () => {
  //get all time logs is called here
  const { allTimeLogs } = useGetAllLogs();
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
        <RightSideBar allTimeLogs={allTimeLogs} />
      </div>
    </div>
  );
};

const RightSideBar = (props: any) => {
  const { allTimeLogs } = props;
  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="Calender View" />
      <MyCalendar allTimeLogs={allTimeLogs} />
    </div>
  );
};
