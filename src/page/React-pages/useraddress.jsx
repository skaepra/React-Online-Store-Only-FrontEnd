import { useState } from "react";
import { useGg } from "../../context/gg";

export const UserAddress = () => {
  const { Totals, quint } = useGg();
  const AllTotal = quint * 4 + Totals;
  const [values, setValues] = useState({
    Country: "",
    Full_name: "",
    Phone_number: "",
    Address_line_1: "",
    Address_line_2: "",
    City: "",
    Applicable: "",
    Code: "",
  });

  const onChangeHandler = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      Country: "",
      Full_name: "",
      Phone_number: "",
      Address_line_1: "",
      Address_line_2: "",
      City: "",
      Applicable: "",
      Code: "",
    });
  };

  return (
    <>
      <div className="h-screen bg-white  dark:bg-zinc-800 mt-14">
        <div className="h-auto bg-white dark:bg-zinc-800  pb-4">
          <h1 className="mb-5 text-center text-2xl font-sans dark:text-white">
            Checkout ({quint} item){" "}
          </h1>

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3  h-auto border  bg-white p-6 pb-7 shadow-md mb-9 space-y-6">
              <h1 className="m-1 font-bold text-2xl">Add a new address</h1>

              <div className="  mt-4">
                <h1 className="ml-1 mb-1">Country</h1>
                <select
                  type="radio"
                  name="Country"
                  onChange={onChangeHandler}
                  value={values.Country}
                  className=" border pl-2 bg-[#ecebeb] hover:bg-[#e6e4e4] border-[#aaaaaa] rounded w-full h-[30px] shadow-sm "
                >
                  <option className="bg-[#ecebeb]">Syria</option>
                  <option className="bg-[#ecebeb]">Usa</option>
                  <option className="bg-[#ecebeb]">China</option>
                </select>
              </div>

              <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
                <div>
                  <h1 className="ml-1 mb-1">Full name</h1>
                  <input
                    type="text"
                    name="Full_name"
                    onChange={onChangeHandler}
                    value={values.Full_name}
                    className=" border border-[#aaaaaa] bg-white  rounded pl-2 pb-[2px] w-full min-w-[280px]  h-[30px] shadow-md "
                  />
                </div>
                <div>
                  <h1 className="ml-1 mb-1">Phone number</h1>
                  <input
                    type="text"
                    name="Phone_number"
                    onChange={onChangeHandler}
                    value={values.Phone_number}
                    className=" border  border-[#aaaaaa] rounded pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>
              </div>

              <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
                <div>
                  <h1 className="ml-1 mb-1">Address line 1</h1>
                  <input
                    type="text"
                    name="Address_line_1"
                    onChange={onChangeHandler}
                    value={values.Address_line_1}
                    className=" border  border-[#aaaaaa] rounded pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>
                <div>
                  <h1 className="ml-1 mb-1">Address line 2</h1>
                  <input
                    type="text"
                    name="Address_line_2"
                    onChange={onChangeHandler}
                    value={values.Address_line_2}
                    className=" border , border-[#aaaaaa] rounded  pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>
              </div>

              <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
                <div>
                  <h1 className="ml-1 mb-1">City</h1>
                  <input
                    type="text"
                    name="City"
                    onChange={onChangeHandler}
                    value={values.City}
                    className=" border  border-[#aaaaaa] rounded  pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>
                <div>
                  <h1 className="ml-1 mb-1">applicable</h1>
                  <input
                    type="text"
                    name="Applicable"
                    onChange={onChangeHandler}
                    value={values.Applicable}
                    className=" border  border-[#aaaaaa] rounded  pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>
              </div>

              <div className="lg:flex space-y-4 lg:space-y-0 lg:space-x-10">
                <div>
                  <h1 className="ml-1 mb-1">Do we need a security code </h1>
                  <input
                    type="text"
                    name="Code"
                    onChange={onChangeHandler}
                    value={values.Code}
                    className=" border  border-[#aaaaaa] rounded pl-2 pb-[2px]  w-full min-w-[280px] h-[30px] shadow-md "
                  />
                </div>

                <div>
                  <button
                    onClick={onSubmit}
                    className=" border  border-[#aaaaaa] rounded-full pl-2 pb-[2px]  w-full min-w-[180px] h-[30px] shadow-md lg:ml-7 lg:mt-8 mt-4  bg-[#c7c5c5] hover:bg-[#aaa8a8]"
                  >
                    Use this address
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${Totals}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">${quint * 4}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Order total:</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${AllTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
