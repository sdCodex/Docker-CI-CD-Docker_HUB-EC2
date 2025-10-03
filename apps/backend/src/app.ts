import express from "express";
import dbClient from "@repo/db/dbClient";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    console.log("Hi")
    const users = await dbClient.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json("Something went wrong");
  }
});

app.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await dbClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(200).json("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
});

async function main() {
  try {
    await dbClient.$connect();
    console.log("DB Connected ");
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();


