export interface CategoryRespondDto {
    _id: string;
    isRoot: boolean;
    name: string;
    parentId: string | null;
    children: CategoryRespondDto[];
}