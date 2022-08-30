import 'dotenv/config'
import './src/config'
import app from './src/app'

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

server.on('error', (err) => {
    console.log(err);
})