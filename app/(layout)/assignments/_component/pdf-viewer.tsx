"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";

type PdfViewerProps = {
  url: string;
};

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const maxWidth = 600;

export const PdfViewer: React.FC<PdfViewerProps> = (props: PdfViewerProps) => {
  console.log("PdfViewer props.... ", props);

  const [numPages, setNumPages] = useState<number>();
  //const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(600);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const pdfUrl = props.url.startsWith("http") ? props.url : `${props.url}`;

  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Card radius="none" className="my-2 w-min" key={`card_${index + 1}`}>
            <CardBody>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                //width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                renderAnnotationLayer={false}
              />
            </CardBody>
          </Card>
        ))}
      </Document>
    </div>
  );
};
