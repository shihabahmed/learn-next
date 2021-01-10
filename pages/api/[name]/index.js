import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export default function handler(req, res) {
    const {
        query: { name },
    } = req;

    const fileContent = fs.readFileSync(path.join(dataDirectory, name + '.json')).toString();

    // res.json(fileContent);
    res.end(fileContent);
}
