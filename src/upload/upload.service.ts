import { Injectable } from '@nestjs/common';
import {v2 as cloudinary, UpdateApiOptions, UploadApiResponse} from 'cloudinary'
import { ReadStream } from 'fs';
import internal from 'stream';

@Injectable()
export class UploadService {

    constructor(){
        cloudinary.config({
            cloud_name:'ufce',
            api_key:'398926682326138',
            api_secret:'U3xz1wK8CFKOXyk-wRA0w8jbg38'
        })
    }
    async uploadStream(readStream:ReadStream|internal.Readable,options?:UpdateApiOptions):Promise<UploadApiResponse>{
        return new Promise((resolve, reject) => {
            const cloudStream=cloudinary.uploader.upload_stream(options,function (error,fileupload){
                if (fileupload) {
                    resolve(fileupload)
                }else {
                    reject(error)
                }
            })
            readStream.pipe(cloudStream)

        })
    }

}
