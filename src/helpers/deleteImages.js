const fs = require("fs-extra");
const path = require("path");
const imagesDir = path.join(__dirname, "../../public/images");
const deleteImg = async (imageName) => {
  await fs.remove(path.join(imagesDir, imageName));
};

module.exports = deleteImg;
