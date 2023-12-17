//Authorization check - Checks for access token of the user to perform operations. 
//This will be executed after req receival and before sending response
const checkTokenHeader = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    res.status(401).send({ msg: "Not Authorized" });
    return;
  }
  // The 'Bearer ' prefix is used in the 'Authorization' header for a JWT token
  const token = accessToken.split(" ")[1];
  if (!token) {
    res.status(401).send({ msg: "Not Authorized" });
    return;
  }
  next();
};

export default checkTokenHeader;
