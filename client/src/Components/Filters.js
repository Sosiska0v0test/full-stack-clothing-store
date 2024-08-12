import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {
  SizeData,
  GenderData,
  RatesData,
  PriseData,
  MaterialData,
} from "../Data/FilterData";

function Filters(props) {
  const {
    categories,
    category,
    setCategory,
    gender,
    setGender,
    size,
    setSize,
    material,
    setMaterial,
    prise,
    setPrise,
    rates,
    setRates,
    showFilters,
  } = props?.data;

  const Filter = [
    {
      value: gender,
      onChange: setGender,
      items: GenderData,
    },
  ];

  const AdditionalFilters = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "Усі категорії" }, ...categories]
          : [{ title: "Категорій не знайдено" }],
    },
    {
      value: size,
      onChange: setSize,
      items: SizeData,
    },
    {
      value: material,
      onChange: setMaterial,
      items: MaterialData,
    },
    {
      value: prise,
      onChange: setPrise,
      items: PriseData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];

  return (
    <div className="container mx-auto p-8">
      { !showFilters ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={ () => setGender(GenderData[1]) } className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://krasavica.info/uploads/posts/2022-06/1654038119_28-krasavica-info-p-milii-stil-odezhdi-devushka-krasivo-foto-28.jpg"
                alt="Woman"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для жінок
              </div>
            </div>
          </div>
          <div onClick={ () => setGender(GenderData[2]) } className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://i.pinimg.com/originals/19/1c/d7/191cd749fb562e5a3d9b2b4f2efa8947.png"
                alt="Man"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для чоловіків
              </div>
            </div>
          </div>
          <div onClick={ () => setGender(GenderData[3]) } className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://sportishka.com/uploads/posts/2022-11/1667677932_1-sportishka-com-p-detskaya-sportivnaya-odezhda-instagram-1.jpg"
                alt="Child"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-6">
                Для дітей
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-6 bg-dry border text-mainText border-main grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
          { AdditionalFilters.map((item, index) => (
            <Listbox key={ index } value={ item.value } onChange={ item.onChange }>
              <div className="relative">
                <Listbox.Button className="relative w-full text-mainText bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
                  <span className="block truncate">{ item.value.title }</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                    <FaAngleDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={ Fragment }
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-mainText border hover text-mainText rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus">
                    { item.items.map((iterm, i) => (
                      <Listbox.Option
                        key={ i }
                        className={ ({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-subMain text-main" : "text-main"
                          }`
                        }
                        value={ iterm }
                      >
                        { ({ selected }) => (
                          <>
                            <span
                              className={ `block truncate ${selected ? "font-semibold" : "font-normal"
                                }` }
                            >
                              { iterm.title }
                            </span>
                            { selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaCheck className="h-3 w-3" aria-hidden="true" />
                              </span>
                            ) : null }
                          </>
                        ) }
                      </Listbox.Option>
                    )) }
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          )) }
        </div>
      ) }
    </div>
  );
}

export default Filters;
