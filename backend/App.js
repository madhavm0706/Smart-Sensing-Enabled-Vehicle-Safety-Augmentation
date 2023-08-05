const app = require('./index');
const connectDatabase = require('./config/database');

const PORT = process.env.PORT || 4000;

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});


connectDatabase();



const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

