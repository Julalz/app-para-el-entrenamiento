const fs = require("fs-extra");

// Funcion para borrar una imagen
const deleteImg = async (imgPath) => {
  await fs.remove(imgPath);
};

module.exports = deleteImg;
