"use client";

import React, { useEffect } from "react";
import { PdfViewer } from "../../assignments/_component/pdf-viewer";
import { useQueryUploadFileByStudent } from "@/hook/useQueryUploadFileByStudent";
import { useSession } from "next-auth/react";
import { useQueryUploadFileByTeacher } from "@/hook/useQueryUploadFileByTeacher";
import { useGlobalStore } from "@/store/useStore";
import { Image } from "@nextui-org/react";

const ViewPdf = ({ params }: { params: any }) => {
  const { data: session } = useSession();

  const { projectId } = useGlobalStore();

  console.log({
    "params...": params,
    "projectId...": projectId,
  });

  const { isLoadingViewFileByStudent, viewFileByStudent } =
    useQueryUploadFileByStudent(params.id, session?.user.id ?? "");

  const { viewFileByTeacher, isLoadingViewFileByTeacher, isError } =
    useQueryUploadFileByTeacher(projectId, params.id);

  if (isLoadingViewFileByStudent || isLoadingViewFileByTeacher) {
    return <div>Loading...</div>;
  }

  console.log({
    viewFileByTeacher: viewFileByTeacher,
    viewFileByStudent: viewFileByStudent,
  });

  if (isError) {
    return <div className="flex justify-center">No File Found</div>;
  }

  return (
    <div>
      {viewFileByTeacher.fileType === "application/pdf" ||
      viewFileByStudent.fileType === "application/pdf" ? (
        <PdfViewer
          url={
            session?.user.role === "teacher"
              ? viewFileByTeacher?.path
              : viewFileByStudent?.path
          }
        />
      ) : (
        <Image
          src={
            session?.user.role === "teacher"
              ? viewFileByTeacher.path
              : viewFileByStudent.path
          }
        />
      )}
    </div>
  );
};

export default ViewPdf;
