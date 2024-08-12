import Profile from "./components/Profile";

export default function Home() {
  return (
    <main className="p-3 w-screen h-screen min-w-full min-h-screen bg-white">
      <div className="bg-gray-300 shadow-lg h-full w-full min-h-full min-w-full flex flex-col items-center p-2">
        <h1 className="text-2xl font-bold">OPEN SOURCE LEAGUE STATUS</h1>
        <Profile />
      </div>
    </main>
  );
}
