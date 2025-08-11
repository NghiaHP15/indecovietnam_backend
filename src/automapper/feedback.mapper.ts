import { ResponseFeedbackDto } from "../dto/feedback.dto"
import { Feedback } from "../entity/Feedback"

export const toResponseFeedbackDto = (feedback: Feedback): ResponseFeedbackDto => {
    return {
        id: feedback.id,
        name: feedback.name,
        email: feedback.email,
        phone: feedback.phone,
        subject: feedback.subject,
        type: feedback.type,
        avatar: feedback.avatar,
        role: feedback.role,
        message: feedback.message,
        show: feedback.show,
        created_at: feedback.created_at,
        updated_at: feedback.updated_at
    }
}