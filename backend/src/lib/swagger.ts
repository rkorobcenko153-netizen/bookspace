import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi    from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "BookSpace API", version: "1.0.0", description: "REST API для бронирования жилья" },
    servers: [{ url: `http://localhost:${process.env.PORT ?? 3000}`, description: "Локальный сервер" }],
    components: {
      securitySchemes: {
        BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export const setupSwagger = (app: Express) => {
  const spec = swaggerJsdoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));
};
