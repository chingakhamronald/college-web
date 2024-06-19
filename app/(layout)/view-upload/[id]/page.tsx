"use client";

import { Button, Card, CardBody, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { StudentForm } from "../../assignments/_component/student-form";
import { useQueryProjectById } from "@/hook/useQueryProjectById";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PdfViewer } from "../../assignments/_component/pdf-viewer";

const ViewAndUpload = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const [state, setState] = useState<boolean>(false);

  const router = useRouter();

  const { dataProjectById, isLoadingProjectById } = useQueryProjectById(
    params.id
  );

  console.log({
    dataProjectById: dataProjectById,
  });

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
                <p>Subject: {dataProjectById?.subject}</p>
                <p>Semester: {dataProjectById?.semester}</p>
                <p>Question: {dataProjectById?.question}</p>
                {dataProjectById?.fileType === "application/pdf" ? (
                  <div>
                    <PdfViewer url={dataProjectById?.path} />
                  </div>
                ) : (
                  <Image src={dataProjectById?.path} />
                )}
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-row flex-wrap justify-between mt-4">
            <Button
              onClick={() => router.push(`/view-pdf/${dataProjectById.id}`)}
            >
              View Assignment
            </Button>
            <Button onClick={() => setState(true)}>Upload Assignment</Button>
          </div>
          {state && (
            <div>
              <StudentForm
                projectId={dataProjectById?.id}
                studentId={session?.user.id ?? ""}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewAndUpload;
