const fs = require('fs');
const path = require('path');

exports.getAll = (req, res, next) => {
  try {
    const uploadDirectory = path.join(__dirname, '../upload');

    // Lisez le contenu du répertoire d'upload
    fs.readdir(uploadDirectory, (err, files) => {
      if (err) {
        console.error('Erreur lors de la lecture du répertoire d\'upload:', err);
        return res.status(500).json({ error: 'Erreur lors de la lecture du répertoire d\'upload.' });
      }

      // Renvoyez la liste des noms de fichiers
      res.status(200).json({ files });
    });
  } catch (error) {
    console.error('Problème lors de l\'obtention des noms de fichiers (voir logs):', error);
    res.status(500).json({ message: 'Problème lors de l\'obtention des noms de fichiers (voir logs)' });
  }
};


exports.getImg = (req, res, next) => {
  try {
    const { filename } = req.params;
    const imgPath = path.join(__dirname, `../upload/${filename}`);
    res.sendFile(imgPath);
  } catch (error) {
    console.error('Problème lors de l\'obtention de l\'image (voir logs):', error);
    res.status(500).json({ message: 'Problème lors de l\'obtention de l\'image (voir logs)' });
  }
}