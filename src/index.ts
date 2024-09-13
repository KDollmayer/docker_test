import express from 'express';
import morgan from 'morgan';
import messageRoutes from './routes/v1/messages.routes';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './swagger';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
setupSwagger(app);
app.use('/api/v1/messages', messageRoutes);
app.get('/health', (req, res) => {
  res.json({ message: 'OK' });
});
const PORT = Number(process.env.PORT || 8080);

app.use(errorHandler);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port: ${PORT}`);
});
