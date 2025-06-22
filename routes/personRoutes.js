const express = require("express");
const router = express.Router();
const Person = require("./../models/Person.js");
//post route to add a person
const { jwtAuthMiddleware, generateToken } = require("./../jwt.js");

router.post("/signup", async (req, res) => {
  
  try {
    const data = req.body;
    //create a new person document using the mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("token is :", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    //Extract username and password from request body
    const { username, password } = req.body;
    //find the user by username
    const user = await Person.findOne({ username: username });
    //if user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    //generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //return token  as response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data ", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server Error" });
  }
});

//get method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from the url parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(400).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
