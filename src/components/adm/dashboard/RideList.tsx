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
  useRef,
  useState,
} from "react";
import FilterBar from "./FilterBar";
import { RideService } from "@/services/ride.service";
import toast from "react-hot-toast";
import { PAGINATION_LIMIT, StatusRecord } from "@/config/01.constants";
import { useLoading } from "@/hooks/useLoading";
import RideDetailModal from "./RideDetailModal";
import { useAuth } from "@/app/_context/AuthContext";
import RideCreateModal from "./RideCreateModal";

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
  const { isAllowed } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const isFirstRender = useRef(true); // skip fetch data in first time because it was fetched from server side
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
    [startLoading]
  );

  const fetchRides = useCallback(
    () =>
      RideService.getRides(filterData)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            setRideList(res.data);
          }
        })
        .finally(() => stopLoading()),
    [filterData, stopLoading]
  );

  const reloadRides = useCallback(() => {
    startLoading();
    fetchRides();
  }, [fetchRides, startLoading]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchRides();
  }, [fetchRides, filterData, stopLoading]);

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
              {status.toUpperCase()}
            </Tag>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_: unknown, record: Ride) => (
          <Space size="middle">
            <RideDetailModal reloadList={reloadRides} id={record.id} />
          </Space>
        ),
      },
    ],
    [reloadRides]
  );

  // delete feature
  const deleteButton = useMemo(
    () =>
      isAllowed("delete") && (
        <Button
          onClick={() => {
            if (!selectedRideIds.length) return toast.error("No booking selected");
            startLoading();
            RideService.delete(selectedRideIds.join(","))
              .then((res) => {
                if (res.error) {
                  toast.error(res.error);
                } else {
                  toast.success("Delete booking successfully");
                  fetchRides();
                }
              })
              .finally(() => {
                stopLoading();
              });
          }}
          danger
        >
          Delete
        </Button>
      ),
    [fetchRides, isAllowed, selectedRideIds, startLoading, stopLoading]
  );
  const deleleConfig = useMemo(
    () =>
      isAllowed("delete")
        ? {
            onChange: (selectedRowKeys: Key[]) =>
              setSelectedRideIds(selectedRowKeys),
          }
        : undefined,
    [isAllowed]
  );

  // create feature
  const createButton = useMemo(
    () => isAllowed("create") && <RideCreateModal reloadList={reloadRides} />,
    [isAllowed, reloadRides]
  );

  return (
    <div className="w-full flex flex-col gap-y-4">
      <strong className=" text-4xl">List bookings</strong>
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
    </div>
  );
};

export default memo(RideList);
