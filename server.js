const express = require('express');
const cors = require('cors')
const publishersRoutes = require('./routers/publishersRoutes');

const app = express();
app.use(cors());

const port = 3000;

app.use(express.json());
app.use('/', publishersRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});