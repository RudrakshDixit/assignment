const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./routes/user.route");
const driverRouter = require("./routes/driver.route");

const PORT = process.env.PORT || 5000;

app.use("/", userRouter);
app.use("/", driverRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
