"use client";

import { InputField } from "@/components/custom-field";
import { departmentList } from "@/config/constant";
import { useMutationStudent } from "@/hook/useMutationStudent";
import { useQueryUserById } from "@/hook/useQueryUserById";
import { Button, Card, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const Student = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { userIdData, isLoadingUserData } = useQueryUserById(params.id);

  const { mutateStudent, isLoadingStudent } = useMutationStudent(params.id);

  if (isLoadingUserData) return <div>Loading...</div>;

  return (
    <div className="mt-4">
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
          router.push("/dashboard");
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
                  onChange={(e) => setFieldValue("department", e.target.value)}
                >
                  {departmentList.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Student;
