import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, remove, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/file-element.response';
import { UPLOADS_FOLDER_NAME } from './files.constants';
import { MFile } from './mfile.class';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
    async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${path}/${UPLOADS_FOLDER_NAME}/${dateFolder}`;
        await ensureDir(uploadFolder);

        const response: FileElementResponse[] = [];
        for (const file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
            response.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname})
        }

        return response;
    }

    convertToAvif(file: Buffer): Promise<Buffer> {
        return sharp(file).avif().toBuffer();
    }

    async delete(pathToFile: string): Promise<Boolean> {
        let response = { isDelete: true };
        try {
            await remove(`${path}/${UPLOADS_FOLDER_NAME}/${pathToFile}`);
        } catch(_) {
            response.isDelete = false;
        }

        return response.isDelete;

    }
}
