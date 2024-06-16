"use client";

import { FileUpload } from "@/app/(layout)/assignments/_component/file-upload";
import { useMutationUploadFile } from "@/hook/useMutationUploadFile";
import { Button, Card } from "@nextui-org/react";
import { Form, Formik } from "formik";
import moment from "moment";
import React, { FC } from "react";

interface IStudentForm {
  studentId: string;
  projectId: string;
}

export const StudentForm: FC<IStudentForm> = ({ projectId, studentId }) => {
  const { mutateUploadFile, isLoadingUploadFile } = useMutationUploadFile(
    studentId,
    projectId
  );

  const currentTime = moment().format("DD-MM-YYYY");

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
            file: "",
            docName: currentTime,
          }}
          onSubmit={(e) => {
            console.log({ "e...": e });
            let formData = new FormData();

            formData.append("file", e.file);
            formData.append("docName", currentTime);

            mutateUploadFile(formData);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="w-full flex-wrap md:flex-nowrap">
                <FileUpload setFieldValue={setFieldValue} name="file" />
              </div>
              <div className="text-center mt-5">
                <Button type="submit" isLoading={isLoadingUploadFile}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
