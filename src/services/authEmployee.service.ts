import { employeeRepo } from "../repositories/employee.repository";
import { createError } from "../utils/response";
import bcrypt from "bcryptjs";
import { LoginEmployeeDto, ResetEmployeeDto, ResponseEmployeeDto } from "../dto/employee.dto";
import { Employee } from "../entity/Employee";
import { generateRefreshToken } from "../utils/jwt";
import { toResponseAuthDto } from "../automapper/employee.mapper";

export const login = async (dto: LoginEmployeeDto) => {
    const employee = await employeeRepo.findOne({ 
        where: { email: dto.email },
        relations: ['role'],
    });
    if(!employee) throw createError("Email không tồn tại", 401);
    const isValid = await bcrypt.compare(dto.password, employee.password_hash || "");
    if(!isValid) throw createError("Mật khẩu không chính xác", 401);
    const token = generateTokens(employee);
    const user = toResponseAuthDto(employee);
    return { ...token, user};
}

export const resetPassword = async (dto: ResetEmployeeDto) => {
    const employee = await employeeRepo.findOneBy({ email: dto.email });
    if (!employee) throw createError("Email không tồn tại", 401);
    const isValid = await bcrypt.compare(dto.oldPassword, employee.password_hash || "");
    if(!isValid) throw createError("Mật khẩu không chính xác", 401);
    const password_hash = await bcrypt.hash(dto.newPassword, 10);
    employee.password_hash = password_hash;
    await employeeRepo.save(employee);
    return employee;
};

export const generateTokens = (employee: Employee) => {
    const payload = {id: employee.id, email: employee.email};
    const token = generateRefreshToken(payload);
    return { token };
}
