# Employee CRUD App (React + Express + PostgreSQL)


```
employee-crud
├─ README.md
├─ backend
│  ├─ .env
│  ├─ .env.example
│  ├─ eslint.config.cjs
│  ├─ migrations
│  │  ├─ 001_create_employees_table.sql
│  │  └─ 002_seed_employees.sql
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ app.js
│     ├─ controllers
│     │  └─ employee.controller.js
│     ├─ index.js
│     ├─ middleware
│     │  ├─ errorHandler.js
│     │  └─ validateRequest.js
│     ├─ models
│     │  ├─ db.js
│     │  └─ employee.model.js
│     ├─ routes
│     │  └─ employee.routes.js
│     ├─ swagger
│     │  └─ swagger.yaml
│     └─ validators
│        └─ employee.validator.js
└─ frontend
   ├─ .env
   ├─ .env.example
   ├─ .eslintrc.json
   ├─ .prettierrc
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ index.html
   └─ src
      ├─ api
      │  └─ employeeApi.js
      ├─ app.js
      ├─ components
      │  ├─ EmployeeForm.jsx
      │  ├─ EmployeeList.jsx
      │  └─ EmployeeView.jsx
      ├─ index.js
      ├─ store
      │  ├─ employees
      │  │  ├─ employeesActions.js
      │  │  └─ employeesReducer.js
      │  └─ index.js
      └─ util
         └─ validators.js

```