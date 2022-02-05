
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourModule } from './tour/tour.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:12345@cluster0.0gfmy.mongodb.net/turismoapi?retryWrites=true&w=majority'), TourModule, UploadModule],
})
export class AppModule {}