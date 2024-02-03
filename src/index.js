import app from './app.js';

async function main() {
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
}

main();