import { taskRoutes } from "./tasks-api/tasks.router.js"

function getRoutes(){
  let routes = []
  for (let route of [...taskRoutes]){
    routes.push(route)
  }
  return routes
}
export const routes = getRoutes()
