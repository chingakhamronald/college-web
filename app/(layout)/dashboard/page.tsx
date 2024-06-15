"use client";

import React from "react";
import AssignmentList from "../assignments/_component/assignment-list";
import { useSession } from "next-auth/react";
import ProjectList from "../assignments/_component/project-list";
import UserList from "@/components/user-list";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full my-5 flex justify-around align-middle flex-wrap lg:flex-nowrap">
        {session?.user?.role === "teacher" ? (
          <ProjectList />
        ) : session?.user?.role === "student" ? (
          <AssignmentList />
        ) : (
          <UserList />
        )}
      </div>
    </>
  );
}
