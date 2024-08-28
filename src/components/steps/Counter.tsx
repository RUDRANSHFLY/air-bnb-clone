import { MinusSignIcon, PlusSignIcon } from "hugeicons-react";
import React, { useCallback } from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ onChange, subtitle, title, value }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className={"flex flex-row items-center justify-between"}>
      <div className={"flex flex-col"}>
        <div className={"font-medium"}>
          <h2>{title}</h2>
        </div>
        <div className={"font-light text-gray-600"}>
          <h2>{subtitle}</h2>
        </div>
      </div>
      <div className={"flex flex-row gap-4 items-center"}>
        <div
          onClick={onReduce}
          className={
            "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition-colors"
          }
        >
          <MinusSignIcon />
        </div>
        <div className="font-light text-xl text-neutral-600">
          <h2>{value}</h2>
        </div>
        <div
          onClick={onAdd}
          className={
            "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition-colors"
          }
        >
          <PlusSignIcon />
        </div>
      </div>
    </div>
  );
};

export default Counter;
