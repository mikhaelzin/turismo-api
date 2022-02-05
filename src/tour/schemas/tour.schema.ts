import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
@Schema({timestamps:true})
export class Tour {
   
    @Prop({required:true})
    name: string
    @Prop({required:true,unique:true})
    slug: string
    @Prop({required:true})
    duration: number
    @Prop({required:true})
    maxGroupSize: number
    @Prop({required:true})
    price: number
    @Prop({required:true})
    summary: string
    @Prop()
    description: string
    @Prop({required:true})
    imageCover: string
    @Prop([String])
    images: string[]
    @Prop({required:true})
    locationName:string
    @Prop({required:true})
    latLong:string
    @Prop({required:true})
    address:string

}
export type TourDocument = Tour & Document
export const TourSchema = SchemaFactory.createForClass(Tour)