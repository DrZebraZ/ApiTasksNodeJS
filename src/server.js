import http from 'node:http'

import { routes } from './routes/routes.js'
import { extractQueryParams } from './utils/extractQueryParams.js'
import { json } from './routes/middlewares/json.js'

const server = http.createServer(async (req, res) =>{
<<<<<<< HEAD
  if (req.headers['content-type']){
    if (req.headers['content-type'].toLowerCase().startsWith('application/json')){
=======
  console.log(req.headers)
  if (req.headers['content-type']){
    if (!req.headers['content-type'].startsWith('multipart/form-data') || !req.headers['content-type'].startsWith('text/csv')){
>>>>>>> main
      await json(req, res)
    }
  }
  
  const { method, url } = req
  const route = routes.find(route =>{
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups 
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req,res)
  }

  return res.writeHead(404).end()

})

server.listen(3333)