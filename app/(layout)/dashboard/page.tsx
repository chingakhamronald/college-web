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

export default function Home() {
  // if (isLoading || isLoadingUserData) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner size="lg" />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-full my-5 flex justify-around align-middle flex-wrap lg:flex-nowrap">
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>SUBJECT</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((e: any) => {
              return (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.subject}</TableCell>
                  <TableCell>
                    {
                      <Chip
                        color={e.status ? "success" : "danger"}
                        variant="flat"
                        key={e.id}
                      >
                        {e.status ? "Completed" : "Pending"}
                      </Chip>
                    }
                  </TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-4">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Link href={"/review"}>Review</Link>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

const data = [
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
