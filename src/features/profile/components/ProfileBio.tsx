import { UserBio } from "../types/profile.types";

interface ProfileBioProps {
  profileBio: UserBio;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ profileBio }) => {
  return (
    <div className="mt-4 text-sm">
      <p className="font-semibold">{profileBio.name}</p>
      {profileBio != null && <p>{profileBio.profileBio}</p>}
    </div>
  );
};

export default ProfileBio;
