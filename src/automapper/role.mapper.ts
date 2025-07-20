import { ResponseRoleDto } from "../dto/role.dto"
import { Role } from "../entity/Role"

export const toResponseRoleDto = (role: Role): ResponseRoleDto => {
    return {
        id: role.id,
        name: role.name,
        description: role.description,
        permission: role.permission
    }
}