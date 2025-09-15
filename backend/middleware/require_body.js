export default function requireBody(fields) {
  return (req, res, next) => {
    console.log("Incoming body:", req.body);
    if (!req.body || typeof req.body !== "object"){
      return res.status(400).send("Request body is required.")
    };

    const missing = fields.filter((field) => !(field in req.body));
    if (missing.length > 0){
      return res.status(400).send(`Missing fields: ${missing.join(", ")}`)
    };
    next();
  };
};
