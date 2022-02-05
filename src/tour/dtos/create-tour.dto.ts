import { IsLatLong, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator"

export class CreateTourDto  {
 
    @IsString()
    @IsNotEmpty()
    name:string
    @IsNumberString()
    duration:number
    @IsNumberString()
    maxGroupSize:number
    @IsNumberString()
    price:number
    @IsString()
    @IsNotEmpty()
    summary:string
    @IsString()
    @IsNotEmpty()
    description:string
    @IsString()
    @IsNotEmpty()
    locationName:string
    @IsString()
    @IsNotEmpty()
    address:string
    @IsLatLong()
    latLong:string
    
}