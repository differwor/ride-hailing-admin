import { StatusArray } from "@/config/01.constants";
import { useLoading } from "@/hooks/useLoading";
import { RideService } from "@/services/ride.service";
import { Ride } from "@/types/ride";
import { Button, Form, Input, Modal, Rate, Segmented, Switch, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, memo, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { statusConfig } from "./RideList";
import SearchSelect from "@/components/common/SearchSelect";
import { DriverService } from "@/services/driver.service";
import useUserStore from "@/store/useUserStore";
import _includes from "lodash/includes";
import { WSService } from "@/services/ws.service";
import { useSocketStore } from "@/store/useSocketStore";
import { getStatusLabel } from "@/utils/getStatusLabel";

interface IProps {
  id: number;
  reloadList: () => void;
}

const RideDetailModal: FC<IProps> = ({ id, reloadList }) => {
  const { pers, user } = useUserStore();
  const { isConnected } = useSocketStore();
  const [form] = Form.useForm();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [rideDetail, setRideDetail] = useState<Ride | null>(null);

  const broadcastAction = useCallback(
    (oldStatus: string | undefined, newStatus: string | undefined) => {
      if (!isConnected) return reloadList();
      WSService.broadcast({
        userId: user?.id.toString(),
        type: "ride-update-status",
        data: `Booking status updated from ${oldStatus} to ${newStatus} by ${user?.name}`,
      }).then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
      });
    },
    [isConnected, reloadList, user],
  );

  const updateRide = useCallback(
    (newValues: Partial<Ride> & { driver: { value: number } }) => {
      startLoading();
      RideService.update(id, {
        ...newValues,
        driverId: newValues?.driver.value,
      })
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Update booking successfully");
            if (newValues.status !== rideDetail?.status) {
              broadcastAction(
                getStatusLabel(rideDetail?.status),
                getStatusLabel(newValues.status),
              );
            } else {
              reloadList();
            }
          }
        })
        .finally(() => {
          setEditable(false);
          stopLoading();
          setOpen(false);
        });
    },
    [
      startLoading,
      id,
      rideDetail?.status,
      broadcastAction,
      reloadList,
      stopLoading,
    ],
  );

  const openModal = useCallback(() => {
    startLoading();
    RideService.getById(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          setRideDetail(res.data);
          setOpen(true);
        }
      })
      .finally(() => stopLoading());
  }, [id, startLoading, stopLoading]);

  const closeModal = useCallback(() => {
    setEditable(false);
    setOpen(false);
  }, []);

  const switchMode = useCallback(() => {
    setEditable((prev) => !prev);
    if (!editable) return;
  }, [editable]);

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

  const canEditing = useCallback(
    (key: string) => editable && _includes(pers, key),
    [editable, pers],
  );

  const config = useMemo(
    () => statusConfig[rideDetail?.status || "in-progress"],
    [rideDetail?.status],
  );

  return (
    <>
      <Button
        className=" pl-0"
        color="primary"
        variant="filled"
        onClick={openModal}
      >
        Detail
      </Button>
      <Modal
        open={open}
        title={`Booking information: ${rideDetail?.id}`}
        onCancel={closeModal}
        footer={false}
      >
        <div className="pb-2 flex gap-2">
          <p>Mode:</p>
          <Switch
            checked={editable}
            checkedChildren="Update"
            unCheckedChildren="View"
            onClick={switchMode}
          />
        </div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          disabled={isLoading}
          form={form}
          onFinish={updateRide}
          requiredMark
        >
          <div className="py-4 px-2 rounded-md border-[1px] border-slate-200 border-solid">
            <Form.Item
              label="Status"
              name="status"
              initialValue={rideDetail?.status}
            >
              {canEditing("update:status") ? (
                <Segmented size="small" options={StatusArray} />
              ) : (
                <Tag
                  icon={config.icon}
                  color={config.color}
                  key={rideDetail?.status}
                >
                  {getStatusLabel(rideDetail?.status)}
                </Tag>
              )}
            </Form.Item>
            <Form.Item
              label="Customer"
              name="customer"
              initialValue={rideDetail?.customer}
              rules={[{ required: true }]}
            >
              {canEditing("update:customer") ? (
                <Input />
              ) : (
                <p className="text-blue-400">{rideDetail?.customer}</p>
              )}
            </Form.Item>
            <Form.Item
              label="Driver"
              name="driver"
              initialValue={{
                value: rideDetail?.driver?.id,
                label: rideDetail?.driver?.name,
              }}
              rules={[{ required: true }]}
            >
              {canEditing("update:driver") ? (
                <SearchSelect callback={searchDriver} />
              ) : (
                <p className="text-blue-400">{rideDetail?.driver?.name}</p>
              )}
            </Form.Item>
            <Form.Item
              label="Pick up"
              name="pickup"
              initialValue={rideDetail?.pickup}
              rules={[{ required: true }]}
            >
              {canEditing("update:pickup") ? (
                <Input />
              ) : (
                <p className="text-blue-400">{rideDetail?.pickup}</p>
              )}
            </Form.Item>
            <Form.Item
              label="Destination"
              name="destination"
              initialValue={rideDetail?.destination}
              rules={[{ required: true }]}
            >
              {canEditing("update:destination") ? (
                <Input />
              ) : (
                <p className="text-blue-400">{rideDetail?.destination}</p>
              )}
            </Form.Item>
            <Form.Item
              label="Review"
              name="review"
              initialValue={rideDetail?.review}
            >
              {canEditing("update:review") ? (
                <TextArea rows={4} />
              ) : (
                <p className="text-blue-400">{rideDetail?.review}</p>
              )}
            </Form.Item>
            <Form.Item
              label="Rate"
              name="rating"
              initialValue={rideDetail?.rating}
            >
              <Rate disabled={!canEditing("update:rating")} />
            </Form.Item>
            <Form.Item label="Created Date">
              <p>{rideDetail?.createdDate}</p>
            </Form.Item>
          </div>
          <div className="pt-2 w-full flex justify-end gap-2">
            {editable && (
              <Button type="primary" htmlType="submit">
                Update booking
              </Button>
            )}
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default memo(RideDetailModal);
