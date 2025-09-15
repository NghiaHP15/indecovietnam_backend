import { ResponsePolicyDto } from "../dto/policy.dto"
import { Policy } from "../entity/Policy"


export const toResponsePolicyDto = (policy: Policy): ResponsePolicyDto => {
    return {
        id: policy.id,
        title: policy.title,
        slug: policy.slug,
        description: policy.description
    }
}