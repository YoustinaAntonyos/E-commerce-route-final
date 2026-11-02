export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface CategoriesApiResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Category[];
  error?: string;
}