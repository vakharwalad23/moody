import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];

function DashBoardLayout(props: Props) {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-gray-800/12">
        <div>MooDy</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
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
