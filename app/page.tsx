import Link from "next/link";

export default function Home() {
  return (
    <div className="px-5 w-screen h-screen bg-black flex justify-center items-center text-white space-y-5">
      <div className="w-full max-w-[900px] mx-auto">
        <h1 className="text-7xl mb-3">AI based Journal App</h1>
        <p className="text-2xl text-gray-200/30 mb-5">
          The journal app that will analyze your mood. Weekly mood graphs. Chat
          with your journals.
        </p>
        <div className="flex">
          <Link href="/journal">
            <button className="py-3 px-3 border border-gray-400 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] hover:bg-gray-500/30">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
