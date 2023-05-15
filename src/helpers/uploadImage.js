const randomstring = require("randomstring");
const path = require("path");
const sharp = require("sharp");
const { ensureDir } = require("fs-extra");

const uploadImage = async (id, imageData) => {
  const uploadDirectory = path.join(__dirname, "../../public/images", id);
  //console.log(uploadDirectory);
  ensureDir(uploadDirectory);
  const image = sharp(imageData);
  const randomName = randomstring.generate(20) + ".png";
  console.log(randomName);

  await image
    .resize(600, 600)
    .toFormat("png")
    .toFile(path.join(uploadDirectory, randomName));

  return randomName;
};

module.exports = uploadImage;
