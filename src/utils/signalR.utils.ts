import * as signalR from "@microsoft/signalr";

const hubUrl = "http://localhost:5259/posthub";

export const postHubConnection = new signalR.HubConnectionBuilder()
  .withUrl(hubUrl, {
    withCredentials: true,
  })
  .withAutomaticReconnect()
  .build();
