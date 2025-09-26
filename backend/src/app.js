const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const employeeRoutes = require("./routes/employee.routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employee", employeeRoutes);

// Swagger
const swaggerDoc = YAML.load(`${__dirname}/swagger/swagger.yaml`);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// error handler must be last
app.use(errorHandler);

module.exports = app;
