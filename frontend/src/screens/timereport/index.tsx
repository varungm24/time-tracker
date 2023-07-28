
// pages/TimeReport.tsx
import React, { useEffect, useState } from 'react';
import BarChart from '../../components/charts/barchart';
import { getAllTask } from '../../api';
import { Header } from '../../components';
import LeftSideBar from '../../container/leftSideBar';

interface EventData {
  id: string;
  project: string;
  task: string;
  description: string;
  start: string;
  end: string;
  duration: string; // Duration format: "0h 30min"
  __v: number;
}

const TimeReport: React.FC = () => {
  const [taskData, setTaskData] = useState<EventData[]>([]);

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const data: EventData[] = await getAllTask(); // Make sure the API returns EventData[]
      console.log('Fetched data:', data); // Check the fetched data in the console
      setTaskData(data); // Update the taskData state with the fetched data
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  console.log('Task data in TimeReport:', taskData); // Check the taskData state in the console

  return (
    <div className="bg-[#F5F6FA]" style={{ overflow: 'hidden', height: '100vh' }}>
      <div className="flex w-full">
        <LeftSideBar />
        <RightSideBar taskData={taskData} />
      </div>
    </div>
  );
};

const RightSideBar = (props: { taskData: EventData[] }) => {
  const { taskData } = props;
  console.log( taskData?.taskData);

  return (
    <div className="relative overflow-scroll shadow-md w-full h-screen px-6 py-8 flex flex-col" style={{ flex: 1 }}>
      <Header pageTitle="Time Report" />
      <div className='text-black'>
        <h1>Event Durations Bar Chart</h1>
        <div className='w-96 h-96'>
        {taskData?.taskData?.length > 0 ? <BarChart data={taskData?.taskData} /> : <div>No data available</div>}
      </div>
      </div>
    </div>
  );
};

export default TimeReport;