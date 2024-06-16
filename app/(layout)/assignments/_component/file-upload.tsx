"use client";

import React, { FC } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
}

export const FileUpload: FC<FileUploadProps> = ({ setFieldValue, name }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className="mb-4">
      <section className="p-10 rounded-sm border-3">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only PDF files will be accepted)</em>
        </div>
      </section>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </div>
  );
};
