import { v4 } from "uuid";
import { TaskListResponse, TaskRepository } from "./interfaces";
import { Task } from "../models/task";

interface CreateData {
  task: string;
  description: string;
  refUrl?: string;
  emailReminder?: boolean;
  startDate?: Date;
  goalDate?: Date;
  uid: string;
  email: string;
}

interface UpdateData {
  id: string;
  task: string;
  uid: string;
  description: string;
  refUrl: string;
  emailReminder: boolean;
  startDate: Date;
  goalDate: Date;
}

export class TaskService {
  private tr: TaskRepository;

  constructor(r: TaskRepository) {
    this.tr = r;
  }

  async addTask(t: CreateData): Promise<Task> {
    const id = v4();
    const createdTask = this.tr.create({
      id,
      task: t.task,
      description: t.description,
      refUrl: t.refUrl ?? "",
      emailReminder: t.emailReminder ?? false,
      userId: t.uid,
      startDate: new Date(),
      goalDate: new Date(),
    });

    return createdTask;
  }

  async getTasks(options: { userId: string; limit?: number; page?: number }) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const offset = (page - 1) * limit;

    const taskResponse = await this.tr.getByUser({
      uid: options.userId,
      limit,
      offset,
    });

    const pages = Math.ceil(taskResponse.count / limit);

    return { ...taskResponse, page, pages, limit };
  }

  async deleteTasks(taskIds: string[]): Promise<string[]> {
    const deletedIds = await this.tr.deleteByIds(taskIds);

    return deletedIds;
  }

  async updateTask(t: UpdateData): Promise<Task> {
    const updatedTask = this.tr.update({
      id: t.id,
      task: t.task,
      description: t.description,
      refUrl: t.refUrl,
      emailReminder: t.emailReminder,
      userId: t.uid,
      startDate: t.startDate,
      goalDate: t.goalDate,
    });

    return updatedTask;
  }
}
