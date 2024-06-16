"use client";

import React from "react";
import { PdfViewer } from "../../assignments/_component/pdf-viewer";
import { useQueryUploadFileByStudent } from "@/hook/useQueryUploadFileByStudent";
import { useSession } from "next-auth/react";
import { useQueryUploadFileByTeacher } from "@/hook/useQueryUploadFileByTeacher";

const ViewPdf = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();

  const { isLoadingViewFileByStudent, viewFileByStudent } =
    useQueryUploadFileByStudent(params.id, session?.user.id ?? "");

  const { viewFileByTeacher, isLoadingViewFileByTeacher } =
    useQueryUploadFileByTeacher(params.id, session?.user.id ?? "");

  if (isLoadingViewFileByStudent || isLoadingViewFileByTeacher) {
    return <div>Loading...</div>;
  }

  console.log({
    "viewFileByStudent...": viewFileByStudent,
    "viewFileByTeacher..": viewFileByTeacher,
    "studentId..": session?.user.id,
    "projectId...": params.id,
  });

  return (
    <div>
      <PdfViewer
        url={
          session?.user.role === "teacher"
            ? viewFileByTeacher?.path
            : viewFileByStudent?.path
        }
      />
    </div>
  );
};

export default ViewPdf;
