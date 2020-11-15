// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CONTENT_API } from '../../constants';

export default (req, res) => {
    // fetch(`${CONTENT_API}/${req.query.id}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         res.statusCode = 200;
    //         res.end(JSON.stringify(data));
    //     });
    res.statusCode = 200;
    res.end({});
};
