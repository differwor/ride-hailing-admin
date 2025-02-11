'use client'

import { useAuth } from "@/app/adm/_context/AuthContext";

export default function Page() {
  const { profile } = useAuth();
  console.log('asd', profile);
  return (
    <div>
      {profile ? <div>{profile.name}</div> : <div>No profile available</div>}
    </div>
  )
}