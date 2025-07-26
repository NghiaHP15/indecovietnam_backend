import { ResponseColorDto } from "../dto/color.dto"
import { Color } from "../entity/Color"


export const toResponseColorDto = (color: Color): ResponseColorDto => {
    return {
        id: color.id,
        name: color.name,
        code: color.code
    }
}