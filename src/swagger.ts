import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const swaggerFilePath = path.resolve(__dirname, 'swagger-docs.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
