import { PartialType } from '@nestjs/swagger';
import { CreateFutbolDto } from './create-futbol.dto';

export class UpdateFutbolDto extends PartialType(CreateFutbolDto) {}
