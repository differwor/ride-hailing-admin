"use client";

import useUserStore from "@/store/useUserStore";
import { Badge, Col, Row } from "antd";

export default function Page() {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col gap-y-6">
      <strong className="text-4xl">Profile Information</strong>
      <Row gutter={[16, 16]}>
        <Col span={2}>Name:</Col>
        <Col span={22}>{user?.name}</Col>
        <Col span={2}>Email:</Col>
        <Col span={22}>{user?.email}</Col>
        <Col span={2}>Role:</Col>
        <Col span={22}>{user?.role}</Col>
        <Col span={2}>Permission:</Col>
        <Col span={22}>*Only for booking feature</Col>
        <Col span={2}></Col>
        <Col span={22}>
          <div className="flex flex-wrap gap-2 max-w-[400]">
            {user?.permissions.map((p, i) => (
              <Badge key={i} count={p} style={{ backgroundColor: "#52c41a" }} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
