import { app } from "./app.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from "./swagger.json" assert { type: "json" };

const options = {
    swaggerDefinition: swaggerDocument,
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
