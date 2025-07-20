import { SiteSetting } from "../entity/SiteSetting";
import { SettingType } from "../utils/enum";

export interface ResponseSiteSettingDto {
    id: string,
    name: string,
    value: string,
    group: string,
    type: SettingType
}

export interface CreateSiteSettingDto {
    name: string,
    value: string,
    group: string,
    type: SettingType
}

export interface UpdateSiteSettingDto {
    name: string,
    value: string,
    group: string,
    type: SettingType
}

export interface QuerySiteSettingDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof SiteSetting;
    order?: 'asc' | 'desc';
}