import express from 'express';
import {ComponentOne} from "./component1";

export const app = express();
const component = new ComponentOne();

/* Routes */
app.get('/', (req, res) => {
    res.send(component.createHelloWorld());
});

app.get('/error', (req, res) => {
    res.send(component.throwError('How much wood could a woodchuck chuck if a woodchuck could chuck wood?'));
});

/* Listen */
app.listen(2468, () => {
    console.log('Server started at 0.0.0.0:2468!');
});