const sendRequest = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(404).json({ message: "Not connected." });
  const decoded = jwt.verify(token, process.env.SECRET);
  const receiver = req.body;
};
