// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
// import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

// GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

// import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
// import workerSrc from 'pdfjs-dist/build/pdf.worker?url';

// GlobalWorkerOptions.workerSrc = workerSrc;

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { FileType } from "lucide-react";

interface ViewerProps {
  fileUrls: string[];
}

const getFileTypeFromUrl = (url: string): string => {
  try {
    const cleanPath = url.split("?")[0]; // Remove query params
    const extension = cleanPath.split(".").pop()?.toLowerCase() || "";
    return extension;
  } catch {
    return "";
  }
};


const fileUrl = `https://reproquodevuksouth.blob.core.windows.net/product-documents/[14-02-2025]Delivery_Note_Report(1)20250217T052708310.pdf?sv=2018-03-28&sr=b&sig=arZEf4XAWo1iGKIHKOPmcFV8vEKaFiTM1ec%2Bxzcnnek%3D&se=2025-07-24T04%3A50%3A50Z&sp=r`;

const allowedCorsFileUrl = `http://localhost:5000/proxy?url=${encodeURIComponent(fileUrl)}`

window.open(allowedCorsFileUrl);

console.log(allowedCorsFileUrl);

const downloadedFileUrl = "../../assets/[14-02-2025]Delivery_Note_Report(1)20250217T052708310.pdf";

const docsIsTheFinal = [
  {
       uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
       fileType: "docx",
       fileName: "Demo Document",
  },
  {
       uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
       fileType: "xls",
       fileName: "Demo  Spreadsheet",
  },
  {
       uri: " https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt",
       fileType: "ppt",
       fileName: "Demo  Powerpoint",
  },
  {
       uri: ("../../assets/[14-02-2025]Delivery_Note_Report(1)20250217T052708310.pdf"),
       fileType: "pdf",
       fileName: "Javascript Function", 
  },
  {
       uri: ("../../assets/images/randomIndian-man.avif"),
       fileType: "png",
       fileName: "Image",
  },
  ];
 
const DocumentViewer: React.FC<ViewerProps> = ({ fileUrls }) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // const docs = fileUrls.map((url) => ({
  //   uri: url.replace(
  //     "https://reproquodevuksouth.blob.core.windows.net",
  //     "/product-documents"
  //   ),
  // }));

  // const docs = fileUrls.map((url) => {
  //   // Proxy the Azure Blob Storage URL
  //   const proxyUrl = url.replace(
  //     "https://reproquodevuksouth.blob.core.windows.net",
  //     "/product-documents"
  //   );

  //   // Extract file extension
  //   const extension = proxyUrl.split(".").pop()?.toLowerCase();

  //   return {
  //     uri: proxyUrl,
  //     fileType: extension,
  //     fileName: proxyUrl.split("/").pop() || "document",
  //   };
  // });

  const fileUrl = "../../assets/sample.doc";
  console.log(`Hello Man the file Url is ${fileUrl}`);

  const docs = fileUrls.map((originalUrl) => {
    const proxyPath = originalUrl.replace(
      "https://reproquodevuksouth.blob.core.windows.net/",
      "/"
    );
    const fileName =
      originalUrl.split("/").pop()?.split("?")[0] || "document.pdf";
    const fileType = getFileTypeFromUrl(originalUrl);

    return {
      uri: proxyPath,
      fileType: fileType,
      fileName: fileName,
    };
  });

  const docsTwo = fileUrls.map((url) => ({
    uri: fileUrl,
  }));

  const urlForTheFile = fileUrls[1];
  const localFile = "http://localhost:5173/assets/test-doc.docx";
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     const fileURL = URL.createObjectURL(selectedFile);
  //     setDocs([{ uri: fileURL }]);
  //   }
  // };

  const docsThreeTesting = [
    {
      uri: `http://localhost:5000/proxy?url=${encodeURIComponent(localFile)}`,
    },
    
  ];

  return (
    <div >
      {/* <input type="file" onChange={handleFileChange} /> */}
      <DocViewer
        documents={docsIsTheFinal}
        pluginRenderers={DocViewerRenderers}
        style={{ height: "600px", width: "100%", border: "1px solid #ccc" }}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
      />
      {/* <Worker workerUrl="../../../public/pdf.worker.min.js">
        {docs.length > 0 ? (
          <Viewer
            fileUrl={docs[0].uri}
            plugins={[defaultLayoutPluginInstance]}
          />
        ) : (
          <div>No PDF available</div>
        )}
      </Worker> */}
    </div>
  );
};

export default DocumentViewer;
