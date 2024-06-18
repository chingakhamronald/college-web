'use client';

import { InputField } from '@/components/custom-field';
import { departmentList } from '@/config/constant';
import { useMutationTeacher } from '@/hook/useMutationTeacher';
import { useQueryUserById } from '@/hook/useQueryUserById';
import { Button, Card, CardBody, Select, SelectItem } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useQueryTeacherById } from '../../../../../hook/useQueryTeacherById';
import { useMutationVerifyTeacher } from '../../../../../hook/useMutationVerifyteacher';

const TeacherInAdmin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data, isLoading } = useQueryTeacherById(params.id);
  const { mutate, isPending } = useMutationVerifyTeacher();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <Card className="p-6" shadow="sm">
        <div className="flex flex-row flex-wrap gap-2 item-center justify-between">
          <h1 className="text-3xl font-bold text-center mb-5">Details</h1>
          {data?.user?.isverified ? (
            ''
          ) : (
            <Button
              onClick={async () => await mutate(data?.user?.id)}
              isLoading={isPending}
            >
              Verify
            </Button>
          )}
        </div>
        <div>
          <div className="flex flex-row flex-wrap gap-2">
            <Card className="flex-1">
              <CardBody>
                <h4 className="font-bold text-large">Question Details</h4>
                <p>Name: {data?.name}</p>
                <p>Address: {data?.address}</p>
                <p>Contact: {data?.mobile_number}</p>
                <p>Email: {data?.user?.email}</p>
                <p>Department: {data?.department}</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherInAdmin;
