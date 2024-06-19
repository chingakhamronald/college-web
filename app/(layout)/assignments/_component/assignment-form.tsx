"use client";

import { InputField } from "@/components/custom-field";
import { initialValues, validationSchema } from "@/config/constant";
import { useMutationAssignProject } from "@/hook/useMutationAssignProject";
import { IQuestionProps } from "@/types";
import { Button, Card, Textarea } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FileUpload } from "./file-upload";

export const AssignmentForm = () => {
  const { data: session } = useSession();
  const { mutateAssignProject, isPendingAssignProject } =
    useMutationAssignProject(session?.user?.id ?? "");

  const router = useRouter();
  return (
    <div>
      <Card className="p-6" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5">Assignment</h1>
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(e: IQuestionProps) => {
            let formData = new FormData();

            formData.append("file", e.file);
            formData.append("subject", e.subject);
            formData.append("semester", e.semester);
            formData.append("question", e.question);

            mutateAssignProject(formData);
            router.push("/dashboard");
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="w-full flex-wrap md:flex-nowrap">
                <Textarea
                  label="Question"
                  placeholder="Enter your question"
                  fullWidth
                  variant="bordered"
                  className="mb-4"
                  value={values.question}
                  onChange={(e) => setFieldValue("question", e.target.value)}
                />
                <FileUpload setFieldValue={setFieldValue} name="file" />
                <div className="flex flex-row gap-4">
                  <InputField id="subject" name="subject" label="Subject" />
                  <InputField id="semester" name="semester" label="Semester" />
                </div>
              </div>
              <div className="text-center mt-5">
                <Button type="submit" isLoading={isPendingAssignProject}>
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
