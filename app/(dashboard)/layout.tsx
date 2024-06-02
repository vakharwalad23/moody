import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

function DashBoardLayout(props: Props) {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-gray-800/12">
        <div className="flex items-center justify-center h-16 text-xl font-bold">
          MooDy
        </div>
        <nav>
          <ul>
            {links.map((link) => (
              <li
                key={link.href}
                className="hover:bg-gray-500/25 transition-colors duration-300"
              >
                <Link
                  href={link.href}
                  className="flex items-center px-6 py-4 text-gray-950 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
