"use client";

import { useSession } from "next-auth/react";
import { AssignmentForm } from "./_component/assignmentForm";
import { StudentForm } from "./_component/studentForm";

const Assignments = () => {
  const { data: session } = useSession();

  // const mutation = useMutation({
  //   mutationFn: async (values: any) => {
  //     console.log({ VALUES: values });

  //     const response = await fetch("/api/applicant", {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       throw new Error(errorDetails.error.meta.target);
  //     }

  //     return response.json();
  //   },

  //   onSuccess: (data: any) => {
  //     if (data.pk) {
  //       props.onSubmit(data);
  //       queryClient.invalidateQueries({ queryKey: ["applicants"] });
  //     }
  //   },
  //   onError: (err: { message: any }) => {
  //     alert(`Submission failed: ${err.message} already use`);
  //   },
  // });

  return (
    <div className="p-8">
      {session?.user.role === "student" ? <AssignmentForm /> : <StudentForm />}
    </div>
  );
};

export default Assignments;
