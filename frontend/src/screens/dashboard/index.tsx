import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Header, Text } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import Icon from "../../icons";
import DropDown from "../../components/dropDown";

export const Dashboard = () => {
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

const RightSideBar = () => {
  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="My Dashboard" />
      <AddTask />
      <ProductivityCards />
      <TableComponent />
    </div>
  );
};

const AddTask = () => {
  return (
    <div className="flex flex-1 flex-row mb-[20px] bg-white border-1 border-solid border-gray-300 p-[20px] gap-[40px] items-center rounded-[8px]">
      <div>
        <LabelHeading>Project</LabelHeading>
        <DropDown
          onChange={(value: any) => {}}
          field="value"
          containerStyle={{ width: 200 }}
        />
      </div>
      <div>
        <LabelHeading>Task</LabelHeading>
        <DropDown
          onChange={(value: any) => {}}
          field="value"
          containerStyle={{ width: 200 }}
        />
      </div>
      <div>
        <LabelHeading>Description</LabelHeading>
        <textarea
          className="w-full h-[40px] p-2 border rounded resize-none text-[#3A3B3F] placeholder-gray-500"
          cols={40}
          style={{
            backgroundColor: "#fff",
            marginBottom: 0,
            border: "1px solid  #9EA0A5",
          }}
          placeholder="Enter your description here..."
        />
      </div>
      <div>
        <LabelHeading>Start Task</LabelHeading>
        <Timer />
      </div>
    </div>
  );
};

const Timer = () => {
  const [active, setActive] = useState(false);
  const [pause, setPause] = useState(true);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    let timePeriod = null;
    if (active && pause === false) {
      timePeriod = setInterval(() => {
        setDuration((duration) => duration + 10);
      }, 10);
    } else {
      clearInterval(timePeriod);
    }
    return () => {
      clearInterval(timePeriod);
    };
  }, [active, pause]);
  const initWatch = () => {
    setStartTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    setActive(true);
    setPause(false);
  };
  const initResume = () => {
    setEndTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
    setPause(!pause);
  };
  const initReset = () => {
    setActive(false);
    setDuration(0);
  };
  return (
    <div className="flex flex-row items-center gap-[10px]">
      <Controls
        initWatch={initWatch}
        initResume={initResume}
        initReset={initReset}
        active={active}
        pause={pause}
      />
      <Watch time={duration} />
    </div>
  );
};

const Watch = (t: any) => {
  return (
    <span className="text-[#3A3B3F] text-2xl">
      <span>{("0" + Math.floor((t.time / 3600000) % 24)).slice(-2)}:</span>
      <span>{("0" + Math.floor((t.time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((t.time / 1000) % 60)).slice(-2)}</span>
    </span>
  );
};

const Controls = (prop: any) => {
  const invokeTimer = (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      className="bg-[#018273] flex justify-center items-center"
      onClick={prop?.initWatch}
    >
      <Icon name="rightIcon" height={20} width={20} />
    </div>
  );
  const activeTimer = (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      className="bg-[#018273] flex justify-center items-center"
      onClick={prop?.initResume}
    >
      <Icon
        name={prop?.pause ? "rightIcon" : "pauseIcon"}
        height={20}
        width={20}
      />
    </div>
  );
  return (
    <div>
      <div>{prop?.active ? activeTimer : invokeTimer}</div>
    </div>
  );
};

const ProductivityCards = () => {
  return (
    <div className="flex flex-1 flex-row mb-[20px]  gap-[10px] items-center">
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity Today</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          8h 43m
        </Text>
      </div>
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity Yesterday</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          7h 23m
        </Text>
      </div>
      <div className="flex flex-col  w-1/3 bg-white border-1 border-solid border-gray-300 p-[20px]  items-center justify-center rounded-[8px]">
        <LabelHeading>Productivity of this week</LabelHeading>
        <Text className="text-xl" style={{ color: "#018273" }}>
          7h 23m
        </Text>
      </div>
    </div>
  );
};

const LabelHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      className="text-base mt-3 pb-3 text-2l font-semibold"
      style={{
        color: "#3A3B3F",
      }}
    >
      {children}
    </Text>
  );
};

const TableComponent = () => {
  const tableRef = useRef();

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Project",
        field: "project",
        flex: 1,
      },
      { headerName: "Task", field: "task", flex: 1, color: "#9EA0A5" },
      {
        headerName: "Description",
        field: "description",
        flex: 2,
      },
      {
        headerName: "Time",
        field: "time",
        flex: 1,
      },
    ],
    []
  );

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  );

  return (
    <div className="flex flex-col w-full h-full">
      <TableTopComponent />
      <div id="myGrid" className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={tableRef}
          className="ag-theme-alpine"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          rowData={null}
          // onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

const TableTopComponent = () => {
  return (
    <div
      className="justify-between flex border-t border-r border-l rounded-t-lg
       border-[#F5F6FA] w-full h-16  bg-white px-6"
    >
      <div className=" flex items-center">
        <div className="text-lg text-[#3A3B3F]">Today's time logs</div>
      </div>
    </div>
  );
};
