import { FC, memo } from "react";
import { Space, Segmented, DatePicker, Input } from "antd";
import { RideFilterParams } from "@/types/ride";
import dayjs from "dayjs";
import { StatusRecord } from "@/config/01.constants";

interface IProps {
  loading: boolean;
  changeFilter: (key: keyof RideFilterParams, value: string | null) => void;
}

const FilterBar: FC<IProps> = ({ loading, changeFilter }) => {
  return (
    <div className="flex flex-col gap-2">
      <Input.Search
        disabled={loading}
        onSearch={(value) => changeFilter("search", value)}
        className="max-w-xs"
        placeholder="Search by Customer, Driver, Booking ID"
      />
      <Space wrap>
        <Segmented
          disabled={loading}
          onChange={(status) => changeFilter("status", status)}
          options={[
            { label: "None", value: null },
            ...Object.values(StatusRecord),
          ]}
        />
        <DatePicker.RangePicker
          allowEmpty
          disabled={loading}
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
    </div>
  );
};

export default memo(FilterBar);
