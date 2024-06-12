import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { PdfViewer } from "../assignments/_component/pdf-viewer";

const Review = () => {
  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5">
          Assignment Details
        </h1>
        <div>
          <div className="flex flex-row flex-wrap gap-2">
            <Card radius="none" className="flex-1">
              <CardBody>
                <h4 className="font-bold text-large">Personal Details</h4>
                <p>
                  Name: {data.firstName} {data.lastName}
                </p>
                <p>Email: {data.email}</p>
                <p>Father&apos;s Name: {data.father_name}</p>
                <p>Mobile Number: {data.mobile_number}</p>
                <p>
                  Address: {data.address}, {data.pincode}
                </p>
              </CardBody>
            </Card>
            <Card radius="none" className="flex-1">
              <CardBody style={{ minHeight: 100 }}>
                <h4 className="font-bold text-large">Subejct</h4>
                <p>Subject: {data.subject}</p>
                <p>Department: {data.department}</p>
                <p>Semester: {data.semester}</p>
              </CardBody>
            </Card>
          </div>
          <PdfViewer url={data.url} />
        </div>
      </Card>
    </div>
  );
};

export default Review;

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
  semester: "Semester 3",
  url: "https://wcd.nic.in/sites/default/files/Beti%20Bachao-Beti%20Padao_Hindi.pdf",
};
