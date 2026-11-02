export interface UserAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressInput {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressListResponse {
  status: "success";
  message?: string;
  results?: number;
  data: UserAddress[];
}

export interface AddressMutationResponse {
  status: "success";
  message?: string;
  data?: UserAddress;
}

export interface AddressErrorResponse {
  status: "fail" | "error";
  message: string;
}
