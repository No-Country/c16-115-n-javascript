import fs from "fs";
import path from "path";

export const cleaner = async () => {
  /* const uploadFolderPath = path.join(uploadFolderPath, '..', '..', 'uploads') */
  /* const uploadFolderPath = new URL("../uploads", import.meta.url).pathname; */

  /* return fs.readdir(uploadFolderPath, (err, files) => {
    if (err) {
      console.error("Error al leer los archivos: "), err;
    } else {
      files.forEach((file) => {
        const filePath = path.join(uploadFolderPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error al eliminar el archivo: "), err;
          } else {
            console.log(`Archivo ${filePath} eliminado con éxito`);
          }
        });
      });
    }
  }); */
  const uploadFolderPath = getUploadFolderPath();

  const files = await fs.readdirSync(uploadFolderPath);

  for (const file of files) {
    const filePath = path.join(uploadFolderPath, file);
    await fs.unlinkSync(filePath);
  }
};

function getUploadFolderPath() {
  if (import.meta.url) {
    return new URL("../uploads", import.meta.url).pathname;
  } else {
    return path.join(__dirname, "..", "..", "uploads");
  }
}
