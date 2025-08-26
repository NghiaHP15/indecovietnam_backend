import bcrypt from 'bcryptjs';
import { Like } from 'typeorm';
import { CreateEmployeeDto, QueryEmployeeDto, ResponseEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { employeeRepo } from '../repositories/employee.repository';
import { toResponseEmployeeDto } from '../automapper/employee.mapper';
import { DefaultPassword } from '../utils/enum';


export const getAllEmployees = async (query: QueryEmployeeDto): Promise<ResponseEmployeeDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { email: Like(`%${query.search}%`) },
        { fullname: Like(`%${query.search}%`) },
    ] : {};

    const [employees] = await employeeRepo.findAndCount({ 
        where,
        relations:['role'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return employees.map(toResponseEmployeeDto);
};

export const getEmployeeByEmail = async (email: string): Promise<ResponseEmployeeDto | null> => {
  const employee = await employeeRepo.findOne({
    where: { email },
    relations: ['role'],
  });
  return employee ? toResponseEmployeeDto(employee) : null;
};

export const getEmployeeById = async (id: string): Promise<ResponseEmployeeDto | null> => {
  const employee = await employeeRepo.findOne({
    where: { id },
    relations: ['role'],
   });
  return employee ? toResponseEmployeeDto(employee) : null;
};

export const createEmployee = async (dto: CreateEmployeeDto): Promise<ResponseEmployeeDto> => {
  const password_hash = await bcrypt.hash(dto.password || DefaultPassword.DEFAULT_PASSWORD, 10);
  const employee = employeeRepo.create({ ...dto, password_hash });
  await employeeRepo.save(employee);
  return toResponseEmployeeDto(employee);
}

export const updateEmployee = async (id: string, dto: UpdateEmployeeDto): Promise<ResponseEmployeeDto | null> => {
  const employee = await employeeRepo.findOneBy({ id });
  if (!employee) return null;
  Object.assign(employee, dto);
  await employeeRepo.save(employee);
  return toResponseEmployeeDto(employee);
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  const result = await employeeRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};