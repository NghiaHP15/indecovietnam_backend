import { Feedback } from "../entity/Feedback";
import { TypeFeedback } from "../utils/enum";

export interface ResponseFeedbackDto {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
    type: TypeFeedback;
    email: string;
    phone: string;
    subject: string;
    message: string;
    show: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CreateFeedbackDto {
    name: string;
    email: string;
    phone: string;
    type: TypeFeedback;
    subject: string;
    message: string;
    show: boolean;
    created_at: Date;
}

export interface UpdateFeedbackDto {
    name: string;
    email: string;
    phone: string;
    type: TypeFeedback;
    subject: string;
    message: string;
    show: boolean;
}

export interface QueryFeedbackDto {
  page?: number;
  limit?: number;
  search?: string;
  type?: TypeFeedback;
  show?: boolean;
  sortBy?: keyof Feedback;
  order?: 'asc' | 'desc';
}