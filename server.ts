import express from 'express';
import { ApiDataSource } from './server/config/pgDb.ts';
import path from 'path';
import nocache from 'nocache';
import router from './server/routes.ts';

ApiDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json())

    app.use(nocache());
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })
    app.use("/api", router);
    console.log('Server listening on port', process.env.PORT);
    console.log(`See this at http://localhost:${process.env.PORT}`);
    return app.listen(process.env.PORT);
})