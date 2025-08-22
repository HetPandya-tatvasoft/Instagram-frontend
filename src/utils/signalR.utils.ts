import * as signalR from "@microsoft/signalr";
import { getAuthToken } from "./cookie.utils";

const hubUrl = "http://localhost:5259/posthub";
const notificationHubUrl = "http://localhost:5259/notificationhub";
const chatHubUrl = "http://localhost:5259/chathub";

let postConnection: signalR.HubConnection | null = null;
let notificationConnection: signalR.HubConnection | null = null;
let chatHubConnection: signalR.HubConnection | null = null;

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
        accessTokenFactory: () => getAuthToken() || "",
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  return notificationConnection;
};

export const createChatHubConnection = (): signalR.HubConnection => {
  if (!chatHubConnection) {
    chatHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(chatHubUrl, {
        accessTokenFactory: () => getAuthToken() || "",
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  return chatHubConnection;
};
