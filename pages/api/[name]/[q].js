import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export default function handler(req, res) {
    const {
        query: { name, q },
    } = req;

    const fileContent = fs.readFileSync(path.join(dataDirectory, name + '.json')).toString();
    const jsonData = JSON.parse('' + fileContent);
    const item = jsonData.find(d => d.id == q);
    
    res.end(JSON.stringify(item));
}
