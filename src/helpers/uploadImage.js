const randomstring = require("randomstring");
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");

const uploadImage = async (id, imageData) => {
  const uploadDirectory = path.join(__dirname, "../../public/images", id);
  ensureDir(uploadDirectory);
  const image = sharp(imageData);
  const randomName = randomstring.generate(20) + ".png";

  await image
    .resize(600, 600)
    .toFormat("png")
    .toFile(path.join(uploadDirectory, randomName));

  return randomName;
};

module.exports = uploadImage;
