"use client";

import { Ride, RideFilterParams, RideResponse } from "@/types/ride";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import {
  FC,
  Key,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import FilterBar from "./FilterBar";
import { RideService } from "@/services/ride.service";
import toast from "react-hot-toast";
import { PAGINATION_LIMIT, StatusRecord } from "@/config/01.constants";
import { useLoading } from "@/hooks/useLoading";
import RideDetailModal from "./RideDetailModal";
import RideCreateModal from "./RideCreateModal";
import useUserStore from "@/store/useUserStore";
import _includes from "lodash/includes";
import { useSocketStore } from "@/store/useSocketStore";
import { WSService } from "@/services/ws.service";
import { getStatusLabel } from "@/utils/getStatusLabel";

interface IProps {
  ridesSSR: RideResponse | null;
}

export const statusConfig = {
  [StatusRecord.COMPLETED.value]: {
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  [StatusRecord.CANCELLED.value]: {
    color: "error",
    icon: <CloseCircleOutlined />,
  },
  [StatusRecord.PENDING.value]: {
    color: "warning",
    icon: <ExclamationCircleOutlined />,
  },
  [StatusRecord.IN_PROGRESS.value]: {
    color: "processing",
    icon: <SyncOutlined spin />,
  },
};

const RideList: FC<IProps> = ({ ridesSSR }) => {
  const { pers, user } = useUserStore();
  const { socketData, isConnected } = useSocketStore();
  const { isLoading, startLoading, stopLoading } = useLoading(true);
  const [rideData, setRideList] = useState<RideResponse | null>(ridesSSR);
  const [filterData, setFilterData] = useState<RideFilterParams>({
    status: null,
    dateRange: null,
    search: null,
    page: 1,
    limit: PAGINATION_LIMIT,
  });
  const [selectedRideIds, setSelectedRideIds] = useState<Key[]>([]);

  const changeFilter = useCallback(
    async (key: keyof RideFilterParams, value: string | null) => {
      startLoading();
      setFilterData((prev) => ({ ...prev, page: 1, [key]: value }));
    },
    [startLoading],
  );

  const fetchRides = useCallback(() => {
    startLoading();
    RideService.getRides(filterData)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          setRideList(res.data);
        }
      })
      .finally(() => stopLoading());
  }, [filterData, startLoading, stopLoading]);

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
      },
      {
        title: "Driver",
        dataIndex: "driver",
        key: "driver",
        render: (driver: { name: string }) => driver?.name || "N/A",
      },
      {
        title: "Pick up",
        dataIndex: "pickup",
        key: "pickup",
      },
      {
        title: "Destination",
        dataIndex: "destination",
        key: "destination",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_: unknown, { status }: Ride) => {
          const config = statusConfig[status];
          return (
            <Tag icon={config.icon} color={config.color} key={status}>
              {getStatusLabel(status)}
            </Tag>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: Ride) => (
          <Space size="middle">
            <RideDetailModal reloadList={fetchRides} id={record.id} />
          </Space>
        ),
      },
    ],
    [fetchRides],
  );

  const broadcastAction = useCallback(() => {
    if (!isConnected) return fetchRides();
    WSService.broadcast({
      userId: user?.id.toString(),
      type: "ride-delete",
      data: null,
    })
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => {
        toast.success("Delete booking successfully");
      });
  }, [fetchRides, isConnected, user?.id]);

  // delete feature
  const deleteButton = useMemo(
    () =>
      _includes(pers, "delete") && (
        <Button
          danger
          loading={isLoading}
          onClick={() => {
            if (!selectedRideIds.length)
              return toast.error("No booking selected");
            startLoading();
            RideService.delete(selectedRideIds.join(",")).then((res) => {
              if (res.error) {
                toast.error(res.error);
              } else {
                broadcastAction();
              }
            });
          }}
        >
          Delete
        </Button>
      ),
    [broadcastAction, isLoading, pers, selectedRideIds, startLoading],
  );
  const deleleConfig = useMemo(
    () =>
      _includes(pers, "delete")
        ? {
            onChange: (selectedRowKeys: Key[]) =>
              setSelectedRideIds(selectedRowKeys),
          }
        : undefined,
    [pers],
  );

  // create feature
  const createButton = useMemo(
    () =>
      _includes(pers, "create") && <RideCreateModal reloadList={fetchRides} />,
    [pers, fetchRides],
  );

  useEffect(() => {
    fetchRides();
  }, [fetchRides, filterData]);

  useEffect(() => {
    if (!socketData) return;
    if (
      ["ride-create", "ride-delete", "ride-update-status"].includes(
        socketData.type,
      )
    ) {
      fetchRides();
    }
  }, [fetchRides, socketData]);

  return (
    <>
      <div className="flex items-end justify-between gap-2">
        <FilterBar loading={isLoading} changeFilter={changeFilter} />
        <Space>
          {deleteButton}
          {createButton}
        </Space>
      </div>
      <Table
        rowKey={(r) => r.id}
        dataSource={rideData?.items || []}
        columns={columns}
        loading={isLoading}
        bordered
        rowSelection={deleleConfig}
        pagination={{
          total: rideData?.extras.totalItems,
          current: filterData.page,
          pageSize: filterData.limit,
          onChange(page) {
            startLoading();
            setFilterData((prev) => ({ ...prev, page }));
          },
        }}
      />
    </>
  );
};

export default memo(RideList);
