import express from 'express';
import { envConfig } from './env/env';
import { dataSource } from './data-source';
import { requestRouter } from './requests/requestst.router';

const port = envConfig.get('API_PORT');

var app = express();
app.use(express.json());
app.use("/requests", requestRouter);


app.get('/', (req, res) => {
	res.send('Hello, World!');
});

async function main() {
	dataSource.initialize().then(() => {
		console.log("Database connected");
	}).catch((error) => {
		console.error("Database connection failed", error);
	});

	app.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}`);
	});

}

main();