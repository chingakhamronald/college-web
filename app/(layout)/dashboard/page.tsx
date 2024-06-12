"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import StudentList from "../assignments/_component/student-list";
import AssignmentList from "../assignments/_component/assignment-list";

export default function Home() {
  // if (isLoading || isLoadingUserData) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  const { data: session } = useSession();

  return (
    <>
      <div className="w-full my-5 flex justify-around align-middle flex-wrap lg:flex-nowrap">
        {session?.user?.role === "teacher" ? (
          <StudentList />
        ) : (
          <AssignmentList />
        )}
      </div>
    </>
  );
}

export const data = [
  {
    id: 1,
    name: "John",
    subject: "Programming language",
    status: true,
  },
  {
    id: 2,
    name: "Jane",
    subject: "Dynamics",
    status: true,
  },
  {
    id: 3,
    name: "Bob",
    subject: "Data Science",
    status: false,
  },
];
