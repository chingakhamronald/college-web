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
import { useQueryProjectById } from "@/hook/useQueryProjectById";
import moment from "moment";
import { useMutationAssignProjectByTeacher } from "@/hook/useMutationAssignProjectByTeacher";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/useStore";

const AssignStudentList = ({ params }: { params: { id: string } }) => {
  const { setProjectId } = useGlobalStore();

  const router = useRouter();

  const { dataProjectById, isLoadingProjectById } = useQueryProjectById(
    params.id
  );

  const { mutateAssignProjectByTeacher, isPendingAssignProjectByTeacher } =
    useMutationAssignProjectByTeacher(dataProjectById?.id);

  if (isLoadingProjectById) {
    return <div>Loading...</div>;
  }

  console.log({
    "dataProjectById......": dataProjectById,
  });

  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <div className="flex flex-row flex-wrap gap-2 item-center justify-between">
          <h1 className="text-3xl font-bold text-center mb-5">
            Assignment Details
          </h1>
          <Button
            onClick={() => mutateAssignProjectByTeacher()}
            isLoading={isPendingAssignProjectByTeacher}
          >
            Assign
          </Button>
        </div>
        <div>
          <div className="flex flex-row flex-wrap gap-2">
            <Card className="flex-1">
              <CardBody>
                <h4 className="font-bold text-large">Question Details</h4>
                <p>Subject: {dataProjectById.subject}</p>
                <p>Semester: {dataProjectById.semester}</p>
                <p>Question: {dataProjectById.question}</p>
              </CardBody>
            </Card>
          </div>
          <Card className="flex-1 mt-4">
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ASSIGN DATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
              </TableHeader>
              <TableBody>
                {dataProjectById?.assignProject?.map((e: any) => {
                  const submittedDate = moment(e?.updateAt).format(
                    "MMM Do YYYY hh:mm A"
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
                            <Button
                              onClick={() => {
                                router.push(`/view-pdf/${e?.student?.id}`);
                                setProjectId(dataProjectById?.id);
                              }}
                            >
                              View
                            </Button>
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
