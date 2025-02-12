"use client";

import { Ride, RideFilterParams, RideResponse } from "@/types/ride";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import FilterBar from "./FilterBar";
import { RideService } from "@/services/ride.service";
import toast from "react-hot-toast";
import { PAGINATION_LIMIT } from "@/config/01.constants";
import { useLoading } from "@/hooks/useLoading";

interface IProps {
  ridesSSR: RideResponse | null;
}

const statusConfig = {
  completed: {
    color: "success",
    icon: <CheckCircleOutlined />,
  },
  cancelled: {
    color: "error",
    icon: <CloseCircleOutlined />,
  },
  pending: {
    color: "warning",
    icon: <ExclamationCircleOutlined />,
  },
  "in-progress": {
    color: "processing",
    icon: <SyncOutlined spin />,
  },
};

const columns = [
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
        <a>Delete</a>
        <a>View {record.id}</a>
      </Space>
    ),
  },
];

const RideList: FC<IProps> = ({ ridesSSR }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const isFirstRender = useRef(true); // skip fetch data in first time
  const [rideData, setRideList] = useState<RideResponse | null>(ridesSSR);
  const [filterData, setFilterData] = useState<RideFilterParams>({
    status: null,
    dateRange: null,
    search: null,
    page: 1,
    limit: PAGINATION_LIMIT,
  });

  const changeFilter = useCallback(
    async (key: keyof RideFilterParams, value: string | null) => {
      startLoading();
      setFilterData((prev) => ({ ...prev, page: 1, [key]: value }));
    },
    [startLoading]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchRides = async () => {
      // NOTE: Simulate delay 1s to view loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const rideResponse = await RideService.getRides(filterData).then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
        return res.data;
      });
      stopLoading();
      setRideList(rideResponse);
    };
    fetchRides();
  }, [filterData, stopLoading]);

  return (
    <>
      <FilterBar loading={isLoading} changeFilter={changeFilter} />
      <Table
        rowKey={(r) => r.id}
        dataSource={rideData?.items || []}
        columns={columns}
        loading={isLoading}
        bordered
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
          },
        }}
        pagination={{
          total: rideData?.extras.totalItems,
          current: filterData.page,
          pageSize: filterData.limit,
          onChange(page) {
            setFilterData((prev) => ({ ...prev, page }));
          },
        }}
      />
    </>
  );
};

export default memo(RideList);
