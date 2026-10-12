export interface AddressFormValues {
  country: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  notes?: string;
  paymentMethod: "COD" | "Card";
  latitude?: number;
  longitude?: number;
}