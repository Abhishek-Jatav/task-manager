import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(dto.title, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req, @Query() query) {
    return this.tasksService.findAll(req.user.userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req,
  ) {
    return this.tasksService.update(id, req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.tasksService.delete(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle')
  toggle(@Param('id') id: string, @Req() req) {
    return this.tasksService.toggle(id, req.user.userId);
  }

}