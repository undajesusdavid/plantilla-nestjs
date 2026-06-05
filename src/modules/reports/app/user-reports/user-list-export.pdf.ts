import { Readable } from 'stream';

export interface UserListExportPdf {
    export(): Promise<Readable>;
   
}