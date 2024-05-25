import { UserButton } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

function DashBoardLayout(props: Props) {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-gray-800/12">
        MooDy
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-gray-800/12">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{props.children}</div>
      </div>
    </div>
  );
}

export default DashBoardLayout;
