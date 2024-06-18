"use client";

import { InputField } from "@/components/custom-field";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <div>
        <Formik
          enableReinitialize={true}
          // validationSchema={validationSchema}
          initialValues={{
            email: "",
            password: "",
            role: "",
          }}
          onSubmit={(e) => {
            // mutateAssignProject(e);
            // router.push("/dashboard");
            console.log({ "e....": e });
          }}
        >
          <Form className="w-96">
            <h1 className="text-3xl font-bold text-center mb-5">Create User</h1>
            <div className="w-full flex-wrap md:flex-nowrap">
              <InputField
                label="Email"
                type="email"
                name="email"
                className="mb-4"
                fullWidth
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                className="mb-4"
                fullWidth
              />
            </div>
            <RadioGroup label="Select Role">
              <Radio value="student">Student</Radio>
              <Radio value="teacher">Teacher</Radio>
            </RadioGroup>
            <div className="text-center mt-5">
              <Button type="submit" fullWidth color="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
