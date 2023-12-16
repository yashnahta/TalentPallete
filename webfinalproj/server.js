const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const axios=require("axios");
const cookieParser=require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
const postRouter = require('./api/routes/postRouter');
const jobsRouter = require('./api/routes/jobsRouter');


const allowedOrigins = ["https://talent-palette-ba48afc325ca.herokuapp.com","http://3.134.245.199","ws://3.134.245.199:3001/ws","http://localhost:3000/user/abc@northeastern.edu","http://localhost:3001", "http://localhost:3000","http://localhost:3000/email","localhost","http://3.134.245.199:3000","http://3.134.245.199:3001"]; // Add your actual domain here

const User = require('./api/models/userModel');
const applicationRouter = require("./api/routes/applicationRouter");
const userRouter = require("./api/routes/userRouter");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["POST","GET","PUT","DELETE"],
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

axios.defaults.withCredentials = true;

mongoose.connect("mongodb+srv://webd:webd@dbwebd.hvwp00i.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    name: "cookie.sid",
    secret: "key777",
    secure: false,
    maxAge: 1000 * 60 * 60 * 7,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://webd:webd@dbwebd.hvwp00i.mongodb.net/",
    }),
  })
);


app.use('/application',applicationRouter);
app.use('/post', postRouter);
app.use('/jobs', jobsRouter);
// app.use('/user',userRouter);
// app.use('/profile/about', profileAbout);

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    if(user){
      req.session.email1 = user.email;
      req.session.role1 = user.role;
      await req.session.save(); // Save the session after setting data
  
  //  console.log(req.session.email1+"s");
    }

    res.status(200).json({ message: "Login successful", user });
  
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
});
app.get("/", (req, res) => {
  if (req.session.email1) {
    console.log("logged in");
   // return res.status(200).send(req.session.email1);
    return res.json({ valid: true, email: req.session.email1 ,role:req.session.role1 });
  } else {
    console.log("dhccchs");
    return res.json({valid: false});
  }
});
app.post("/logout", async (req, res, next) => {
  try {
    await req.session.destroy();
  } catch (err) {
    console.error("Error logging out:", err);
    return next(new Error("Error logging out"));
  }

  return res.status(200).send("loggedOut");
});

app.post("/user/create", async (req, res) => {
  try {
    const { fullName, role, email, password } = req.body;

    const emailRegex = /^(?!^\s*$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const passwordRegex = /^(?!^\s*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password format" });
    }
    const fullNameRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
    if (!fullNameRegex.test(fullName)) {
      return res
        .status(400)
        .json({ message: "Full name must contain only letters and spaces." });
    }
    const roleRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
    if (!roleRegex.test(role)) {
      return res
        .status(400)
        .json({ message: "Role must contain only letters and spaces." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      role,
      email,
      password: hashedPassword,
    });
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(404).json({ message: "User exists" });
    }

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// app.post("/", async (req, res, next) => {
//   const { name } = req.body;
//   req.session.user = {
//     name,
//     isLoggedIn: true,
//   };

//   try {
//     await req.session.save();
//   } catch (err) {
//     console.error("Error saving to session storage: ", err);
//     return next(new Error("Error creating user"));
//   }

//   res.status(200).send();
// });


app.put("/user/edit", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!fullName) {
      return res.status(400).json({ message: "Full name cant be emmpty." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password cant be emmpty." });
    }

    if (fullName) {
      const fullNameRegex = /^(?!^\s*$)[A-Za-z\s]+$/;
      if (!fullNameRegex.test(fullName)) {
        return res
          .status(400)
          .json({ message: "Full name must contain only letters and spaces." });
      }
      user.fullName = fullName;
    }

    if (password) {
      const passwordRegex = /^(?!^\s*$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Invalid password format" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.delete("/user/delete", async (req, res) => {
  try {
    const { email } = req.body;

    const result = await User.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred: " + error.message });
  }
});

app.get("/user/getAll", async (req, res) => {
  try {
    const users = await User.find({}, "fullName role email password profileImage");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.put("/user/profile", async (req, res) => {
  try {
    const { email, coverImage, profileImage, fullName, about, skills, gigsInfo } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the 'about' field if provided
    if (about) {
      user.about = about;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    // Update the 'skills' field if provided
    if (skills) {
      user.skills = skills;
    }

    // Update the 'profileImage' field if provided
    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (coverImage) {
      user.coverImage = coverImage;
    }

    if (gigsInfo) {
      user.gigsInfo = gigsInfo;
    }

    await user.save();

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// Node.js backend using Express
app.get("/user/profile/:email", async (req, res) => {
  try {
    // Assuming you are getting the user's email from a session or a token
    const email = req.params.email; // Replace with your session or token parsing logic



    const user = await User.findOne({ email }, 'fullName about skills profileImage coverImage gigsInfo _id role email');

 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

app.get('/user/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
