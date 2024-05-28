import { IsBoolean, IsString } from 'class-validator';
export class RoomDto {
  @IsString()
  typeRoom: string;
  @IsString()
  advantagesRoom: string;
  @IsString({ message: 'Данное поле не может быть числом' })
  squareRoom: string;
  @IsBoolean()
  isActive: boolean;
}
