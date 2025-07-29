import type { INotificationResponse } from "../../../common/types/notificationResponse.type";
import MainLayout from "../../../layouts/MainLayout";
import {
  useGetNotifications,
  useGetNotificationsQuery,
} from "../hooks/useGetNotifications";
import { useAcceptRejectFollowRequest } from "../hooks/useAcceptRejectFollowRequest";
import { useCallback, useEffect } from "react";
import NotificationCard from "../components/NotificationCard";
import { useQueryClient } from "@tanstack/react-query";
import DocumentViewer from "../../../common/components/DocumentViewer";
import PdfViewer from "../../../common/components/PdfViewer";
import IframePdfViewer from "../../../common/components/IFramePdfViewer";
import PDFViewerOnly from "../../../common/components/ReactPdfViewer";

const NotificationsPage: React.FC = () => {
  const fileLinks = [
    "https://reproquodevuksouth.blob.core.windows.net/product-documents/[14-02-2025]Delivery_Note_Report(1)20250217T052708310.pdf?sv=2018-03-28&sr=b&sig=arZEf4XAWo1iGKIHKOPmcFV8vEKaFiTM1ec%2Bxzcnnek%3D&se=2025-07-24T04%3A50%3A50Z&sp=r",
    "../../../assets/test-doc.docx",
  ];

  const { data: notifications, isLoading } = useGetNotificationsQuery();

  const { respondToFollowRequest } = useAcceptRejectFollowRequest();

  const queryClient = useQueryClient();

  const handleRespondToFollowRequest = useCallback(
    (senderId: number, isAccepted: boolean) => {
      respondToFollowRequest({ senderId, isAccepted });
      queryClient.invalidateQueries({
        queryKey: ["notifications-list-forPage"],
      });
    },
    [queryClient, respondToFollowRequest]
  );

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <h2>Below is the pdf thing</h2>
        {/* <PdfViewer fileUrl="https://reproquodevuksouth.blob.core.windows.net/product-documents/[14-02-2025]Delivery_Note_Report(1)20250217T052708310.pdf?sv=2018-03-28&sr=b&sig=arZEf4XAWo1iGKIHKOPmcFV8vEKaFiTM1ec%2Bxzcnnek%3D&se=2025-07-24T04%3A50%3A50Z&sp=r" /> */}
        {/* <IframePdfViewer fileUrl="Resume 11AAAA_a4599983-e757-4104-9069-6bb7c120a927 (1).pdf" /> */}

        <div>
          <DocumentViewer fileUrls={fileLinks} />
          {/* <PDFViewerOnly fileUrl="https://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf" /> */}
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : notifications?.data.records.length === 0 || !notifications ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.data.records.map(
            (notification: INotificationResponse) =>
              notification ? (
                <NotificationCard
                  key={notification.notificationId}
                  notification={notification}
                  onRespond={handleRespondToFollowRequest}
                />
              ) : null
          )
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
