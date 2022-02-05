import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { CreateTourDto } from './dtos/create-tour.dto';
import { UpdateTourDto } from './dtos/update-tour.dto';
import { Tour, TourDocument } from './schemas/tour.schema';

@Injectable()
export class TourService {

    constructor(@InjectModel(Tour.name) private tourModel:Model<TourDocument>){
    }
    async create(createtourdto:CreateTourDto,imageCover:string,images:string[]): Promise<Tour> {
        const slug= slugify(createtourdto.name, {lower:true, trim:true})
        const createdTour = new this.tourModel({...createtourdto,slug,imageCover,images})
        return createdTour.save()
    }
    async findAll():Promise<Tour[]>{
        return this.tourModel.find().exec()
    }
    async findBySlug(slug:string):Promise<Tour>{
        const tour=await this.tourModel.findOne({slug}).exec()
        if(!tour){
            throw new NotFoundException('Unable to find a tour')
        }
        return tour
    }
    async deletetourBySlug(slug:string):Promise<void>{
        const tour=await this.findBySlug(slug)
        await this.tourModel.deleteOne({slug:tour.slug})    
    }
    async updatetourBySlug(slug:string,updatetourdto:UpdateTourDto):Promise<void>{
        const tour=await this.findBySlug(slug)
        await this.tourModel.updateOne({slug},{$set:{...updatetourdto}})
    }
    async updateCoverBySlug(slug:string,cover:string):Promise<void>{
        const tour=await this.findBySlug(slug)
        await this.tourModel.updateOne({slug},{$set:{imageCover:cover}})
    }
    async updateImagesBySlug(slug:string,images:string[]):Promise<void>{
        const tour=await this.findBySlug(slug)
        await this.tourModel.updateOne({slug},{$set:{images}})
    }
}

