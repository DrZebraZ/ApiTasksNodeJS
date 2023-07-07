import { taskRoutes } from "./tasks/tasks.router.js"

function getRoutes(){
  let routes = []
  for (let route of [...taskRoutes]){
    routes.push(route)
  }
  return routes
}
export const routes = getRoutes()
