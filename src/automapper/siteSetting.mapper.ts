import { ResponseSiteSettingDto } from "../dto/siteSetting.dto"
import { SiteSetting } from "../entity/SiteSetting"

export const toResponseSiteSettingDto = (siteSetting: SiteSetting): ResponseSiteSettingDto => {
    return {
        id: siteSetting.id,
        name: siteSetting.name,
        value: siteSetting.value,
        group: siteSetting.group,
        type: siteSetting.type
    }
}