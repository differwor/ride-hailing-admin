import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { profile } = useAuth();
  return (
    <div>
      Profile {profile?.name}
    </div>
  )
}

export default Profile;