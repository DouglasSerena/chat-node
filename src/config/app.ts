import route from './../routes';
import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(
    '/static',
    express.static(path.resolve(__dirname, '..', '..', 'public'))
);
app.set('views', __dirname + '/views');
app.use(route);

export default app;
