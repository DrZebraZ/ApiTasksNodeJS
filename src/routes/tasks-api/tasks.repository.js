export class TaskRepository{

  constructor(database){
    this.database = database;
  }

  async getTasks(resultValidation){
    const result = this.database.select('tasks')
    return resultValidation.setResult(result[1])
  }

  async postNewTask(table, data, resultValidation){
    const result = this.database.insert(table, data)
    if(!result[0]){
      resultValidation.addError('INSERT_ERROR', `${result[1]}`)
    }
    resultValidation.setResult('Created Successfully!')
  }

  async findTaskById(id, resultValidation){
    const result = this.database.select('tasks')[1]
    for (const row of result){
      if (row["id"] === id){
        resultValidation.setResult(row)
        return resultValidation
      }
    }
    resultValidation.addError("ID_ERROR", "Id not found")
    return resultValidation
  }

  async updateTask(task, resultValidation) {
    const result = this.database.update('tasks', task["id"], task)
    if(!result[0]){
      resultValidation.addError('UPDATE_ERROR', `${result[1]}`)
    }
    resultValidation.setResult('Updated Successfully')
  }

  async deleteTask(id, resultValidation){
    const result = this.database.delete('tasks', id)
    if (!result[0]){
      resultValidation.addError('DELETE_ERROR', 'Id not Found')
    }
    resultValidation.setResult('Deleted Successfully')
  }

  async completeTask(task, resultValidation){
    const result = this.database.update('tasks', task["id"], task)
    if (!result[0]){
      resultValidation.addError("UPDATE_ERROR", `${result[1]}`)
    }
    resultValidation.setResult('Completed Successfully')
  }
}
