"use client";

import { InputField } from "@/components/custom-field";
import { departmentList } from "@/config/constant";
import { useMutationStudent } from "@/hook/useMutationStudent";
import { useQueryUserById } from "@/hook/useQueryUserById";
import { Button, Card, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";

const Student = ({ params }: { params: { id: string } }) => {
  const { userIdData, isLoadingUserData } = useQueryUserById(params.id);

  console.log({ "params....": params.id });

  const { mutateStudent, isLoadingStudent } = useMutationStudent(params.id);

  if (isLoadingUserData) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <Card className="p-10 flex-1 mx-56" shadow="sm">
        <h1 className="text-3xl font-bold text-center mb-5 capitalize">
          Update Profile {userIdData?.role}
        </h1>
        <Formik
          enableReinitialize={true}
          // validationSchema={validationSchema}
          initialValues={{
            name: "",
            department: "",
            mobile_number: "",
            address: "",
            fatherName: "",
            semester: "",
          }}
          onSubmit={(e: any) => {
            console.log({ "e...": e });

            mutateStudent(e);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="w-full flex-wrap md:flex-nowrap">
                <div className="flex flex-row gap-4 mb-4">
                  <InputField id="name" name="name" label="Name" />

                  <InputField id="address" name="address" label="Address" />
                </div>
                <div className="flex flex-row gap-4 mb-4">
                  <InputField
                    id="fatherName"
                    name="fatherName"
                    label="Father Name"
                  />
                  <InputField
                    id="mobile_number"
                    name="mobile_number"
                    label="Mobile Number"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <InputField id="semester" name="semester" label="Semester" />
                  <Select
                    label="Department"
                    selectedKeys={[values.department]}
                    variant="bordered"
                    size="sm"
                    name="department"
                    onChange={(e) =>
                      setFieldValue("department", e.target.value)
                    }
                  >
                    {departmentList.map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="text-center mt-5">
                <Button type="submit" isLoading={isLoadingStudent}>
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

export default Student;
