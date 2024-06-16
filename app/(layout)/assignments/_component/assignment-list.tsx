import {
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
import { useSession } from "next-auth/react";
import moment from "moment";

const AssignmentList = () => {
  const { data: session } = useSession();
  const { dataProjectByStudent, isLoadingProjectByStudent } =
    useQueryProjectByStudent(session?.user?.id ?? "");

  if (isLoadingProjectByStudent) {
    return <div>Loading...</div>;
  }

  console.log({ dataProjectByStudent: dataProjectByStudent });

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>TEACHER</TableColumn>
        <TableColumn>SUBJECT</TableColumn>
        <TableColumn>ASSIGN DATE</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {dataProjectByStudent?.map((e: any) => {
          const date = moment(e?.createdAt).format("MMM Do YYYY");

          return (
            <TableRow key={e.id}>
              <TableCell>{e.teacher.name}</TableCell>
              <TableCell>{e.subject}</TableCell>
              <TableCell>{date}</TableCell>
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
