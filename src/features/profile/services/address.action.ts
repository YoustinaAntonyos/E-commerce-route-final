'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { apiClient } from "@/shared/services/apiClient";
import {
  AddressErrorResponse,
  AddressInput,
  AddressListResponse,
  AddressMutationResponse,
} from "../types/address.type";

async function getAddressToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

export async function getUserAddresses(): Promise<
  AddressListResponse | AddressErrorResponse
> {
  const token = await getAddressToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to view your addresses.",
    };
  }

  try {
    const { data } = await apiClient.get<AddressListResponse>("/addresses", {
      headers: { token },
    });
    return data;
  } catch (error) {
    console.error("Loading addresses failed:", error);
    return {
      status: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to load your addresses."
        : "Unable to load your addresses.",
    };
  }
}

export async function addUserAddress(
  address: AddressInput,
): Promise<AddressMutationResponse | AddressErrorResponse> {
  const token = await getAddressToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to add an address.",
    };
  }

  try {
    const { data } = await apiClient.post<AddressMutationResponse>(
      "/addresses",
      address,
      { headers: { token } },
    );
    return data;
  } catch (error) {
    console.error("Adding address failed:", error);
    return {
      status: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to add this address."
        : "Unable to add this address.",
    };
  }
}

export async function removeUserAddress(
  addressId: string,
): Promise<AddressMutationResponse | AddressErrorResponse> {
  if (!/^[a-f\d]{24}$/i.test(addressId)) {
    return { status: "fail", message: "A valid address is required." };
  }

  const token = await getAddressToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to remove an address.",
    };
  }

  try {
    const { data } = await apiClient.delete<AddressMutationResponse>(
      `/addresses/${addressId}`,
      { headers: { token } },
    );
    return data;
  } catch (error) {
    console.error("Removing address failed:", error);
    return {
      status: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to remove this address."
        : "Unable to remove this address.",
    };
  }
}
