import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { emptyDir, remove, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/file-element.response';
import { UPLOADS_FOLDER_NAME } from './files.constants';
import { MFile } from './mfile.class';
import * as sharp from 'sharp';
import { transliterate } from 'transliteration';

@Injectable()
export class FilesService {
    async saveFiles(files: MFile[], folder: string): Promise<FileElementResponse[]> {
        const toLatin = (str: string) => transliterate(str, {replace: [[' ', '_']]});
        const nameFolder = toLatin(folder);
        const uploadFolder = `${path}/${UPLOADS_FOLDER_NAME}/${nameFolder}`;
        await emptyDir(uploadFolder);

        const response: FileElementResponse[] = [];
        for (const file of files) {
            const fileName = toLatin(file.originalname);
            await writeFile(`${uploadFolder}/${fileName}`, file.buffer);
            response.push({ url: `${nameFolder}/${fileName}`, name: fileName})
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
