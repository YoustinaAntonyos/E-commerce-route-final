import ProfileScreen from "@/features/profile/screens/ProfileScreen";
import MyAddress from "@/features/profile/component/MyAddress";

export default function ProfilePage() {

  return (
    <>
    <ProfileScreen section="addresses" />
    <MyAddress showProfileHeader={false} />
    </>
  );
}
