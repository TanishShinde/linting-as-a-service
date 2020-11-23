import express = require('express');
import {Helper, ShellCheckResponse , ShellCheckRequest} from './helpers/helper';
const app: express.Application = express();
app.use(express.json({
    limit: '50mb'
}));
app.set('view engine', 'pug');

app.post('/check', function(req: express.Request, res: express.Response) {
    let input: ShellCheckRequest = req.body;
    if (!Helper.isValidShellCheckRequest(input)) {
        res.json({status: 'fail', message: 'Invalid request'});
        return;
    }
    let fileName: string = Helper.writeScript(input.script, input.type);
    let output: ShellCheckResponse = Helper.runShellCheck(fileName, input.type);
    if (output.status === false) {
        res.json({status: 'fail', message: 'Unknown issue occurred'});
        return;
    } else {
        res.json({status: 'success', 'shellCheckResults': output.lint});
        return;
    }
});

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!');
});

let server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

server.setTimeout(300000);