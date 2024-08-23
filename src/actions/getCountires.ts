import { Label } from "@radix-ui/react-label";
import countries from "world-countries";

const formattedCountry = countries.map((country) => ({
  value: country.cca2,
  Label: country.name.common,
  flag: country.flag,
  lating: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountry;

  const getByValue = (value: string) => {
    return formattedCountry.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
