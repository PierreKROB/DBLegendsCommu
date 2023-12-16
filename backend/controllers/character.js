const multer = require('multer');
const Character = require('../models/Character');
const functions = require('../helpers/functions');

// Configurer le stockage pour multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload'); // Remplacez cela par le chemin de votre choix
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image'); // 'image' doit correspondre au champ de fichier dans votre formulaire

exports.getOne = (req, res, next) => {
    try {
        Character.findOne({ _id: req.url.replace('/', '') })
            .then(character => { res.status(200).json(character) })
            .catch(() => { res.status(404).json({ message: 'Personnage non trouvé.' }) });
    } catch (error) {
        res.status(500).json({ message: 'Problème lors de l\'obtention du personnage (voir logs)' })
        console.log(error)
    }
};

exports.getAll = (req, res, next) => {
    try {
        Character.find()
            .then((characters) => { res.status(200).json(characters) })
            .catch(() => {
                res.status(400).json({ message: 'Impossible de récupérer les personnages' });
            }
            );
    } catch (error) {
        res.status(500).json({ message: 'Problème lors de l\'obtention des personnages (voir logs)' })
        console.log(error)
    }
};

exports.create = (req, res, next) => {
    try {
        upload(req, res, function (err) {
            if (err) {
                // Gérer l'erreur de téléchargement
                res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image.' });
                console.log(err);
            }

            let escapedName, escapedpassif;

            if (req.body.name == undefined || req.body.passif == undefined || req.body.type == undefined) {
                return res.status(400).json({ message: 'Merci de renseigner les paramètres nécessaires.' });
            } else if (!['END', 'PUI', 'TEC', 'AGI', 'INT'].includes(req.body.type)) {
                return res.status(400).json({ message: 'Merci de renseigner un type valide.' });
            } else {
                escapedName = functions.htmlEscape(req.body.name).trim();
                escapedpassif = functions.htmlEscape(req.body.passif).trim();
            }

            // Votre code pour créer le personnage ici
            // Accédez au chemin de l'image téléchargée avec req.file.path

            const character = new Character({
                name: escapedName,
                type: req.body.type,
                passif: escapedpassif,
                imgUrl: req.file.path // Utilisez le chemin de l'image téléchargée ici
            });

            character.save()
                .then(() => res.status(201).json({ message: 'Personnage créé.', character: character }))
                .catch(error => {
                    res.status(500).json({
                        message: 'Erreur lors de la sauvegarde du personnage dans la base de données. (voir logs)'
                    });
                    console.log(error);
                });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)' });
        console.log(error);
    }
};