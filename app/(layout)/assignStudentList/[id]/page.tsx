"use client";

import React from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useQueryProjectById } from "@/hook/useQueryProjectById";
import moment from "moment";

const AssignStudentList = ({ params }: { params: { id: string } }) => {
  console.log({ "Id,....": params.id });

  const { dataProjectById, isLoadingProjectById } = useQueryProjectById(
    params.id
  );

  console.log({ dataProjectById: dataProjectById });

  if (isLoadingProjectById) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <div className="flex flex-row flex-wrap gap-2 item-center justify-between">
          <h1 className="text-3xl font-bold text-center mb-5">
            Assignment Details
          </h1>
          <Button>Assign</Button>
        </div>
        <div>
          <div className="flex flex-row flex-wrap gap-2">
            <Card className="flex-1">
              <CardBody>
                <h4 className="font-bold text-large">Question Details</h4>
                <p>Subject: {dataProjectById.subject}</p>
                <p>Semester: {dataProjectById.semester}</p>
                <p>Question: {dataProjectById.name}</p>
              </CardBody>
            </Card>
          </div>
          <Card className="flex-1 mt-4">
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>SUBMITTED DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody>
                {dataProjectById?.assignProject?.map((e: any) => {
                  const submittedDate = moment(e?.student?.updatedAt).format(
                    "MMM Do YYYY"
                  );

                  return (
                    <TableRow key={e?.student.id}>
                      <TableCell>{e?.student?.name}</TableCell>
                      <TableCell>{submittedDate}</TableCell>
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
                            <Link href={"/assignStudentList"}>View</Link>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AssignStudentList;

const data = {
  question: "What is the meaning of life?",
  subject: "Dynamics",
  department: "Mechanical",
  semester: "Semester 3",
};

const studentData = [
  {
    id: 1,
    name: "John",
    createdAt: "01-02-2023",
    status: true,
  },
  {
    id: 2,
    name: "Jane",
    createdAt: "01-02-2023",
    status: true,
  },
  {
    id: 3,
    name: "Bob",
    createdAt: "",
    status: false,
  },
];
