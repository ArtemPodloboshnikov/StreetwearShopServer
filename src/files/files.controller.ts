import { BadRequestException, Controller, Delete, HttpCode, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { DELETE_FILE_ERROR, NOT_CONVERT_FILE_ERROR } from './files.constants';
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
    @UseInterceptors(FileInterceptor('files'))
    async uploadFiles(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
        const saveArray: MFile[] = [];
        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToAvif(file.buffer);
            saveArray.push(new MFile({ originalname: `${file.originalname.split('.')[0]}.avif`,
                buffer
            }));
        } else {
            throw new BadRequestException(NOT_CONVERT_FILE_ERROR);
        }
        return this.filesService.saveFiles(saveArray)
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
