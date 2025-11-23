const express = require('express');
const router = express.Router(); // ✅ THIS LINE DEFINES `router`

router.get("/form", (req, res) => {
    console.log("GET /form hit"); // Optional debug log
    res.render('form');
});

module.exports = router;
