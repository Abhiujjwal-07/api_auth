const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

router.post(
  "/signup",
  [
    check("email", "Please provide valid Email").isEmail(),

    check(
      "password",
      "please provide password greater then 5 character"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { password, email } = req.body;
    console.log("signup1");

    const errors = validationResult(req); //validte the input

    if (!errors.isEmpty()) {
      console.log("errorr ch");
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let user = users.find((user) => {
      return user.email === email;
    });
    console.log("signup2");
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "This user already exsist",
          },
        ],
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedpassword,
    });
    const token = await JWT.sign(
      {
        email,
      },
      "hhhihi4hi3h43h4h34nngjij98jjj",
      {
        expiresIn: 3600000,
      }
    );

    res.json({
      token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    console.log("c1");
    return user.email === email;
  });

  if (!user) {
    console.log("c2");
    return res.status(400).json({
      errors: [
        {
          msg: "invalid credentials1",
        },
      ],
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("c3");
    return res.status(400).json({
      errors: [
        {
          msg: "invalid credentials2",
        },
      ],
    });
  }
  const token = await JWT.sign(
    {
      email,
    },
        "hhhihi4hi3h43h4h34nngjij98jjj"
    ,
    {
      expiresIn: 3600000,
    }
  );
  res.json({
    token,
  });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
