import * as signalR from "@microsoft/signalr";

const hubUrl = "http://localhost:5259/posthub";

let connection: signalR.HubConnection | null = null;

export const createPostHubConnection = (): signalR.HubConnection => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();
  }

  return connection;
};
