import React from "react";
import { Range, RangeKeyDict } from "react-date-range";
import Calender from "../inputs/Calender";
import { Button } from "../ui/button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}: ListingReservationProps) => {
  return (
    <div
      className={
        "bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden"
      }
    >
      <div className={"flex flex-row items-center gap-1 p-4"}>
        <div className={"text-2xl font-semibold"}>
          <p>$ {price}</p>
        </div>
        <div className={"font-light text-neutral-600"}>
          <p>night</p>
        </div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        onChange={(value) => {
          onChangeDate(value.selection);
        }}
        disabledDates={disabledDates}
      />
      <hr />
      <div className={"p-4"}>
        <Button
          variant={"destructive"}
          className={"w-full"}
          disabled={disabled}
          onClick={onSubmit}
        >
          Reserve
        </Button>
      </div>
      <div
        className={
          "p-4 flex flex-row items-center justify-between font-semibold text-lg"
        }
      >
        <div>
          <p>Total</p>
        </div>
        <div>
          <p>$ {totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
