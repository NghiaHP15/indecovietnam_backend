import { toResponseColorDto } from "../automapper/color.mapper";
import { CreateColorDto, ResponseColorDto, UpdateColorDto } from "../dto/color.dto";
import { colorRepo } from "../repositories/color.repository";


export const getAllColors = async (): Promise<ResponseColorDto[]> => {
    const [colors] = await colorRepo.findAndCount();
    return colors.map(toResponseColorDto);
};

export const getColorById = async (id: string): Promise<ResponseColorDto | null> => {
  const color = await colorRepo.findOne({ 
    where: { id },
  });
  return color ? toResponseColorDto(color) : null;
};

export const createColor = async (dto: CreateColorDto): Promise<ResponseColorDto> => {
  const Color = colorRepo.create({ ...dto });
  await colorRepo.save(Color);
  return toResponseColorDto(Color);
}

export const updateColor = async (id: string, dto: UpdateColorDto): Promise<ResponseColorDto | null> => {
  const color = await colorRepo.findOneBy({ id });
  if (!color) return null;
  Object.assign(color, dto);
  await colorRepo.save(color);
  return toResponseColorDto(color);
};

export const deleteColor = async (id: string): Promise<boolean> => {
  const result = await colorRepo.delete({ id });
  return result.affected !== 0;
};