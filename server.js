const app = require('./app');

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}: http://localhost:${PORT}`);
});
