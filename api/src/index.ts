import app from "./app";
import { PORT } from "./configs/constant";
import { connectToMongoDB } from "./database/mongodb";

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

export default app;