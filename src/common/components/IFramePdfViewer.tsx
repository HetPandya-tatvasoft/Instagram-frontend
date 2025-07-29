import React from 'react';

interface PdfViewerProps {
  fileUrl: string;
}

const IframePdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  // Ensure the fileUrl is properly encoded and points to a valid PDF resource
  const encodedFileUrl = encodeURI(fileUrl);

  // Optional: Add a fallback for browsers that block PDFs in iframes
  const handleIframeError = () => {
    console.error('Failed to load PDF in iframe. Ensure the file URL is correct and accessible.');
  };

  return (
    <div style={{ height: '750px', border: '1px solid #ccc', width: '100%' }}>
      <iframe
        src={encodedFileUrl}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
        onError={handleIframeError}
        // Enable PDF rendering in browsers

      />
      {/* Fallback link if iframe fails */}
      <p style={{ textAlign: 'center' }}>
        If the PDF does not load, <a href={encodedFileUrl} target="_blank" rel="noopener noreferrer">click here to open it</a>.
      </p>
    </div>
  );
};

export default IframePdfViewer;