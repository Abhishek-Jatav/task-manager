import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  create(title: string, userId: string) {
    return this.prisma.task.create({
      data: {
        title,
        userId,
      },
    });
  }

  async findAll(userId: string, query: any) {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
    };

    if (query.status !== undefined) {
      where.status = query.status === 'true';
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    return this.prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(taskId: string, userId: string) {
    return this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async update(taskId: string, userId: string, data: any) {
    return this.prisma.task.updateMany({
      where: {
        id: taskId,
        userId,
      },
      data,
    });
  }

  async delete(taskId: string, userId: string) {
    return this.prisma.task.deleteMany({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  async toggle(taskId: string, userId: string) {

    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) return null;

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: !task.status,
      },
    });

  }

}