"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { StudentForm } from "../assignments/_component/student-form";
// import { PdfViewer } from "../assignments/_component/pdf-viewer";

const ViewAndUpload = () => {
  const [state, setState] = useState("view");

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
                <p>Subject: {data.subject}</p>
                <p>Semester: {data.semester}</p>
                <p>Question: {data.question}</p>
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
            <div>{/* <PdfViewer url={data.url} /> */}</div>
          ) : (
            <div>
              <StudentForm subject={data.subject} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewAndUpload;

const data = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@bu.edu",
  father_name: "John",
  mobile_number: "0123456789",
  address: "123 Main St",
  pincode: "12345",
  subject: "Dynamics",
  department: "Mechanical",
  question: "whatnfsjd ?",
  semester: "Semester 3",
  url: "https://wcd.nic.in/sites/default/files/Beti%20Bachao-Beti%20Padao_Hindi.pdf",
};
