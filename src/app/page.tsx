import { Suspense } from "react";
import Profile from "./components/Profile";
import Matchs from "./components/Matchs";

export default function Home() {
  return (
    <main className="p-3 w-full h-full min-w-full min-h-full bg-white">
      <div className="bg-gray-300 shadow-lg h-full w-full min-h-full min-w-full flex flex-col items-center p-2">
        <h1 className="text-2xl font-bold">OPEN SOURCE LEAGUE STATUS</h1>
        <div className="w-1/2 bg-white rounded-xl shadow-md p-2 flex justify-between">
          <Suspense fallback='Loading...'>
            <Profile />
          </Suspense>
        </div>
        <div className="w-1/2 h-full min-h-full bg-white rounded-xl shadow-md px-2 pt-2 flex justify-center mt-2">
          <Suspense fallback='Loading...'>
            <Matchs />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
