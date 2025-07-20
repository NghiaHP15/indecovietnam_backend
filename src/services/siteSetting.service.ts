import { Like } from "typeorm";
import { CreateSiteSettingDto, QuerySiteSettingDto, ResponseSiteSettingDto, UpdateSiteSettingDto } from "../dto/siteSetting.dto";
import { toResponseSiteSettingDto } from "../automapper/siteSetting.mapper";
import { siteSettingRepo } from "../repositories/siteSetting.repository";


export const getAllSiteSettings = async (query: QuerySiteSettingDto): Promise<ResponseSiteSettingDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { name: Like(`%${query.search}%`) },
    ] : {};

    const [siteSettings] = await siteSettingRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return siteSettings.map(toResponseSiteSettingDto);
};

export const getSiteSettingById = async (id: string): Promise<ResponseSiteSettingDto | null> => {
  const siteSetting = await siteSettingRepo.findOneBy({ id });
  return siteSetting ? toResponseSiteSettingDto(siteSetting) : null;
};

export const CreateSiteSetting = async (dto: CreateSiteSettingDto): Promise<ResponseSiteSettingDto> => {
  const siteSetting = siteSettingRepo.create({ ...dto });
  await siteSettingRepo.save(siteSetting);
  return toResponseSiteSettingDto(siteSetting);
}

export const updateSiteSetting = async (id: string, dto: UpdateSiteSettingDto): Promise<ResponseSiteSettingDto | null> => {
  const siteSetting = await siteSettingRepo.findOneBy({ id });
  if (!siteSetting) return null;
  Object.assign(siteSetting, dto);
  await siteSettingRepo.save(siteSetting);
  return toResponseSiteSettingDto(siteSetting);
};

export const deleteSiteSetting = async (id: string): Promise<boolean> => {
  const result = await siteSettingRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};
