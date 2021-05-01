import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PlayerParametersValidationPipe implements PipeTransform {
    
    transform (value: any, metadata: ArgumentMetadata) {
        
        if (!value) {
            throw new BadRequestException(`The value of the ${ metadata.data } parameter is required. `)
        }

        return value
    }
}