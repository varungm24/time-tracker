import { useEffect, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Header, Text } from "../../components";
import LeftSideBar from "../../container/leftSideBar";
import Icon from "../../icons";
import DropDown from "../../components/dropDown";
import { useGetAllLogs } from "../../hooks/useGetAllLogs";
import { Projects, Tasks } from "../../constants";
import { useAddEditLog } from "../../hooks/mutation/useAddEditLog";
import createCustomCellRender from "../../components/table/customCellComponent";
import DeleteModalComponent from "../../patterns/popup/deleteModalComponent";
import { useNavigate } from "react-router-dom";
import { useDeleteLog } from "../../hooks/mutation/useDeleteLog";
import EditModalComponent from "../../patterns/popup/editModalComponent";
import { getDuration } from "../../utils/getDuration";

export const Dashboard = () => {
  const [selectData, setSelectData] = useState({
    project: "",
    task: "",
    description: "",
    start: "",
    end: "",
    duration: "",
  });
  const [date, setDate] = useState("");
  const [dateTime, setDateTime] = useState({});

  //functions related to time log entry are below
  const handleSelect = (data: any, field: string) => {
    setSelectData({ ...selectData, [field]: data });
  };

  //get all time logs is called here

  useEffect(() => {
    const today = new Date(Date.now());
    setDateTime(today);

    const day = today.toLocaleString("sv").replace("Z", "").replace(" ", "T");
    const fetchDay = day.split("T")[0];
    setDate(fetchDay);
  }, []);

  const { allTimeLogs, refetch } = useGetAllLogs(date);

  useEffect(() => {
    refetch();
  }, [date]);

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
        <RightSideBar
          allTimeLogs={allTimeLogs}
          handleSelect={handleSelect}
          selectData={selectData}
          setSelectData={setSelectData}
          date={date}
          setDate={setDate}
          dateTime={dateTime}
          setDateTime={setDateTime}
        />
      </div>
    </div>
  );
};

const RightSideBar = (props: any) => {
  const {
    allTimeLogs,
    handleSelect,
    selectData,
    setSelectData,
    date,
    setDate,
    dateTime,
    setDateTime,
  } = props;
  const navigate = useNavigate();
  const url = window.location;
  const taskId = url?.search?.split("=")[1];

  const { mutate: handleDeleteTask } = useDeleteLog();
  return (
    <div
      className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col"
      style={{ flex: 1 }}
    >
      <Header pageTitle="My Dashboard" />
      <AddTask
        handleSelect={handleSelect}
        selectData={selectData}
        setSelectData={setSelectData}
      />
      <ProductivityCards />
      <TableComponent
        allTimeLogs={allTimeLogs}
        date={date}
        setDate={setDate}
        dateTime={dateTime}
        setDateTime={setDateTime}
      />

      <DeleteModalComponent
        promptText="Delete the log"
        subPromptText="Are you sure you want to delete this time log?"
        primaryCtaText="Confirm"
        secondaryCtaText="Cancel"
        handlePrimaryCta={() => {
          handleDeleteTask(taskId);
          navigate("#");
        }}
        handleSecondaryCta={() => navigate("#")}
      />

      <EditModalComponent
        title="Edit Time Log"
        subTitle="You can edit the below fields"
        primaryCtaText="Save"
        secondaryCtaText="Cancel"
        handleSecondaryCta={() => navigate("#")}
      />
    </div>
  );
};

const AddTask = (props: any) => {
  const { handleSelect, selectData, setSelectData } = props;
  return (
    <div className="flex flex-1 flex-row mb-[20px] bg-white border-1 border-solid border-gray-300 p-[20px] gap-[40px] items-center rounded-[8px]">
      <div>
        <LabelHeading>Project</LabelHeading>
        <DropDown
          data={Projects}
          onChange={(value: any) => handleSelect(value, "project")}
          field="value"
          value={selectData?.project}
          containerStyle={{ width: 200 }}
        />
      </div>
      <div>
        <LabelHeading>Task</LabelHeading>
        <DropDown
          data={Tasks}
          onChange={(value: any) => handleSelect(value, "task")}
          field="value"
          value={selectData?.task}
          containerStyle={{ width: 200 }}
        />
      </div>
      <div>
        <LabelHeading>Description</LabelHeading>
        <textarea
          className="w-[400px] h-[40px] p-2 border rounded resize-none text-[#3A3B3F] placeholder-[#9EA0A5]"
          cols={40}
          style={{
            backgroundColor: "#fff",
            marginBottom: 0,
            border: "1px solid  #9EA0A5",
            outline: "none",
          }}
          placeholder="Enter your description here..."
          onChange={(event: { target: { value: any } }) => {
            if (event.target.value.length <= 400)
              handleSelect(event.target.value, "description");
          }}
          value={selectData?.description}
        />
      </div>
      <div>
        <LabelHeading>Start Task</LabelHeading>
        <Timer setSelectData={setSelectData} selectData={selectData} />
      </div>
    </div>
  );
};

const Timer = (props: any) => {
  const { setSelectData, selectData } = props;
  const [active, setActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timerWorker, setTimerWorker] = useState<Worker | null>(null);
  const { mutate: handleAddEdit } = useAddEditLog();

  function initWatch() {
    if (timerWorker === null) {
      const startTime = new Date()
        .toLocaleString("sv")
        .replace("Z", "")
        .replace(" ", "T");

      const newWorker = new Worker(
        new URL("./timerFunction/timerWorker.ts", import.meta.url)
      );
      newWorker.onmessage = (event) => {
        setDuration(event?.data); // Add the pausedDuration to the current duration
      };
      newWorker.postMessage("start");
      setTimerWorker(newWorker);
      setActive(true);
      setSelectData((prev: any) => ({
        ...prev,
        start: startTime,
      }));
    }
  }

  function initResume() {
    if (timerWorker !== null) {
      const endTime = new Date()
        .toLocaleString("sv")
        .replace("Z", "")
        .replace(" ", "T");
      timerWorker.postMessage("stop");
      setActive(false);
      setSelectData((prev: any) => ({
        ...prev,
        end: endTime,
      }));
    }
  }

  const initReset = () => {
    setDuration(0);
    setTimerWorker(null);
    setActive(false);
    setSelectData({
      project: "",
      task: "",
      description: "",
      start: "",
      end: "",
      duration: "",
    });
  };

  useEffect(() => {
    return () => {
      initResume();
    };
  }, []);

  // api call to add time log when timer is stopped
  useEffect(() => {
    if (selectData?.end !== "") {
      const duration = getDuration(selectData?.start, selectData?.end);
      handleAddEdit({
        payload: { ...selectData, duration: duration },
      });
      initReset();
    }
  }, [selectData]);

  return (
    <div className="flex flex-row items-center gap-[10px]">
      <Controls
        initWatch={initWatch}
        initResume={initResume}
        initReset={initReset}
        active={active}
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

const Controls = (props: any) => {
  const { initWatch, initResume, active } = props;

  const invokeTimer = (
    <div
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        cursor: "pointer",
      }}
      className="bg-[#018273] flex justify-center items-center"
      onClick={initWatch}
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
      onClick={initResume}
    >
      <Icon name={active ? "pauseIcon" : "rightIcon"} height={20} width={20} />
    </div>
  );
  return (
    <div>
      <div>{active ? activeTimer : invokeTimer}</div>
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

const TableComponent = (props: any) => {
  const { allTimeLogs, date, setDate, dateTime, setDateTime } = props;
  const tableRef = useRef();
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Project",
        field: "project",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Task",
        field: "task",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Description",
        field: "description",
        flex: 2,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Start Time",
        field: "start",
        flex: 1.5,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "End Time",
        field: "end",
        flex: 1.5,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "Duration",
        field: "duration",
        flex: 1,
        cellStyle: { color: "#3A3B3F" },
      },
      {
        headerName: "",
        cellRendererSelector: (params: { node: { group: any } }) => {
          if (params && params.node && params.node.group) {
            return null; // Return null for group nodes
          }
          return { component: createCustomCellRender };
        },
        width: 0,
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
      <TableTopComponent
        date={date}
        setDate={setDate}
        dateTime={dateTime}
        setDateTime={setDateTime}
      />
      <div
        id="myGrid"
        className="ag-theme-alpine w-full h-full overflow-x-scroll"
      >
        <AgGridReact
          ref={tableRef}
          className="ag-theme-alpine"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowClickSelection={true}
          rowData={allTimeLogs}
          // onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

const TableTopComponent = (props: any) => {
  const { date, setDate, dateTime, setDateTime } = props;

  const decrementDate = () => {
    const yesterday = new Date(dateTime);
    yesterday.setDate(yesterday.getDate() - 1);
    setDateTime(yesterday);
    setDate(formatDate(yesterday));
  };

  const incrementDate = () => {
    const tomorrow = new Date(dateTime);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    if (tomorrow <= currentDate) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDateTime(tomorrow);
      setDate(formatDate(tomorrow));
    }
  };

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div
      className="justify-between flex border-t border-r border-l rounded-t-lg
       border-[#F5F6FA] w-full h-16  bg-white px-6"
    >
      <div className=" flex flex-row items-center gap-[15px]">
        <div
          className="cursor-pointer"
          onClick={() => {
            decrementDate();
          }}
        >
          <Icon name="left" width={24} height={24} />
        </div>
        <div>
          <Text className="text-[#3A3B3F] font-bold">
            {new Date(date)
              .toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(/,/, "")}
          </Text>
        </div>
        <div
          className="cursor-pointer text-2xl  font-bold"
          onClick={() => {
            incrementDate();
          }}
        >
          <Icon name="right" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
