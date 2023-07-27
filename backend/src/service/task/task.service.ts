import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ITask } from 'src/interface/task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModal: Model<ITask>) {}

  //create Task
  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = await new this.taskModal(createTaskDto);
    return newTask.save();
  }

  //update Task
  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    const existingTask = await this.taskModal.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      { new: true },
    );
    if (!existingTask) {
      throw new NotFoundException(`Task with #${taskId} id not found`);
    }
    return existingTask;
  }

  //getAllTasks
  async getAllTasks(startValue: string): Promise<ITask[]> {
    const query = startValue
      ? { start: { $regex: `^${startValue}`, $options: 'i' } }
      : {};
    const taskData = await this.taskModal.find(query);
    if (!taskData || taskData.length === 0) {
      throw new NotFoundException('Tasks not found!');
    }
    return taskData;
  }

  //getTask  < - get single or particular task
  async getTask(taskId: string): Promise<ITask> {
    const existingTask = await this.taskModal.findById(taskId).exec();
    if (!existingTask) {
      throw new NotFoundException(`Task with #${taskId} id not found`);
    }
    return existingTask;
  }

  //deleteTask
  async deleteTask(taskId: string): Promise<ITask> {
    const deletedTask = await this.taskModal.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new NotFoundException(`Task with #${taskId} id not found`);
    }
    return deletedTask;
  }
}
