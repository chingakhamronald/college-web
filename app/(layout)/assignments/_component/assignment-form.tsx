'use client';

import { InputField } from '@/components/custom-field';
import { initialValues, validationSchema } from '@/config/constant';
import { useMutationAssignProject } from '@/hook/useMutationAssignProject';
import { IQuestionProps } from '@/types';
import { Button, Card, Textarea } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const AssignmentForm = () => {
  const { data: session } = useSession();
  const { mutateAssignProject, isPendingAssignProject } =
    useMutationAssignProject(session?.user?.id ?? '');

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
            mutateAssignProject(e);
            router.push('/dashboard');
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
                  value={values.name}
                  onChange={e => setFieldValue('name', e.target.value)}
                />
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
