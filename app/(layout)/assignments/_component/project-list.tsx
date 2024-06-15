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
import { useQueryProjectByTeacher } from "@/hook/useQueryProjectByTeacher";

const ProjectList = () => {
  const { dataProjectByTeacher, isLoadingProjectByTeacher } =
    useQueryProjectByTeacher("3a44b9cb-36b1-46a5-9e8b-34d678f29b42");

  if (isLoadingProjectByTeacher) {
    return <div>Loading...</div>;
  }

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SUBJECT</TableColumn>
        <TableColumn>SEMESTER</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {dataProjectByTeacher.map((e: any) => {
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
                    <Link href={`/assignStudentList/${e.id}`}>Review</Link>
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

export default ProjectList;
