import { roomCategoryRepo } from './../repositories/roomCategory.repository';
import { CreateRoomCategoryDto, QueryRoomCategoryDto, ResponseRoomCategoryDto, UpdateRoomCategoryDto } from '../dto/roomCategory.dto';
import { toResponseRoomCategoryDto } from '../automapper/roomCategory.mapper';
import { Like } from 'typeorm';
import slugify from 'slugify';

export const getAllRoomCategories = async (query: QueryRoomCategoryDto): Promise<ResponseRoomCategoryDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { title: Like(`%${query.search}%`) },
    ] : {};

    const [roomCategories] = await roomCategoryRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return roomCategories.map(toResponseRoomCategoryDto);
};

export const getRoomCategoryById = async (id: string): Promise<ResponseRoomCategoryDto | null> => {
  const roomCategory = await roomCategoryRepo.findOneBy({ id });
  return roomCategory ? toResponseRoomCategoryDto(roomCategory) : null;
};

export const CreateRoomCategory = async (dto: CreateRoomCategoryDto): Promise<ResponseRoomCategoryDto> => {
  dto.slug = generateSlug(dto.title);
  const roomCategory = roomCategoryRepo.create({ ...dto });
  await roomCategoryRepo.save(roomCategory);
  return toResponseRoomCategoryDto(roomCategory);
}

export const updateRoomCategory = async (id: string, dto: UpdateRoomCategoryDto): Promise<ResponseRoomCategoryDto | null> => {
  const roomCategory = await roomCategoryRepo.findOneBy({ id });
  if (!roomCategory) return null;
  Object.assign(roomCategory, dto);
  roomCategory.slug = generateSlug(dto.title);
  await roomCategoryRepo.save(roomCategory);
  return toResponseRoomCategoryDto(roomCategory);
};

export const deleteRoomCategory = async (id: string): Promise<boolean> => {
  const result = await roomCategoryRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};

export const generateSlug = (title: string): string => {
  return slugify(title, { lower: true, strict: true, locale: 'vi' });
}