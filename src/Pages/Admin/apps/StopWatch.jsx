import AdminLayout from "../../../Components/Admin/AdminLayout";
import { useState, useEffect } from "react";

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <AdminLayout>
      <div className="admin-container">
        <main className="dashboard-app-container relative w-fix h-calc bg-white/10 flex flex-col items-center justify-center">
          <h1 className="text-3xl absolute top-0 py-24">Stopwatch</h1>
          <section className="w-1/6 ">
            <div className="stopwatch flex justify-center items-center flex-col w-full">
              <h2 className="text-5xl font-semibold">{formatTime(time)}</h2>
              <div className="flex gap-4 mt-10 px-4 w-full justify-between">
                <button
                  className={`px-5 py-2 font-semibold rounded-md ${
                    isRunning ? "bg-red-600" : "bg-sky-500 "
                  }`}
                  onClick={() => setIsRunning((prev) => !prev)}
                >
                  {isRunning ? "Stop" : "Start"}
                </button>
                <button
                  onClick={resetHandler}
                  className="bg-green-600 font-semibold px-5 py-2 rounded-md"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AdminLayout>
  );
};

export default StopWatch;
