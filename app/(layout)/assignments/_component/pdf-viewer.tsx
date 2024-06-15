"use client";

import { Card, CardBody } from "@nextui-org/react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";

type PdfViewerProps = {
  url?: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };

  return (
    <div>
      <Document
        file={
          "https://mitnewbucket.s3.ap-south-1.amazonaws.com/5909710410139114764+(2).pdf-1718445202624"
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Card
            radius="none"
            className="my-2 shadow-md"
            key={`card_${index + 1}`}
          >
            <CardBody>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
              />
            </CardBody>
          </Card>
        ))}
      </Document>
    </div>
  );
};
