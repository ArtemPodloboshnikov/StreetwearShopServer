import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { UPLOADS_FOLDER_NAME } from './files.constants';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}/${UPLOADS_FOLDER_NAME}`,
    serveRoot: '/static'
  })],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
