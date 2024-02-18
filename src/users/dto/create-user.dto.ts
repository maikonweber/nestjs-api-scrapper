import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    lastname: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    cpf: string;
}
