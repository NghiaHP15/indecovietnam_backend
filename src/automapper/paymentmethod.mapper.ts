import { ResponsePaymentMethodDto } from "../dto/paymentmethod.dto"
import { Paymentmethod } from "../entity/Paymentmethod"

export const toResponsePaymentmethodDto = (paymentmethod: Paymentmethod): ResponsePaymentMethodDto => {
    return {
        id: paymentmethod.id,
        name: paymentmethod.name,
        description: paymentmethod.description,
        image: paymentmethod.image,
        active: paymentmethod.active,
    }
}