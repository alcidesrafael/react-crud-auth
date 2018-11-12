const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./database.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "FB16CBF4-792C-404D-9C45-CCFC7A69678A";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (err) {
      throw err;
    }
    return decode;
  });
}

function isAuthenticated({ email, password }) {
  const user = userdb.users.find(
    item => item.email === email && item.password === password
  );

  if (!user) {
    return null;
  }
  const { password: passWordUSer, ...rest } = user;
  return rest;
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = isAuthenticated({ email, password });

  if (!user) {
    const status = 401;
    const message = "Incorrect email or password.";
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken(user);

  res.status(200).json({ ...user, accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format.";
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error accessToken is revoked.";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
