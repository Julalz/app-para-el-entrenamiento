const fs = require("fs-extra");

const deleteImg = async (imgPath) => {
  await fs.remove(imgPath);
};

module.exports = deleteImg;
