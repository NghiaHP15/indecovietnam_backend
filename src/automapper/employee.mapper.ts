import { ResponseEmployeeDto } from "../dto/employee.dto";
import { Employee } from "../entity/Employee";

export const toResponseEmployeeDto = (employee: Employee): ResponseEmployeeDto => {
    return {
        id: employee.id,
        email: employee.email,
        fullname: employee.fullname,
        phone: employee.phone,
        gender: employee.gender,
        address: employee.address,
        position: employee.position,
        date_of_birth: employee.date_of_birth,
        status_active: employee.status_active,
        avatar: employee.avatar,
        role: employee.role && { id: employee.role.id, name: employee.role.name, permission: employee.role.permission },
        created_at: employee.created_at,
        updated_at: employee.updated_at
    }
}