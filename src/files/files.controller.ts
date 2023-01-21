import { BadRequestException, Body, Controller, Delete, HttpCode, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { DELETE_FILE_ERROR, FOLDER_MISSED, NOT_CONVERT_FILE_ERROR } from './files.constants';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ){}

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() {folder}: {folder: string}): Promise<FileElementResponse[]> {
        if (!folder) throw new BadRequestException(FOLDER_MISSED);
        const saveArray: MFile[] = [];
        for (let i=0; i < files.length; i++) {
            files[i].originalname = Buffer.from(files[i].originalname, 'latin1').toString('utf-8');
            if (files[i].mimetype.includes('image')) {
                const buffer = await this.filesService.convertToAvif(files[i].buffer);
                saveArray.push(new MFile({
                    originalname: `${files[i].originalname.split('.')[0]}.avif`,
                    buffer
                }));
            } else {
                throw new BadRequestException(NOT_CONVERT_FILE_ERROR);
            }
        }
        if (saveArray.length) {
            return this.filesService.saveFiles(saveArray, folder)
        } else {
            throw new BadRequestException(NOT_CONVERT_FILE_ERROR);
        }
    }

    @Delete(':folder/:file')
    @UseGuards(JwtAuthGuard)
    async deleteFile(@Param('folder') folder: string, @Param('file') file: string) {
        const isDelete = await this.filesService.delete(`${folder}/${file}`);

        if (!isDelete) {
            throw new BadRequestException(DELETE_FILE_ERROR)
        }
    }

    @Delete(':folder')
    @UseGuards(JwtAuthGuard)
    async deleteFolder(@Param('folder') folder: string) {
        const isDelete = await this.filesService.delete(folder);

        if (!isDelete) {
            throw new BadRequestException(DELETE_FILE_ERROR)
        }
    }

}
