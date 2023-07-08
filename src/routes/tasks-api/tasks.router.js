import { buildRoutePath } from "../../utils/buildRoutePath.js";
import { ResultValidation } from "../../utils/result-validation.js";
import { applyResult } from "../middlewares/applyResult.js";

import { Database } from "../../database/database.js";
import { TaskRepository } from "./tasks.repository.js";
import { TaskService } from "./tasks.service.js";
import { TaskController } from "./tasks.controllers.js";

const taskDatabase = new Database()
const taskRepository = new TaskRepository(taskDatabase);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService)

export const taskRoutes = [
  {
    method:"GET",
    path: buildRoutePath('/tasks'),
    handler:async (req,res)=>{
      const resultValidation = new ResultValidation()
      await taskController.getAllTasksController(resultValidation)
      applyResult(resultValidation, res, 200)
    }
  },
  {
    method: "POST",
    path: buildRoutePath('/tasks'),
    handler: async (req, res)=>{
      const resultValidation = new ResultValidation()
      await taskController.postNewTaskController(req, resultValidation)
      applyResult(resultValidation, res, 201)
    }
  },
  {
    method: "PUT",
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res)=>{
      const resultValidation = new ResultValidation()
      await taskController.putTaskController(req, resultValidation)
      applyResult(resultValidation, res, 200)
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath('/tasks/:id'),
    handler: async (req, res)=>{
      const resultValidation = new ResultValidation()
      await taskController.deleteTaskController(req, resultValidation)
      applyResult(resultValidation, res, 200)
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath('/tasks/:id/complete'),
    handler: async (req,res)=>{
      const resultValidation = new ResultValidation()
      await taskController.completeTaskController(req, resultValidation)
      applyResult(resultValidation, res, 200)
    }
  }
]
