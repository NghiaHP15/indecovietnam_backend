import { Raw } from "typeorm";
import { toResponseMenuDto } from "../automapper/menu.mapper";
import { CreateMenuDto, QueryMenuDto, ResponseMenuDto, UpdateMenuDto } from "../dto/menu.dto";
import { menuRepo } from "../repositories/menu.repository";
import { generateNormalized } from "../config/contant";


export const getAllMenus = async (query: QueryMenuDto): Promise<ResponseMenuDto[]> => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const where = {
    ...(query.search ? { 
      name_normalized: Raw(alias => `${alias} LIKE :search`, {
        search: `%${generateNormalized(query.search).toLowerCase()}%`
      }),
    } : {}),
  };

  const [menus] = await menuRepo.findAndCount({
    where,
    take: limit,
    skip
  });
  return menus.map(toResponseMenuDto);
};

export const getMenuById = async (id: string): Promise<ResponseMenuDto | null> => {
  const menu = await menuRepo.findOne({ 
    where: { id },
  });
  return menu ? toResponseMenuDto(menu) : null;
};

export const createMenu = async (dto: CreateMenuDto): Promise<ResponseMenuDto> => {
  const menu = menuRepo.create({ ...dto });
  await menuRepo.save(menu);
  return toResponseMenuDto(menu);
}

export const updateMenu = async (id: string, dto: UpdateMenuDto): Promise<ResponseMenuDto | null> => {
  const menu = await menuRepo.findOneBy({ id });
  if (!menu) return null;
  Object.assign(menu, dto);
  await menuRepo.save(menu);
  return toResponseMenuDto(menu);
};

export const deleteMenu = async (id: string): Promise<boolean> => {
  const result = await menuRepo.delete({ id });
  return result.affected !== 0;
};