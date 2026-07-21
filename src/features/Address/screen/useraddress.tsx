import  { useState, ChangeEvent, MouseEvent } from "react";
import { useCartStore } from "../../cart/store/useCartStore";


interface AddressFormValues {
  Country: string;
  Full_name: string;
  Phone_number: string;
  Address_line_1: string;
  Address_line_2: string;
  City: string;
  Applicable: string;
  Code: string;
}

const initialValues: AddressFormValues = {
  Country: "",
  Full_name: "",
  Phone_number: "",
  Address_line_1: "",
  Address_line_2: "",
  City: "",
  Applicable: "",
  Code: "",
};

export const UserAddress = () => {
  const Totals = useCartStore((state) => state.Totals);
  const quint = useCartStore((state) => state.AllQuantity);
  const AllTotal = quint * 4 + Totals;

  const [values, setValues] = useState<AddressFormValues>(initialValues);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues(initialValues);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.headerTitle}>
          Checkout ({quint} item)
        </h1>

        <div className={styles.layoutGrid}>
          {/* Form Section */}
          <div className={styles.formCard}>
            <h1 className="m-1 font-bold text-2xl">Add a new address</h1>

            <div className="mt-4">
              <h1 className={styles.label}>Country</h1>
              <select
                name="Country"
                onChange={onChangeHandler}
                value={values.Country}
                className={styles.select}
              >
                <option value="">Select Country</option>
                <option value="Syria" className="bg-[#ecebeb]">Syria</option>
                <option value="Usa" className="bg-[#ecebeb]">Usa</option>
                <option value="China" className="bg-[#ecebeb]">China</option>
              </select>
            </div>

            <div className={styles.inputRow}>
              <div>
                <h1 className={styles.label}>Full name</h1>
                <input
                  type="text"
                  name="Full_name"
                  onChange={onChangeHandler}
                  value={values.Full_name}
                  className={styles.input}
                />
              </div>
              <div>
                <h1 className={styles.label}>Phone number</h1>
                <input
                  type="text"
                  name="Phone_number"
                  onChange={onChangeHandler}
                  value={values.Phone_number}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div>
                <h1 className={styles.label}>Address line 1</h1>
                <input
                  type="text"
                  name="Address_line_1"
                  onChange={onChangeHandler}
                  value={values.Address_line_1}
                  className={styles.input}
                />
              </div>
              <div>
                <h1 className={styles.label}>Address line 2</h1>
                <input
                  type="text"
                  name="Address_line_2"
                  onChange={onChangeHandler}
                  value={values.Address_line_2}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div>
                <h1 className={styles.label}>City</h1>
                <input
                  type="text"
                  name="City"
                  onChange={onChangeHandler}
                  value={values.City}
                  className={styles.input}
                />
              </div>
              <div>
                <h1 className={styles.label}>Applicable</h1>
                <input
                  type="text"
                  name="Applicable"
                  onChange={onChangeHandler}
                  value={values.Applicable}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div>
                <h1 className={styles.label}>Do we need a security code</h1>
                <input
                  type="text"
                  name="Code"
                  onChange={onChangeHandler}
                  value={values.Code}
                  className={styles.input}
                />
              </div>

              <div>
                <button onClick={onSubmit} className={styles.submitBtn}>
                  Use this address
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className={styles.summaryCard}>
            <div className={`mb-2 ${styles.summaryRow}`}>
              <p className={styles.summaryLabel}>Subtotal</p>
              <p className={styles.summaryLabel}>${Totals}</p>
            </div>
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>Shipping</p>
              <p className={styles.summaryLabel}>${quint * 4}</p>
            </div>
            <hr className="my-4" />
            <div className={styles.summaryRow}>
              <p className="text-lg font-bold">Order total:</p>
              <div>
                <p className="mb-1 text-lg font-bold">${AllTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const styles = {
  container: "h-screen bg-white dark:bg-zinc-800 mt-14",
  contentWrapper: "h-auto bg-white dark:bg-zinc-800 pb-4",
  headerTitle: "mb-5 text-center text-2xl font-sans dark:text-white",
  layoutGrid: "mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0",
  formCard: "rounded-lg md:w-2/3 h-auto border bg-white p-6 pb-7 shadow-md mb-9 space-y-6",
  inputRow: "lg:flex space-y-4 lg:space-y-0 lg:space-x-10",
  label: "ml-1 mb-1",
  input: "border border-[#aaaaaa] rounded pl-2 pb-[2px] w-full min-w-[280px] h-[30px] shadow-md",
  select: "border pl-2 bg-[#ecebeb] hover:bg-[#e6e4e4] border-[#aaaaaa] rounded w-full h-[30px] shadow-sm",
  submitBtn: "border border-[#aaaaaa] rounded-full pl-2 pb-[2px] w-full min-w-[180px] h-[30px] shadow-md lg:ml-7 lg:mt-8 mt-4 bg-[#c7c5c5] hover:bg-[#aaa8a8]",
  summaryCard: "mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3",
  summaryRow: "flex justify-between",
  summaryLabel: "text-gray-700",
};
