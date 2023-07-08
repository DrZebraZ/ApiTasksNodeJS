This API was created for the first chalange of Rocketseat Ignite NodeJS Class


This is all the routes to use on the API:


GET ALL TASKS
GET localhost:3333/tasks


CREATE A TASK
Content-Type  application/json
POST localhost:3333/tasks
{
	"title":"Your Title",
	"description":"Your Description"
}


CREATE TASKS USING A CSV
Content-Type text/csv
or
Content-Type multipart/form-data
POST localhost:3333/tasks
file.csv


EDIT TASKS
Content-Type  application/json
PUT localhost:3333/tasks/886d645b-4b39-4930-8126-1ac4912d553e
{
	"title":"Your Title",
	"description":"Your Description"
}


COMPLETE A TASK
PATCH localhost:3333/tasks/:id/complete


DELETE A TASK
DELETE localhost:3333/tasks/:id


