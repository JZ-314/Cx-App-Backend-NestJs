import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesRepsService } from './salesRepsService';
import { CreateSalesRepDto } from './dto/createSalesRepDto';
import { UpdateSalesRepDto } from './dto/updateSalesRepDto';
import { SalesRep } from './entities/salesRepEntity';

@Controller('salesReps')
export class SalesRepsController {
  constructor(private readonly salesRepsService: SalesRepsService) {}

  @Post()
  create(@Body() createSalesRepDto: CreateSalesRepDto) {
    return this.salesRepsService.create(createSalesRepDto);
  }

  @Get()
  findAll() {
    return this.salesRepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesRepsService.findOne(id);
  }

  @Post('/getByPayload')
  findByPayload(@Body() data: Partial<SalesRep>) {
    return this.salesRepsService.findAllByPayload(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalesRepDto: UpdateSalesRepDto,
  ) {
    return this.salesRepsService.update(id, updateSalesRepDto);
  }

  @Post('/delete')
  remove(@Body() params: any) {
    return this.salesRepsService.remove(params);
  }
}
