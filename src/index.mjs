import app from "./app.js";
import "./database.mjs";
import { PORT } from "./config.js";
import { router } from "./Routes/golfer.mjs";

const port = PORT;
const app = express();

app.use(express.json());

app.use("/golfers", golfersRouter);

// Global error handling
app.use((err, _req, res, next) => {
	res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
