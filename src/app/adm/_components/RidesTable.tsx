'use client'

import { Ride } from "@/types/ride"
import { Table } from "antd";
import { FC } from "react"

interface IProps {
  listRides: Ride[];
}

const columns = [
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Driver',
    dataIndex: 'driver',
    key: 'driver',
    render: (driver: { name: string }) => driver?.name || 'N/A'
  },
  {
    title: 'Pick up',
    dataIndex: 'pickup',
    key: 'pickup',
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const RidesTable: FC<IProps> = ({ listRides }) => {
  console.log('listRides', listRides);
  return (
    <Table rowKey={r => r.id} dataSource={listRides} columns={columns} />
  )
};

export default RidesTable;