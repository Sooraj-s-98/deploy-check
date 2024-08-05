import app from './app.js';
import { connectToDatabase } from './db/connections.js';
const PORT = process.env.PORT || 8800;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server Open and Connected to DB"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map