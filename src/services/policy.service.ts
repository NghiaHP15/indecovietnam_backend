import { Raw } from "typeorm";
import { CreatePolicyDto, QueryPolicyDto, ResponsePolicyDto, UpdatePolicyDto } from "../dto/policy.dto";
import { generateNormalized } from "../config/contant";
import { policyRepo } from "../repositories/policy.repository";
import { toResponsePolicyDto } from "../automapper/policy.mapper";


export const getAllPolicies = async (query: QueryPolicyDto): Promise<ResponsePolicyDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { 
        title_normalized: Raw(alias => `${alias} LIKE :search`, {
          search: `%${generateNormalized(query.search).toLowerCase()}%`
        }),
      } : {}),
    }

    const [productCategories] = await policyRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return productCategories.map(toResponsePolicyDto);
};

export const getPolicyById = async (id: string): Promise<ResponsePolicyDto | null> => {
  const policy = await policyRepo.findOne({ 
    where: { id },
  });
  return policy ? toResponsePolicyDto(policy) : null;
};

export const getPolicyBySlug = async (slug: string): Promise<ResponsePolicyDto | null> => {
  const policy = await policyRepo.findOne({ 
    where: { slug },
  });
  return policy ? toResponsePolicyDto(policy) : null;
};

export const createPolicy = async (dto: CreatePolicyDto): Promise<ResponsePolicyDto> => {
  const policy = policyRepo.create({ ...dto });
  await policyRepo.save(policy);
  return toResponsePolicyDto(policy);
}

export const updatePolicy = async (id: string, dto: UpdatePolicyDto): Promise<ResponsePolicyDto | null> => {
  const policy = await policyRepo.findOneBy({ id });
  if (!policy) return null;
  Object.assign(policy, dto);
  await policyRepo.save(policy);
  return toResponsePolicyDto(policy);
};

export const deletePolicy = async (id: string): Promise<boolean> => {
  const result = await policyRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};