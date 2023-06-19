const randomstring = require("randomstring");
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");

const uploadImage = async (imageData) => {
  const uploadDirectory = path.join(__dirname, "../../public/images");
  ensureDir(uploadDirectory);
  const image = sharp(imageData);
  const { format } = await image.metadata();
  const randomName = randomstring.generate(20) + `.${format}`;

  await image.resize(600, 600).toFile(path.join(uploadDirectory, randomName));

  return randomName;
};

module.exports = uploadImage;
