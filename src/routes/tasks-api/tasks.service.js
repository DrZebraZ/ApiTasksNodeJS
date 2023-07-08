import { randomUUID } from 'node:crypto' 
import csvParser from 'csv-parser';
import { Transform } from 'stream';
import { promisify } from 'util';
import axios from 'axios'

export class TaskService{

  constructor(repository){
    this.repository = repository;
  }

  async getAllTasksService(resultValidation){
    await this.repository.getTasks(resultValidation)
  }

  async postNewTaskService(body, resultValidation){
    const { title, description } = body
    this.#verifyTitle(title, resultValidation)
    this.#verifyDescription(description, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    const date = new Date()
    const task = {
      id : randomUUID(),
      title,
      description,
      created_at: date,
      completed_at: null,
      updated_at: null
    } 
    await this.repository.postNewTask('tasks', task, resultValidation)
  }

  async putTaskService(body, params, resultValidation){
    const { title, description } = body
    const { id } = params
    this.#verifyTitle(title, resultValidation)
    this.#verifyDescription(description, resultValidation)
    this.#verifyId(id, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.repository.findTaskById(id, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    const date = new Date()
    let task = resultValidation.getResult()
    task["title"] = title
    task["description"] = description
    task["updated_at"] = date
    await this.repository.updateTask(task, resultValidation)
  }

  async deleteTaskService(params, resultValidation) {
    const { id } = params
    this.#verifyId(id, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.repository.deleteTask(id, resultValidation)
  }
  
  async completeTaskService(params, resultValidation){
    const { id } = params
    this.#verifyId(id, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    await this.repository.findTaskById(id, resultValidation)
    if (resultValidation.hasError()){
      return resultValidation
    }
    const date = new Date()
    let task = resultValidation.getResult()
    task['completed_at'] = date
    await this.repository.completeTask(task, resultValidation)
  }
  

  // async postCSVTasksService(req, resultValidation){

  //   const parser = csvParser();

  //   parser.on('data', (data) => {
  //     console.log(data)
  //   })

  //   req.socket.setTimeout(0);

  //   req.on('data', (chunk) => {
  //     parser.write(chunk);
  //   });

  //   req.on('end', () => {
  //     resultValidation.setResult('Success')
  //   });
  // }
  
  async postCSVTasksService(req, resultValidation){
    const delay = promisify(setTimeout);
    const parser = csvParser();
    const transformStream = new Transform({
      objectMode: true,
      async transform(chunk, encoding, callback) {
        // Process each CSV line with a delay
        const task = {
          title: chunk['title'],
          description: chunk['description'],
        };
        console.log(task)
        await axios.post('http://localhost:3333/tasks', task)
          .then((response) => {
            console.log('POSTOU');
          })
          .catch((error) => {
            console.error('DEU ERRO');
          });
        this.push(chunk);
        callback();
      }
    });

    req.socket.setTimeout(0);
    req.pipe(parser).pipe(transformStream).resume();
    req.on('end', () => {
      resultValidation.setResult('Success');
    });
  }

  
  #verifyDescription(description, resultValidation){
    if (!description){
      resultValidation.addError("BodyError", "No description on body")
      return resultValidation
    }else if (description.length < 5){
      resultValidation.addError("BodyError", "Description must be at least 5 characters")
      return resultValidation
    }
  }

  #verifyTitle(title, resultValidation){
    if (!title){
      resultValidation.addError("BodyError", "No title on body")
      return resultValidation
    }else if(title.length < 3){
      resultValidation.addError("BodyError", "Title must be longer than 3 characters")
      return resultValidation
    }
  }

  #verifyId(id, resultValidation){
    if (!id){
      resultValidation.addError("ID_ERROR", "No ID on params")
      return resultValidation
    }else if (id.length != 36){
      resultValidation.addError("ID_ERROR", "ID in wrong format")
      return resultValidation
    }
  }
}
