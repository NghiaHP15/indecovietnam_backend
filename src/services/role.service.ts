import { Like } from 'typeorm';
import { CreateRoleDto, QueryRoleDto, ResponseRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { roleRepo } from '../repositories/role.repository';
import { toResponseRoleDto } from '../automapper/role.mapper';

export const getAllRoles = async (query: QueryRoleDto): Promise<ResponseRoleDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { name: Like(`%${query.search}%`) },
    ] : {};

    const [roles] = await roleRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return roles.map(toResponseRoleDto);
};

export const getRoleById = async (id: string): Promise<ResponseRoleDto | null> => {
  const role = await roleRepo.findOne({
    where: { id },
  });
  return role ? toResponseRoleDto(role) : null;
};

export const createRole = async (dto: CreateRoleDto): Promise<ResponseRoleDto> => {
  const role = roleRepo.create({ ...dto });
  await roleRepo.save(role);
  return toResponseRoleDto(role);
}

export const updateRole = async (id: string, dto: UpdateRoleDto): Promise<ResponseRoleDto | null> => {
  const role = await roleRepo.findOneBy({ id });
  if (!role) return null;
  Object.assign(role, dto);
  await roleRepo.save(role);
  return toResponseRoleDto(role);
};

export const deleteRole = async (id: string): Promise<boolean> => {
  const result = await roleRepo.delete({ id });
  return result.affected !== 0;
};