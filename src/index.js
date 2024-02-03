import app from './app.js';
import './database.js';
import { PORT } from './config.js';

async function main() {
    // app.listen(5000, () => {
    //     console.log('Server started on port 5000');
    // });
    //start the server
    app.listen(PORT);
     console.log("Server on port", PORT);
}

main();