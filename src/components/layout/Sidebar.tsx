"use client";

import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";
import { AuthService } from "@/services/auth.service";
import {
  DashboardOutlined,
  TruckOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserStore();

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/auth/login");
    toast.success("Logout successfully");
  };

  return (
    <div className="h-full flex flex-col justify-between border-e border-[#0505050f]">
      <div className="">
        <p className="p-5 text-center">{user?.role}</p>
        <Menu
          theme="light"
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: "/adm",
              icon: <DashboardOutlined />,
              label: <Link href="/adm">Dashboard</Link>,
            },
            {
              key: "/adm/driver",
              icon: <TruckOutlined />,
              label: <Link href="/adm/driver">Manage driver</Link>,
            },
            {
              key: "/adm/permission",
              icon: <SecurityScanOutlined />,
              label: <Link href="/adm/permission">Permission</Link>,
            },
            {
              key: "/adm/profile",
              icon: <UserOutlined />,
              label: <Link href="/adm/profile">Profile</Link>,
            },
          ]}
          style={{
            borderInlineEndColor: "transparent",
          }}
        />
      </div>
      <div className="w-full p-1">
        <Button
          color="default"
          variant="dashed"
          className="w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
