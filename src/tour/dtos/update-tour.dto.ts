import { IsLatLong, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class UpdateTourDto  {
 
    @IsString()
    @IsOptional()
    name:string
    @IsNumber()
    @IsOptional()
    duration:number
    @IsNumber()
    @IsOptional()
    maxGroupSize:number
    @IsNumber()
    @IsOptional()
    price:number
    @IsString()
    @IsOptional()
    summary:string
    @IsString()
    @IsOptional()
    description:string
    @IsString()
    @IsOptional()
    locationName:string
    @IsString()
    @IsOptional()
    address:string
    @IsLatLong()
    @IsOptional()
    latLong:string
    
}