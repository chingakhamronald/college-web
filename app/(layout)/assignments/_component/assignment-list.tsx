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
import { useQueryProjectByStudent } from "@/hook/useQueryProjectByStudent";

const AssignmentList = () => {
  const { dataProjectByStudent, isLoadingProjectByStudent } =
    useQueryProjectByStudent("6625e8a2-6248-486f-96a1-79f1cc74202d");

  if (isLoadingProjectByStudent) {
    return <div>Loading...</div>;
  }

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>TEACHER</TableColumn>
        <TableColumn>SUBJECT</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {dataProjectByStudent.map((e: any) => {
          return (
            <TableRow key={e.id}>
              <TableCell>{e.teacher}</TableCell>
              <TableCell>{e.subject}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Link href={`/view-upload/${e.id}`}>View & Upload</Link>
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

export default AssignmentList;

const data = [
  {
    id: 1,
    name: "John",
    subject: "Programming language",
    teacher: "John Doe",
  },
  {
    id: 2,
    name: "Jane",
    subject: "Dynamics",
    teacher: "Jane Doe",
  },
  {
    id: 3,
    name: "Bob",
    subject: "Data Science",
    teacher: "Bob Doe",
  },
];
