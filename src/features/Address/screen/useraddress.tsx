import { useState, ChangeEvent, FormEvent } from "react";
import { useCartStore } from "../../cart/store/useCartStore";
import LocationPickerMaps from "../../google-map/screen/LocationPickerMaps";

interface AddressFormValues {
  country: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  notes: string;
  paymentMethod: "COD" | "Card";
  latitude?: number;
  longitude?: number;
}

const initialValues: AddressFormValues = {
  country: "Syria",
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  notes: "",
  paymentMethod: "COD",
};

// كلاسات مخصصة لمعالجة الخلفية البيضاء الخاصة بالـ Autofill
  const autofillClasses =
    "autofill:bg-transparent autofill:text-text [&&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [&&:-webkit-autofill]:[-webkit-text-fill-color:white]";

export default function UserAddress() {
  const Totals = useCartStore((state) => state.Totals);
  const quint = useCartStore((state) => state.AllQuantity);
  const AllTotal: number = quint * 4 + Totals;

  const [values, setValues] = useState<AddressFormValues>(initialValues);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleLocationConfirm = (locationData: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setValues((prev) => ({
      ...prev,
      addressLine1: locationData.address || prev.addressLine1,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    }));
    setShowMapModal(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!values.fullName || !values.phone || !values.addressLine1) {
      alert("Please fill in all required fields (Name, Phone, and Address).");
      return;
    }
    console.log("Order submitted:", values);
    alert("Order placed successfully!");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.headerTitle}>Checkout ({quint} items)</h1>

      <div className={styles.mainLayout}>
        {/* Form Card */}
        <form onSubmit={onSubmit} className={styles.formCard}>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 dark:border-zinc-700">
            <h2 className={styles.sectionHeader}>Shipping Details</h2>
            
          </div>

          {/* Country & City */}
          <div className={styles.inputRow}>
            <div className="w-full">
              <label className={styles.label}>Country</label>
              <select
                name="country"
                onChange={onChangeHandler}
                value={values.country}
                className={styles.select}
              >
                <option value="Syria">Syria</option>
                <option value="Usa">USA</option>
                <option value="China">China</option>
              </select>
            </div>
            <div className="w-full">
              <label className={styles.label}>City</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Damascus"
                onChange={onChangeHandler}
                value={values.city}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Name & Phone */}
          <div className={styles.inputRow}>
            <div className="w-full">
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                onChange={onChangeHandler}
                value={values.fullName}
                className={styles.input}
                required
              />
            </div>
            <div className="w-full">
              <label className={styles.label}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="09XXXXXXXX"
                onChange={onChangeHandler}
                value={values.phone}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={styles.label}>Email Address (Optional)</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={onChangeHandler}
              value={values.email}
              className={styles.input}
            />
          </div>

          {/* Address Line 1 */}
          <div>
            <label className={styles.label}>Street Address</label>
            <div className="flex">
            <input
              type="text"
              name="addressLine1"
              placeholder="Enter your street address or pick from map"
              onChange={onChangeHandler}
              value={values.addressLine1}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowMapModal(true)}
              className={`${styles.mapBtn} ${
                values.latitude ? styles.mapBtnSelected : styles.mapBtnDefault
              }`}
            >
              {values.latitude ? "✏️ Change Selected Location" : "📍 Pin Location on Map"}
            </button>
            </div>
          </div>

          {/* Address Line 2 */}
          <div>
            <label className={styles.label}>Building / Apartment / Floor (Optional)</label>
            <input
              type="text"
              name="addressLine2"
              placeholder="Apt 4B, 3rd Floor"
              onChange={onChangeHandler}
              value={values.addressLine2}
              className={styles.input}
            />
          </div>

          {/* Payment Method */}
          <div className="pt-2 border-t dark:border-zinc-700">
            <label className={styles.label}>Payment Method</label>
            <div className="flex gap-4 mt-1 text-sm text-gray-700 dark:text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={values.paymentMethod === "COD"}
                  onChange={onChangeHandler}
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
                <input type="radio" name="paymentMethod" value="Card" disabled />
                Credit Card (Coming Soon)
              </label>
            </div>
          </div>

          {/* Delivery Notes */}
          <div>
            <label className={styles.label}>Delivery Notes (Optional)</label>
            <textarea
              name="notes"
              placeholder="Any special instructions for the courier..."
              onChange={onChangeHandler}
              value={values.notes}
              className={styles.textarea}
              rows={2}
            />
          </div>

          <button type="submit" className={styles.checkoutBtn}>
            Place Order
          </button>
        </form>

        {/* Summary Card */}
        <div className={styles.summaryCard}>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-4 dark:border-zinc-700">
            Order Summary
          </h2>

          <div className={styles.summaryRow}>
            <p>Subtotal</p>
            <p>${Totals}</p>
          </div>
          <div className={styles.summaryRow}>
            <p>Shipping</p>
            <p>${quint * 4}</p>
          </div>

          <hr className={styles.summaryDivider} />

          <div className={styles.summaryTotalRow}>
            <p>Total</p>
            <p>${AllTotal}</p>
          </div>

          <p className={styles.vatNotice}>including VAT</p>

          {values.latitude && values.longitude && (
            <div className="mt-8 p-2.5 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg text-xs text-green-700 dark:text-green-400">
              ✓ Map location coordinates attached successfully.
            </div>
          )}
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className="font-bold text-gray-800 dark:text-white">
                Select Delivery Location
              </h3>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="text-gray-500 hover:text-black dark:hover:text-white font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>
            <div className="h-[450px] w-full">
              <LocationPickerMaps onConfirm={handleLocationConfirm} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// التنسيقات المطابقة لصفحة السلة الخاصة بك تماماً
const styles = {
  // Common Layout
  wrapper: "min-h-screen bg-[#f3f2f2] dark:bg-zinc-800 p-4",
  headerTitle: "mt-12 mb-5 text-center text-2xl font-bold dark:text-white",
  mainLayout: "mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0",

  // Form Section
  formCard:
    "rounded-lg md:w-2/3 border bg-white p-6 shadow-md md:mt-0 mb-6 space-y-4 dark:bg-zinc-900 dark:border-zinc-700",
  sectionHeader: "text-xl font-bold text-gray-900 dark:text-white",
  inputRow: "grid grid-cols-1 md:grid-cols-2 gap-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    `w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${autofillClasses}`,
  select:
    "w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-white",
  textarea:
    "w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white",

  // Map Button Styles
  mapBtn:
    "text-xs md:text-sm font-semibold px-3  rounded-lg border transition-all duration-200 cursor-pointer ml-3",
  mapBtnDefault:
    "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 dark:bg-zinc-800 dark:text-indigo-400 dark:border-zinc-700",
  mapBtnSelected:
    "bg-green-50 text-green-700 border-green-300 hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",

  // Summary Card Styles
  summaryCard:
    "mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 dark:bg-zinc-900 dark:border-zinc-700",
  summaryRow: "mb-2 flex justify-between text-gray-700 dark:text-gray-300",
  summaryDivider: "my-4 border-gray-200 dark:border-zinc-700",
  summaryTotalRow: "flex justify-between text-lg font-bold text-gray-900 dark:text-white",
  vatNotice: "text-sm text-gray-500 float-end mt-1",

  // Submit Button Style
  checkoutBtn:
    "mt-6 w-full py-2 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 duration-200 dark:hover:drop-shadow-2xl cursor-pointer block text-center border-none",

  // Modal Styles
  modalBackdrop: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
  modalContent:
    "bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative border dark:border-zinc-700",
  modalHeader:
    "flex justify-between items-center p-3.5 border-b bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700",
};