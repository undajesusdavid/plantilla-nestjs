import { Readable } from 'stream';
import { UserListDataType } from './user-list-data.type';
export const USER_LIST_EXPORT_PDF = Symbol('IUserListExportPdf');

export interface IUserListExportPdf {
    export(data: UserListDataType): Promise<Readable>;
}