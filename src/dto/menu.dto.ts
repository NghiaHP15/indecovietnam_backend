import { Menu } from "../entity/Menu";
import { PositionMenu } from "../utils/enum";

export interface ResponseMenuDto {
    id: string;
    name: string;
    item: string;
    position: PositionMenu;
}

export interface CreateMenuDto {
    name: string;
    item: string;
    position: PositionMenu;
}

export interface UpdateMenuDto {
    name: string;
    item: string;
    position: PositionMenu;
}

export interface QueryMenuDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof Menu;
    order?: 'asc' | 'desc';
}