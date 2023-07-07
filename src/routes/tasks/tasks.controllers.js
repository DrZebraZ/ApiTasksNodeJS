export class TaskController{

  constructor(service){
    this.service = service
  }

  async getAllTasksController(resultValidation){
    await this.service.getAllTasksService(resultValidation)
  }

  async postNewTaskController(req, resultValidation){
    this.#verifyBody(req)
    if(resultValidation.hasError()){
      return resultValidation
    }
    await this.service.postNewTaskService(req.body, resultValidation)
  }

  async putTaskController(req, resultValidation){
    this.#verifyBody(req, resultValidation)
    this.#verifyParam(req, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.service.putTaskService(req.body, req.params, resultValidation)
  }

  async deleteTaskController(req, resultValidation){
    this.#verifyParam(req, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.service.deleteTaskService(req.params, resultValidation)
  }

  async completeTaskController(req, resultValidation){
    this.#verifyParam(req, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.service.completeTaskService(req.params, resultValidation)
  }

  #verifyParam(req, resultValidation) {
    if (!req.params){
      resultValidation.addError('PARAM_ERROR', 'ID required')
      return resultValidation
    }
  }

  #verifyBody(req, resultValidation){
    if (!req.body){
      resultValidation.addError('BODY_ERROR', 'Body required')
      return resultValidation
    }
  }
}
