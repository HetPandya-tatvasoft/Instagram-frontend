import { IUserBio } from "../types/profile.types";

interface IProfileBioProps {
  profileBio: IUserBio;
}

const ProfileBio: React.FC<IProfileBioProps> = ({ profileBio }) => {
  return (
    <div className="mt-4 text-sm">
      <p className="font-semibold">{profileBio.name}</p>
      {profileBio != null && <p>{profileBio.profileBio}</p>}
    </div>
  );
};

export default ProfileBio;
