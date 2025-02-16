import SearchSelect from "@/components/common/SearchSelect";
import { useLoading } from "@/hooks/useLoading";
import { DriverService } from "@/services/driver.service";
import { RideService } from "@/services/ride.service";
import { WSService } from "@/services/ws.service";
import { useSocketStore } from "@/store/useSocketStore";
import useUserStore from "@/store/useUserStore";
import { Ride } from "@/types/ride";
import { Button, Form, Input, Modal } from "antd";
import { FC, memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  reloadList: () => void;
}

const RideCreateModal: FC<IProps> = ({ reloadList }) => {
  const { user } = useUserStore();
  const { isConnected } = useSocketStore();
  const [form] = Form.useForm();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [open, setOpen] = useState<boolean>(false);

  const broadcastStatus = useCallback(() => {
    if (!isConnected) return reloadList();
    WSService.broadcast({
      userId: user?.id.toString(),
      type: "ride-create",
      data: `Booking created by ${user?.name}`,
    }).then((res) => {
      if (res.error) {
        toast.error(res.error);
      }
    });
  }, [isConnected, reloadList, user]);

  const handleCreate = useCallback(
    (newValues: Partial<Ride> & { driver: { value: number } }) => {
      startLoading();
      RideService.create({
        ...newValues,
        driverId: newValues?.driver.value,
      })
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Create booking successfully");
            broadcastStatus();
          }
        })
        .finally(() => {
          form.resetFields();
          stopLoading();
          setOpen(false);
        });
    },
    [startLoading, broadcastStatus, form, stopLoading],
  );

  const searchDriver = useCallback(
    (newValue: string) =>
      DriverService.getDrivers({ search: newValue }).then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
        return (res.data?.items || []).map((r) => ({
          value: r.id,
          label: r.name,
        }));
      }),
    [],
  );

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create a booking</Button>
      <Modal
        open={open}
        title="Create a new booking"
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          disabled={isLoading}
          form={form}
          onFinish={handleCreate}
          requiredMark
        >
          <div className="py-4 px-2 rounded-md border-[1px] border-slate-200 border-solid">
            <Form.Item
              label="Customer"
              name="customer"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Driver"
              name="driver"
              rules={[{ required: true }]}
            >
              <SearchSelect callback={searchDriver} />
            </Form.Item>
            <Form.Item
              label="Pick up"
              name="pickup"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="pt-2 w-full flex justify-end gap-2">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default memo(RideCreateModal);
