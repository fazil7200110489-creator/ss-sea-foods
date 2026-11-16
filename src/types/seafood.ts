export type SeafoodCategory = "Fresh Catch" | "Premium Dry Fish";

export interface SeafoodItem {
  id: string;
  name: string;
  tamilName?: string;
  category: SeafoodCategory;
  description: string;
  specialtyTag?: string;
  image: string;
  typicalSizes?: string;
  availability: "Daily Fresh Catch" | "Live Hooked" | "Cured & Ready";
}

export interface OrderInquiry {
  item: SeafoodItem;
  orderType: "Restaurant / Stall Bulk" | "Custom Household";
  district: string;
  quantity: string;
  name: string;
  phone: string;
  notes?: string;
}
