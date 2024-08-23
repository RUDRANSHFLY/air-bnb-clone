import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useCountries from "@/actions/getCountires";

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

  const handleValueChange = (value: string) => {
    const selectedCountry = countries.find(
      (country) => country.value === value
    );
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <div>
      <Select
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
      </Select>
    </div>
  );
};

export default CountryInput;
