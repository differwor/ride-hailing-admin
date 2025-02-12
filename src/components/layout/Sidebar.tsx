"use client";

import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/app/_context/AuthContext";
import { AuthService } from "@/services/auth.service";
import {
  DashboardOutlined,
  TruckOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { profile } = useAuth();

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/auth/login");
    toast.success("Logout successfully");
  };

  return (
    <div className="h-full flex flex-col justify-between border-e border-[#0505050f]">
      <div className="">
        <p className="p-5 text-center">{profile?.role} PANEL</p>
        <Menu
          theme="light"
          onClick={(e) => router.push(e.key)}
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: "/adm",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/adm/driver",
              icon: <TruckOutlined />,
              label: "Manage driver",
            },
            {
              key: "/adm/permission",
              icon: <SecurityScanOutlined />,
              label: "Permission",
            },
            {
              key: "/adm/profile",
              icon: <UserOutlined />,
              label: "Profile",
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
