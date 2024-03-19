// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   return (
//     <nav className="fixed top-0 left-50 w-full  text-black border-b  flex justify-between items-center px-8 z-10">
//       <div className="flex gap-5">
//         <Link href={"/dashboard"}>
//           <span
//             className={
//               pathname === "/dashboard"
//                 ? "underline underline-offset-4"
//                 : "no-underline"
//             }
//           >
//             Dashboard
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-gray-200 flex justify-between items-center px-8 z-10 shadow-md">
      <div className="flex items-center gap-5">
        <div className="h-10 w-10">
          <UserButton />
        </div>
        <Link href={"/dashboard"}>
          <span
            className={`text-base font-semibold ${
              pathname === "/dashboard"
                ? "underline underline-offset-2"
                : "no-underline"
            }`}
          >
            Dashboard
          </span>
        </Link>
      </div>
    </nav>
  );
}
