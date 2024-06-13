"use client";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

import Link from "next/link";
import { data } from "../../dashboard/page";

const StudentList = () => {
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SUBJECT</TableColumn>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((e: any) => {
          return (
            <TableRow key={e.id}>
              <TableCell>{e.subject}</TableCell>
              <TableCell>{e.semester}</TableCell>
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
                    <Link href={"/assignStudentList"}>Review</Link>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentList;
