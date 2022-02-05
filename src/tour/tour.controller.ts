import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {createReadStream} from 'streamifier'
import { UploadService } from 'src/upload/upload.service';
import { CreateTourDto } from './dtos/create-tour.dto';
import { TourService } from './tour.service';
import { UpdateTourDto } from './dtos/update-tour.dto';

@Controller('tours')
export class TourController {
    constructor (private tourService:TourService,private uploadService:UploadService) {
    
    }
    @Get()
    findAll(){
        return this.tourService.findAll()
    }
    @Get(':slug')
    findBySlug(@Param('slug')slug:string){
        return this.tourService.findBySlug(slug)
    }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name:'imageCover', maxCount:1},{name:'images', maxCount:3}
    ]))
    async create(@Body()createtourdto:CreateTourDto, @UploadedFiles()files:{imageCover:Express.Multer.File[];images?:Express.Multer.File[]}){
     if(!files.imageCover.length){
         throw new BadRequestException('Please provide a valid a cover image')
     }
     const coverStream = createReadStream(files.imageCover[0].buffer)
     const {secure_url}=await this.uploadService.uploadStream(coverStream)
     const imagesURL:string[]=[]
     if(files.images&&files.images.length){
         await Promise.all(
             files.images.map(async (image) => {
                const imageStream = createReadStream(image.buffer)
                const {secure_url}=await this.uploadService.uploadStream(imageStream)
                imagesURL.push(secure_url)
             })
         )
     }
        return this.tourService.create(createtourdto,secure_url,imagesURL)
    }
    @HttpCode(204)
    @Delete(':slug')
    async deleteBySlug(@Param('slug')slug:string) {
        return this.tourService.deletetourBySlug(slug)
    }
    @Patch(':slug')
    async updateBySlug(@Param('slug')slug:string,@Body()updatetourdto:UpdateTourDto) {
        console.log({updatetourdto})
        return this.tourService.updatetourBySlug(slug,updatetourdto)
    }
     @Patch(':slug/cover')
     @UseInterceptors(FileInterceptor('imageCover'))
    async updateCover(@Param('slug')slug:string,@UploadedFile()imageCover:Express.Multer.File) {
        if(!imageCover){
            throw new BadRequestException('Please provide a valid a cover image')
        }
        const coverStream = createReadStream(imageCover.buffer)
        const {secure_url}=await this.uploadService.uploadStream(coverStream)
        return this.tourService.updateCoverBySlug(slug,secure_url)
    }
     @Patch(':slug/images')
     @UseInterceptors(FilesInterceptor('images'))
    async updateimages(@Param('slug')slug:string,@UploadedFiles()images:Express.Multer.File[]) {
        const imagesURL:string[]=[]
        if(images&&images.length){
            await Promise.all(
                images.map(async (image) => {
                   const imageStream = createReadStream(image.buffer)
                   const {secure_url}=await this.uploadService.uploadStream(imageStream)
                   imagesURL.push(secure_url)
                })
            )
        }
        return this.tourService.updateImagesBySlug(slug,imagesURL)
    }

}
