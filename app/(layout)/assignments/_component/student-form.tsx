import { InputField } from "@/components/custom-field";
import { Button, Card } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";

export const StudentForm = () => {
  return (
    <div>
      <Card className="p-6" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5">Assignment</h1>
        <Formik
          enableReinitialize={true}
          // validationSchema={validationSchema}
          initialValues={{
            semester: "",
          }}
          onSubmit={(e) => {
            console.log({ "e...": e });

            // mutation.mutate(e);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="w-full flex-wrap md:flex-nowrap">
                <InputField id="semester" name="semester" label="Semester" />
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
