const multer = require("multer");
const { existsSync, mkdirSync } = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filepath = `upload/${req.body.location}`
    if (!existsSync(filepath)) {
        mkdirSync(filepath, { recursive: true })
    }
    cb(null, filepath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
module.exports = multer({ storage: storage })