import { toResponseMenuDto } from "../automapper/menu.mapper";
import { CreateMenuDto, ResponseMenuDto, UpdateMenuDto } from "../dto/menu.dto";
import { menuRepo } from "../repositories/menu.repository";


export const getAllMenus = async (): Promise<ResponseMenuDto[]> => {
    const [menus] = await menuRepo.findAndCount();
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