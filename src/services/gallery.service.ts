import { toResponseGalleryDto } from "../automapper/gallery.mapper";
import { CreateGalleryDto, QueryGalleryDto, ResponseGalleryDto, UpdateGalleryDto } from "../dto/gallery.dto";
import { galleryRepo } from "../repositories/gallery.repository";
import { Like } from "typeorm";



export const getAllGalleries = async (query: QueryGalleryDto): Promise<ResponseGalleryDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { title: Like(`%${query.search}%`) } : {}),
      ...(query.type ? { type: query.type } : {}),
    };
    
    const [galleries] = await galleryRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return galleries.map(toResponseGalleryDto);
};

export const getGalleryById = async (id: string): Promise<ResponseGalleryDto | null> => {
  const gallery = await galleryRepo.findOne({ 
    where: { id },
  });
  return gallery ? toResponseGalleryDto(gallery) : null;
};

export const createGallery = async (dto: CreateGalleryDto): Promise<ResponseGalleryDto> => {
  const gallery = galleryRepo.create({ ...dto });
  await galleryRepo.save(gallery);
  return toResponseGalleryDto(gallery);
}

export const updateGallery = async (id: string, dto: UpdateGalleryDto): Promise<ResponseGalleryDto | null> => {
  const gallery = await galleryRepo.findOneBy({ id });
  if (!gallery) return null;
  Object.assign(gallery, dto);
  await galleryRepo.save(gallery);
  return toResponseGalleryDto(gallery);
};

export const deleteGallery = async (id: string): Promise<boolean> => {
  const result = await galleryRepo.delete({ id });
  return result.affected !== 0;
};