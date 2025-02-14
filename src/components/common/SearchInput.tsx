import { useLoading } from "@/hooks/useLoading";
import { Empty, Select, SelectProps, Spin } from "antd";
import _debounce from "lodash/debounce";
import { FC, useMemo, useRef, useState } from "react";

type TProps = SelectProps & {
  callback: (newValue: string) => Promise<SelectProps["options"]>;
};

const SearchInput: FC<TProps> = ({ callback, ...props }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const fetchRef = useRef(0);

  const handleSearch = useMemo(() => {
    const loadOptions = (newValue: string) => {
      if (!newValue) return setOptions([]);
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      startLoading();

      // allow fetch api from out of component
      callback(newValue).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions as SelectProps["options"]);
        stopLoading();
      });
    };

    return _debounce(loadOptions, 800);
  }, [callback, startLoading, stopLoading]);

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={
        isLoading ? (
          <Spin size="small" />
        ) : (
          <Empty
            styles={{ image: { height: 30 } }}
            image={Empty.PRESENTED_IMAGE_DEFAULT}
          />
        )
      }
      {...props}
      options={options}
    />
  );
};

export default SearchInput;
