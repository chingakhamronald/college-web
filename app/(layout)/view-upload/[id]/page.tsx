"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { StudentForm } from "../../assignments/_component/student-form";
import { useQueryProjectById } from "@/hook/useQueryProjectById";
import { PdfViewer } from "../../assignments/_component/pdf-viewer";

const ViewAndUpload = ({ params }: { params: { id: string } }) => {
  const [state, setState] = useState("view");

  const { dataProjectById, isLoadingProjectById } = useQueryProjectById(
    params.id
  );

  if (isLoadingProjectById) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5">
          Assignment Details
        </h1>
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
          <div className="flex flex-row flex-wrap justify-between mt-4">
            <Button onClick={() => setState("view")}>View Assignment</Button>
            <Button onClick={() => setState("upload")}>
              Upload Assignment
            </Button>
          </div>
          {state === "view" ? (
            <div>
              <PdfViewer />
            </div>
          ) : (
            <div>
              <StudentForm subject={dataProjectById.subject} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewAndUpload;
