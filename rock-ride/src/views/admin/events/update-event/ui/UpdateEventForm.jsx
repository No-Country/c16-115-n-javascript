import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDemographic } from "@/hooks/useDemographic"
import { yupResolver } from "@hookform/resolvers/yup";
import { newEventSchema } from "@/schemas/validationSchema";
import { IoCloudUpload } from "react-icons/io5";
import { createNewEvent, getEventById } from "@/fetch/eventsAdmin";
import { useParams } from "react-router-dom";
import { formateDateUpdate } from "../../../../../utils/formateDate";
import { addressNameNumber } from "../../../../../helpers/functions";





export const UpdateEventForm = () => {

  const { id } = useParams()
  


  const {
    countries,
    provinces,
    cities,
    selectedCountry,
    selectedProvince,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    setSelectedCountry,
    setSelectedProvince
  } = useDemographic()

  const handleCountryChange = (event) => {
    const country = event.target.value;
    const countryCode = JSON.parse(country).iso2;
    setSelectedCountry(countryCode);
  }

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    const provinceCode = JSON.parse(province).iso2;
    setSelectedProvince(provinceCode);
  }

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)


  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      date: "",
      country: "",
      province: "",
      city: "",
      streetName: "",
      streetNumber: "",
      img: null,
    },
    resolver: yupResolver(newEventSchema)
  });

  watch('img')


  const img = getValues('img')



  useEffect(() => {

    setLoading(true)
    const getEvent = async () => {
      const event = await getEventById(id)
      
      if (event.ok) {

        const { name, date, address, category, img } = event.event;

        const { streetName, streetNumber } = addressNameNumber(address)
  
        setValue('name', name)
        setValue('date', formateDateUpdate(date))
        setValue('category', category)
        setValue('streetName', streetName)
        setValue('streetNumber', streetNumber)
        setValue('img', img)
        
      } else {
        alert(event.message)
      }
      setLoading(false)

    }

    getEvent()

  }, [id, setValue])

  
  const handleImgClick = () => {
    document.querySelector("#upload-input").click();
  };

  const onSubmit = async (data) => {
    setLoading(true)

 
    const { country, province, ...rest } = data

    const formateData = {
      ...rest,
      country: JSON.parse(country).name,
      province: JSON.parse(province).name,
    }



    const formData = new FormData();

    formData.append('name', formateData.name);
    formData.append('category', formateData.category);
    formData.append('date', formateData.date);
    formData.append('country', formateData.country);
    formData.append('province', formateData.province);
    formData.append('city', formateData.city);
    formData.append('streetName', formateData.streetName);
    formData.append('streetNumber', formateData.streetNumber);
    formData.append('img', formateData.img[0]);


    console.log(Array.from(formData.entries()));


    const result = await createNewEvent(formData)
    console.log(result);
    if (!result.ok) {
      setErrorMessage(result.message)
      setLoading(false)
      return
    }

    setLoading(false)
    reset()
    // const formData = new FormData();

  }

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:grid-cols-2 sm:gap-6"
    >
      <div className="w-full">

      <div className="flex flex-col mb-5">
          <span>Nombre del evento</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("name")}
          />
          {errors.name?.type !== undefined && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>Fecha</span>
          <input
            type="date"
            className="p-2 border rounded-md bg-gray-200"
            {...register("date", { defaultValue: formateDateUpdate(event.date)})}
          />
          {errors.date?.type !== undefined && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>País</span>
          <select
            disabled={loadingCountries}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('country', { required: true, onChange: handleCountryChange })}
          >
            <option value="">[ Seleccione ]</option>
            {
              countries.map(country => (
                <option key={country.id} className="text-gray-800" value={JSON.stringify(country)}>{country.name}</option>
              ))
            }
          </select>
          {errors.country?.type !== undefined && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>Provincia</span>
          <select
            disabled={loadingProvinces || selectedCountry === ''}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('province', { required: true, onChange: handleProvinceChange })}
          >
            <option value="">[ Seleccione ]</option>
            {
              provinces.map(province => (
                <option key={province.id} className="text-gray-800" value={JSON.stringify(province)}>{province.name}</option>
              ))
            }
          </select>
          {errors.province?.type !== undefined && (
              <p className="text-red-500">{errors.province.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>Ciudad</span>
          <select
            disabled={loadingCities || selectedProvince === ''}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('city')}
          >
            <option value="">[ Seleccione ]</option>
            {
              cities.map(city => (
                <option key={city.id} className="text-gray-800" value={city.name}>{city.name}</option>
              ))
            }
          </select>
          {errors.city?.type !== undefined && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
        </div>

        <div className="flex justify-between mb-5">
          <div className="flex flex-col w-[65%]">
            <label htmlFor="streetName">Calle o Lugar</label>
            <input
              autoComplete="streetName"
              className={
                clsx(
                  "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                  {
                    'focus:outline-red-500 border-red-500': errors.streetName
                  }
                )
              }
              type="text"
              {...register("streetName")}
              aria-invalid={errors.streetName ? "true" : "false"}
            />
            {errors.streetName?.type !== undefined && (
              <p className="text-red-500">{errors.streetName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="streetNumber">N°</label>
            <input
              autoComplete="streetNumber"
              className={
                clsx(
                  "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                  {
                    'focus:outline-red-500 border-red-500': errors.streetNumber
                  }
                )
              }
              type="text"
              {...register("streetNumber")}
              aria-invalid={errors.streetNumber ? "true" : "false"}
            />
            {errors.streetNumber?.type !== undefined && (
              <p className="text-red-500">{errors.streetNumber.message}</p>
            )}
          </div>
        </div>


      </div>


      <div className="w-full">
        
        <div className="flex flex-col justify-between mb-5">
          <span>Categoría</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("category")}
          >
            <option value="">[Seleccione]</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="reggae">Reaggae</option>
            <option value="metal">Metal</option>
          </select>
          {errors.category?.type !== undefined && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
        </div>


        <div className="flex flex-col mb-6">
          <span>Portada</span>

         
          <div 
            onClick={handleImgClick}
            className="aspect-video cursor-pointer overflow-hidden rounded flex items-center justify-center"
          >
              {
               img && img[0]
                  ? (
                    <div className={"bg-slate-300 rounded relative flex items-center justify-center bg-[url()]"}>
                      <img className="object-cover  h-full w-full" src={typeof(img) === 'string' ? img : URL.createObjectURL(img[0]) || event.img} alt="event-img" />
                      <IoCloudUpload size={100} className="opacity-90 absolute inset-50 text-white text-[80px] lg:text-[100px]" />
                    </div>
                  ) : (
                    <div className="bg-slate-300 w-full h-full rounded flex flex-col items-center justify-center">
                    <IoCloudUpload className="opacity-90 text-white text-[80px] lg:text-[100px]" />
                    <p className="text-slate-800 font-semibold text-base sm:text-sm lg:text-base">Click para elegir una portada</p>
                    <p className="xs:text-base sm:text-sm lg:text-base">( Se recomienda utilizar un formato 16/9 )</p>
                  </div>
                )
              }
          </div>
       
          <input
            id="upload-input"
            type="file"
            hidden
            {...register("img")}
            className="p-2 border rounded-md bg-gray-200"
            accept="*"
          />

          {errors.img?.type !== undefined && (
            <p className="text-red-500">{errors.img.message}</p>
          )}
         
        </div>


        <button
          type="submit"
          disabled={loading}
          className={
            clsx(
              "w-full",
              {
                "btn-primary": !loading,
                "btn-disabled": loading
              }
            )
          }>
          Crear
        </button>

        <span className="text-red-500">{errorMessage}</span>
      </div>

    </form>
  )
}