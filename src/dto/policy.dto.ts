export interface PolicyDto {
    id: string;
    title: string;
    slug: string;
    description?: string;
}

export interface ResponsePolicyDto {
    id: string;
    title: string;
    slug: string;
    description?: string;
}

export interface CreatePolicyDto {
    title: string;
    description: string;
}

export interface UpdatePolicyDto {
    title: string;
    description: string;
}

export interface QueryPolicyDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof QueryPolicyDto;
  order?: 'asc' | 'desc';
}
