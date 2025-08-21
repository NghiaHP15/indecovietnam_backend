import { ILike } from "typeorm";
import { CreateFeedbackDto, QueryFeedbackDto, ResponseFeedbackDto, UpdateFeedbackDto } from "../dto/feedback.dto";
import { feedbackRepo } from "../repositories/feedback.repository";
import { toResponseFeedbackDto } from "../automapper/feedback.mapper";


export const getAllFeedbacks = async (query: QueryFeedbackDto): Promise<ResponseFeedbackDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { email: ILike(`%${query.search}%`) } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.show ? { show: query.show } : {}),
    };
    
    const [feedbacks] = await feedbackRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return feedbacks.map(toResponseFeedbackDto);
};

export const getFeedbackById = async (id: string): Promise<ResponseFeedbackDto | null> => {
  const feedback = await feedbackRepo.findOne({ 
    where: { id },
  });
  return feedback ? toResponseFeedbackDto(feedback) : null;
};

export const lastFeedback = async (email: string): Promise<ResponseFeedbackDto | null> => {
  const feedback = await feedbackRepo.find({
    where: { email },
    order: { created_at: 'DESC' },
    take: 1,
  });
  return feedback.length ? toResponseFeedbackDto(feedback[0]) : null;
}

export const createFeedback = async (dto: CreateFeedbackDto): Promise<ResponseFeedbackDto> => {
  dto.created_at = new Date();
  const feedback = feedbackRepo.create({ ...dto });
  await feedbackRepo.save(feedback);
  return toResponseFeedbackDto(feedback);
}

export const updateFeedback = async (id: string, dto: UpdateFeedbackDto): Promise<ResponseFeedbackDto | null> => {
  const feedback = await feedbackRepo.findOneBy({ id });
  if (!feedback) return null;
  Object.assign(feedback, dto);
  await feedbackRepo.save(feedback);
  return toResponseFeedbackDto(feedback);
};

export const deleteFeedback = async (id: string): Promise<boolean> => {
  const result = await feedbackRepo.delete({ id });
  return result.affected !== 0;
};