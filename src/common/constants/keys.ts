export const coookieKeys = {
    authToken: "auth_token",
};

export const claims = {
    email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    userName: "Username",
    userID : "UserId",
    contactNumber : "ContactNumber",
    fullName : "FullName",
    dob : "DateOfBirth",
    gender: "Gender",
    profilePicture: "ProfilePicture",
    avatarUrl: "AvatarUrl",
};

export const headerKeys = {
    authorization : "Authorization",
    bearerPrefix : "Bearer",
};


export const tanstackQueryKeys = {
    getNotificationsListKey : "notifications-list-forPage",
    getHomeFeed : "home-feed",
    getSearchUserResult : "search-users",
    getUserStoriesKey : "user-story-list",
    getStoriesForHome : "home-stories",
    getPostDetails : "post-details",
    getUserPosts : "user-posts",
    getUserProfile : "getUserProfile",
    getUserInfoProfile : "user-info",
    getUserFollowing : "user-following",
    getUserFollower : "user-followers",
    getFollowStatus : "follow-status",
    getUserHighlights : "get-user-highlights",
    getUserCollections : "get-user-collections",
    getCollectionDetails : "get-collection-details"
};

export const HubMessages = {
    postReceived : "ReceivedPosts",
    postInteraction : "PostInteraction",
    notificationReceived : "ReceiveNotification", 
}