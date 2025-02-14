"use client";

import useUserStore from "@/store/useUserStore";

export default function Page() {
  const { user } = useUserStore();
  return (
    <div>{user ? <div>{user.name}</div> : <div>No profile available</div>}</div>
  );
}
