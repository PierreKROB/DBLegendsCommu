const Team = require('../models/Team');
const Character = require('../models/Character');


exports.getOne = async (req, res, next) => {
    try {
        const team = await Team.findOne({ _id: req.params.id }).populate('members characters');

        // Récupérer les détails complets des personnages avec les URL des images
        const charactersDetails = await Character.find({ _id: { $in: team.characters } });

        // Mappage pour inclure l'URL de l'image dans chaque personnage
        const charactersWithImageUrl = charactersDetails.map(character => ({
            _id: character._id,
            name: character.name,
            type: character.type,
            passif: character.passif,
            imgUrl: character.imgUrl,
        }));

        // Mappage pour obtenir uniquement le nom de chaque membre
        const membersNames = team.members.map(member => member.username);

        res.status(200).json({
            _id: team._id,
            name: team.name,
            members: membersNames,
            characters: charactersWithImageUrl,
        });
    } catch (error) {
        res.status(500).json({ message: 'Problème lors de l\'obtention de l\'équipe (voir logs)' });
        console.log(error);
    }
};


exports.getAll = async (req, res, next) => {
    try {
        const teams = await Team.find().populate('members characters');

        // Récupérer les détails complets des personnages pour chaque équipe
        const teamsWithCharacterDetails = await Promise.all(
            teams.map(async (team) => {
                const charactersDetails = await Character.find({ _id: { $in: team.characters } })
                    .catch(() => res.status(400).json({ message: 'Impossible de récupérer l\'équipe.' }));

                return {
                    _id: team._id,
                    name: team.name,
                    members: team.members,
                    characters: charactersDetails,
                };
            })
        );

        res.status(200).json(teamsWithCharacterDetails);
    } catch (error) {
        res.status(500).json({ message: 'Problème lors de l\'obtention des équipes (voir logs)' });
        console.log(error);
    }
};

exports.create = (req, res, next) => {
    try {
        if (req.body.name == undefined || req.body.members == undefined || req.body.characters == undefined) {
            return res.status(400).json({ message: 'Merci de renseigner les paramètres nécessaires.' });
        }

        const team = new Team({
            name: req.body.name,
            members: req.body.members,
            characters: req.body.characters,
            imgUrl: req.body.imgUrl
        });

        team.save()
            .then(() => res.status(201).json({ message: 'Équipe créée.', team: team }))
            .catch(error => {
                res.status(500).json({
                    message: 'Erreur lors de la sauvegarde de l\'équipe dans la base de données. (voir logs)'
                });
                console.log(error);
            });

    } catch (error) {
        res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)' });
        console.log(error);
    }
};
