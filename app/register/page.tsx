"use client";

import { InputField } from "@/components/custom-field";
import { useMutationUserCreate } from "@/hook/useMutationUserCreate";
import { useQueryUserById } from "@/hook/useQueryUserById";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const Register = () => {
  const [selected, setSelected] = React.useState("student");

  const { mutateUserCreate, isPendingUserCreate, userData } =
    useMutationUserCreate();

  console.log({ userData: userData });

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex flex-1 justify-center items-center">
        <Formik
          enableReinitialize={true}
          // validationSchema={validationSchema}
          initialValues={{
            email: "",
            password: "",
            role: selected,
          }}
          onSubmit={(e) => {
            mutateUserCreate(e);
          }}
        >
          <Form className="w-[600px]">
            <h1 className="text-3xl font-bold text-center mb-5">
              Create User Account
            </h1>

            <div className="flex-wrap md:flex-nowrap">
              <InputField
                label="Email"
                type="email"
                name="email"
                className="mb-4"
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                className="mb-4"
              />

              <RadioGroup
                label="Select Role"
                orientation="horizontal"
                value={selected}
                onValueChange={setSelected}
              >
                <Radio value="student">Student</Radio>
                <Radio value="teacher">Teacher</Radio>
              </RadioGroup>
            </div>

            <div className="text-center mt-5">
              <Button
                type="submit"
                fullWidth
                color="primary"
                isLoading={isPendingUserCreate}
              >
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
