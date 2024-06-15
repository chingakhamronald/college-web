"use client";

import { useSession } from "next-auth/react";
import { AssignmentForm } from "./_component/assignment-form";

const Assignments = () => {
  return (
    <div className="p-8">
      <AssignmentForm />
    </div>
  );
};

export default Assignments;
