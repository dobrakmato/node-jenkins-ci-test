import express from 'express';
import {ComponentOne} from "./component1";
import fs from "fs";

export const app = express();
const component = new ComponentOne();

/* Write PID file. */
const pidFile = __dirname + '/../app.pid';
fs.writeFileSync(pidFile, '' + process.pid);

/* Routes */
app.get('/', (req, res) => {
    res.send(component.createHelloWorld());
});

app.get('/error', (req, res) => {
    res.send(component.throwError('How much wood could a woodchuck chuck if a woodchuck could chuck wood?'));
});

app.get('/slowrequest', (req, res) => {
    setTimeout(() => {
        res.send({
            response: 'after 10 seconds'
        });
    }, 1000 * 10);
});

/* Listen */
const server = app.listen(5001, () => {
    console.log('Server started at 0.0.0.0:5001!');
});

/* Handle termination */
process.on('SIGINT', () => {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");

    // stop accepting new connections and finish existing requests.
    server.close(() => {
        console.log("Exiting...");
        fs.unlinkSync(pidFile);
    });
});