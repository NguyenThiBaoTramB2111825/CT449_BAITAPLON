// Định nghĩa các route chính cho ứng dụng

require('dotenv').config();// Quản lý biến môi trường 
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const ApiError = require("./app/api-error");


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the book lending management websiteWelcome to the Library Book Loan Management Website" });
});

 app.use("/api/contacts", require("./app/routes/contact.route"));

// app.use("/api/auth", require("./app/routes/auth.route"));

app.use("/api/products", require("./app/routes/product.route.js"));

// app.use("/api/authors", require("./app/routes/author.route"));

app.use("/api/publishings", require("./app/routes/publishing.route"));

app.use("/api/employees", require("./app/routes/employees.route"));
app.use("/api/users", require("./app/routes/user.route.js"));

// app.use("/api/details", require("./app/routes/detail.route"));

app.use("/api/images", require("./app/routes/image.route.js"));


//Xử lý lỗi 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;