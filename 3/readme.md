# Employee Vacation API

## Create new Employee

Creates a new Employee with a first name and a last name

```
POST /v1/employees
```

Request body:
```
{
  "firstName": String,
  "lastName": String
}
```

Response:
```
{
  "_id": String,
  "firstName": String,
  "lastName": String
}
```

## Get all Employees

Returns a list of all employees

```
GET /v1/employees
```

Response
```
[
  {
    "_id": String,
    "firstName": String,
    "lastName": String
  },
  ...
]
```

## Get Employee details

Returns the details of an employee, vacations included (past, present and future)

```
GET /v1/employees/{:id}
```
`{:id}` is the ID of the Employee

Response
```
{
  "_id": String,
  "firstName": String,
  "lastName": String,
  "vacations": {
    "past": [
      {
        "_id": String,
        "startDate": DateString,
        "endDate": DateString,
        "comment": String
      },
      ...
    ],
    "present": [
      ...
    ],
    "future": [
      ...
    ]
  }
}
```

## Add vacation to Employee

Creates a Vacation for the specified Employee

```
POST /v1/employees/{:id}/vacations
```
`{:id}` is the ID of the Employee

Request body:
```
{
  "startDate": Timestamp,
  "endDate": Timestamp,
  "comment": String
}
```
The timestamps are in milliseconds

Response:
```
{
  "_id": String,
  "startDate": String,
  "endDate": String,
  "comment": String
}
```

## Get Employees on vacations

Return a list of Employees that are on vacation during the given period

```
GET /v1/employees/onVacation/{:startDate}/{:endDate}
```
`{:startDate}` and `{:endDate}` are the timestamps of the period in milliseconds

Response:
```
[
  {
    "_id": String,
    "firstName": String,
    "lastName": String
  },
  ...
]
```
