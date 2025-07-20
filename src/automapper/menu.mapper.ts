import { ResponseMenuDto } from "../dto/menu.dto"
import { Menu } from "../entity/Menu"

export const toResponseMenuDto = (menu: Menu): ResponseMenuDto => {
    return {
        id: menu.id,
        name: menu.name,
        item: menu.item,
        position: menu.position
    }
}