import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use(cors());

// create express app

// configure the express app to parse JSON data

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase12", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// define the schema for the user collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// define the model for the user collection
const User = mongoose.model("User", userSchema);

// define a route to handle the POST request
app.post("/signup", async (req, res) => {
  try {
    // create a new user object using the data from the request body
    const user = new User(req.body);

    // save the user object to the database
    await user.save();

    // send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);

    // send an error response
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    // find the user with the given email address
    const user = await User.findOne({ email: req.body.email });

    // check if the user exists and the password is correct
    if (user && user.password === req.body.password) {
      // send a success response
      res.status(200).json({ message: "Login successful" });
    } else {
      // send an error response
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);

    // send an error response
    res.status(500).json({ message: "Server error" });
  }
});

// define the schema for the user collection
const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
});

// define the model for the user collection
const Table = mongoose.model("Table", tableSchema);

// define a route to handle the POST request
app.post("/adduser", async (req, res) => {
  try {
    // create a new user object using the data from the request body
    const user = new Table(req.body);

    // save the user object to the database
    await user.save();

    // send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);

    // send an error response
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getuser", async (req, res) => {
  try {
    const myModels = await Table.find();
    res.status(200).send(myModels);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  const value = req.body;

  Table.findByIdAndUpdate(id, { $set: value }, { new: true })
    .then((updatedData) => {
      res.status(200).send(updatedData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.delete("/:id", async (req, res) => {
  try {
    const deletedData = await Table.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Table.findById({ _id: id });
    console.log(userindividual);
    res.status(200).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// start the server
app.listen(9005, () => {
  console.log("Server started on port 9005");
});
