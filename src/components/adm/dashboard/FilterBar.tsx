"use client";

import { FC } from "react";
import { Space, Segmented, DatePicker, Input } from "antd";
import { RideFilterParams } from "@/types/ride";
import dayjs from "dayjs";

interface IProps {
  changeFilter: (key: keyof RideFilterParams, value: string | null) => void;
}

const FilterBar: FC<IProps> = ({ changeFilter }) => {
  return (
    <div className="mb-4 flex justify-between gap-2">
      <Space className="max-w-[70%]" wrap>
        <Segmented
          onChange={(status) => changeFilter("status", status)}
          options={[
            { label: "None", value: null },
            { label: "Cancelled", value: "cancelled" },
            { label: "Completed", value: "completed" },
            { label: "In Progress", value: "in-progress" },
            { label: "Pending", value: "pending" },
          ]}
        />
        <DatePicker.RangePicker
          onChange={(dates) => {
            if (!dates) return changeFilter("dateRange", null);
            const formattedDate = `${dayjs(dates[0]).format(
              "YYYY-MM-DD",
            )},${dayjs(dates[0]).format("YYYY-MM-DD")}`;
            changeFilter("dateRange", formattedDate);
          }}
        />
        {/* Search driver and multiple select in here */}
      </Space>
      <Input.Search
        onSearch={(value) => changeFilter("search", value)}
        className="max-w-xs"
        placeholder="Search by Customer, Driver, Booking ID"
      />
    </div>
  );
};

export default FilterBar;
