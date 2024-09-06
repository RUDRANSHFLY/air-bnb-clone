import React from "react";
import Select from "react-select";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import useCountries from "@/actions/getCountires";
import { control } from "leaflet";

export type CountrySelectValue = {
  flag: string;
  Label: string;
  lating: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  currentCountry?: CountrySelectValue;
  onCountrySelect: (value: CountrySelectValue) => void;
}

const CountryInput = ({
  value,
  onCountrySelect,
  currentCountry,
}: CountrySelectProps) => {
  const countries = useCountries().getAll();

  const { getAll } = useCountries();

  const handleValueChange = (value: string) => {
    const selectedCountry = countries.find(
      (country) => country.value === value
    );
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <div className="text-black">
      <Select
        placeholder={"AnyWhere"}
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onCountrySelect(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className={"flex flex-row items-center gap-3"}>
            <div>{option.flag}</div>
            <div className="">
              {option.Label} ,
              <span className={"text-neutral-500 ml-1"}>{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#44e4e6",
          },
        })}
      />

      {/* <Select
        onValueChange={handleValueChange}
        value={currentCountry ? currentCountry.value : "Select your Country"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your Country">
            {currentCountry
              ? `${currentCountry.flag} ${currentCountry.Label}`
              : "Select your Country"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              <span className={"font-semibold"}>
                {country.flag} {country.Label} ,{" "}
              </span>
              <span className={"font-normal"}>{country.region}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
    </div>
  );
};

export default CountryInput;
