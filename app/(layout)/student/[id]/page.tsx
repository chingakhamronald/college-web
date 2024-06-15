"use client";

import { InputField } from "@/components/custom-field";
import { departmentList } from "@/config/constant";
import { useMutationTeacher } from "@/hook/useMutationTeacher";
import { useQueryUserById } from "@/hook/useQueryUserById";
import { Button, Card, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const Student = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { userIdData, isLoadingUserData } = useQueryUserById(params.id);

  const { mutateTeacher, isLoadingTeacher } = useMutationTeacher(params.id);

  if (isLoadingUserData) return <div>Loading...</div>;

  console.log({ userIdData: userIdData });

  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
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
          }}
          onSubmit={(e: any) => {
            mutateTeacher(e);
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
                <div className="flex flex-row gap-4">
                  <InputField
                    id="mobile_number"
                    name="mobile_number"
                    label="Mobile Number"
                  />

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
                <Button type="submit" isLoading={isLoadingTeacher}>
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
