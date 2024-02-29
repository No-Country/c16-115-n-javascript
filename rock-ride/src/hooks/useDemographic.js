import { useEffect, useState } from "react";

import { getAllCountries, getCitiesByProvince, getProvincesByCountry } from "../fetch/getCountryStateCity";


export const useDemographic = () => {

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const countriesData = await getAllCountries();
        setCountries(countriesData);
        
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };
  
    fetchCountries();

  }, []);


  useEffect(() => {
  
    const fetchProvinces = async () => {
      if (selectedCountry !== '') {
        try {
          setLoadingProvinces(true);
          const provincesData = await getProvincesByCountry(selectedCountry);
          setProvinces(provincesData);
        } catch (error) {
          console.error("Error fetching provinces:", error);
        } finally {
          setLoadingProvinces(false);
        }
      } 
    }
  
    fetchProvinces()

  },[selectedCountry])
  

 
  useEffect(() => {


    const fetchCities = async () => {
      try {
        setLoadingCities(true)
        if (selectedCountry !== '' && selectedProvince !== '') {
          const cities = await getCitiesByProvince(selectedCountry, selectedProvince)
          setCities(cities)
        }
      } catch (error) {
        console.error("Error fetching cities: ", error);
      } finally {
        setLoadingCities(false)
      }
    }

    fetchCities()
  }, [selectedCountry, selectedProvince])



  return {
    countries,
    provinces,
    cities,
    selectedCountry,
    selectedProvince,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    setSelectedCountry,
    setSelectedProvince,
  }
}