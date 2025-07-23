import React, { useCallback, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import ProfileHeader from "../components/ProfileHeader";
import ProfileBio from "../components/ProfileBio";
import StoryHighlights from "../components/StoryHighlights";
import ProfilePostsSection from "../components/ProfilePostsSection";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { useGetUserMedia } from "../hooks/useGetUserMedia";
import { usePostLike } from "../../home/hooks/usePostLike";
import { UserBio } from "../types/profile.types";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { userHeaderData, isLoading, isError } = useUserProfile(userId ?? "");

  const { userMedia } = useGetUserMedia(
    userHeaderData.userHeaderInfo?.userId ?? 0
  );

  const userProfileBio: UserBio = {
    name: userHeaderData.userHeaderInfo?.fullName ?? "",
    profileBio: userHeaderData.userHeaderInfo?.bio,
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError || !userHeaderData) return <p>Something went wrong.</p>;

  if (!userHeaderData) return null;

  console.log("Hello het the profile data is as follows : ");

  console.log(userMedia);

  return (
    <MainLayout>
      {/* <h2>This will be the main profile page</h2> */}
      <div className="main-profile-container sm:max-w-2xl lg:max-w-6xl mx-auto h-screen  overflow-y-scroll scrollbar-hidden">
        <div className="flex justify-center ">
          <div className="sm:px-4 py-6 w-full">
            {/* Profile Header */}
            <ProfileHeader userInfo={userHeaderData} />

            {/* Bio */}
            <ProfileBio profileBio={userProfileBio} />

            {/* Story Highlights */}
            <StoryHighlights />

            {/* Tab Navigation */}
            <ProfilePostsSection posts={userMedia} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
