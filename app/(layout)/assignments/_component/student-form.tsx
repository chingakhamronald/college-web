"use client";

import { FileUpload } from "@/app/(layout)/assignments/_component/file-upload";
import { Button, Card } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";

export const StudentForm = ({ subject }: { subject: string }) => {
  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5">
          Upload Assignment
        </h1>
        <Formik
          enableReinitialize={true}
          // validationSchema={validationSchema}
          initialValues={{
            subject: subject,
            path: null,
            projectName: "New",
          }}
          onSubmit={(e) => {
            console.log({ "e...": e });

            // mutation.mutate(e);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="w-full flex-wrap md:flex-nowrap">
                <FileUpload setFieldValue={setFieldValue} name="path" />
              </div>
              <div className="text-center mt-5">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
