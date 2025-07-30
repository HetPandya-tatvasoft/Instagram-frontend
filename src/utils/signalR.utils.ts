import * as signalR from "@microsoft/signalr";
import { getAuthToken } from "./cookie.utils";

const hubUrl = "http://localhost:5259/posthub";
const notificationHubUrl = "http://localhost:5259/notificationhub";

let postConnection: signalR.HubConnection | null = null;
let notificationConnection: signalR.HubConnection | null = null;

export const createPostHubConnection = (): signalR.HubConnection => {
  if (!postConnection) {
    postConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  return postConnection;
};

export const createNotificationHubConnection = (): signalR.HubConnection => {
  if (!notificationConnection) {
    notificationConnection = new signalR.HubConnectionBuilder()
      .withUrl(notificationHubUrl, {
        accessTokenFactory : () => getAuthToken() || "",
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  return notificationConnection;
};
