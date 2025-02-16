import { useSocketStore } from "@/store/useSocketStore";
import useUserStore from "@/store/useUserStore";
import { AuditOutlined, SyncOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Space } from "antd";
import { FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const HeadingBar: FC = () => {
  const { user } = useUserStore();
  const { isConnected, socketData } = useSocketStore();
  const [open, setOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (!socketData) return;

    if (["ride-create", "ride-update-status"].includes(socketData.type)) {
      setLogs((prev) => [socketData.data, ...prev]);
    }

    if (socketData.userId !== user?.id.toString()) {
      toast.success(socketData.data);
    }
  }, [socketData, user?.id]);

  return (
    <div className="flex grow justify-between items-center gap-4">
      {isConnected ? (
        <Space>
          <SyncOutlined style={{ color: "#16a34a" }} spin />
          <span className="text-green-600">WebSocket running!</span>
        </Space>
      ) : (
        <Badge
          status="error"
          text={<span className="text-red-500">WebSocket disconnected!</span>}
        />
      )}
      <div className="px-10">
        <Badge size="small" count={logs.length}>
          <Button onClick={() => setOpen(true)}>
            <AuditOutlined style={{ fontSize: 18 }} />
          </Button>
        </Badge>
      </div>
      <Drawer title="Activity Logs" onClose={() => setOpen(false)} open={open}>
        <Space direction="vertical" size={16}>
          {logs.map((value, i) => (
            <Badge key={i} status="success" text={value} />
          ))}
        </Space>
      </Drawer>
    </div>
  );
};

export default memo(HeadingBar);
