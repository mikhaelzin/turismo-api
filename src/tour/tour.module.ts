import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from 'src/upload/upload.module';
import { Tour, TourSchema } from './schemas/tour.schema';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';

@Module({
  controllers: [TourController],
  imports:[UploadModule,MongooseModule.forFeature([{name:Tour.name,schema:TourSchema}])],
  providers: [TourService]
})
export class TourModule {}
