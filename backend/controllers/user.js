const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

exports.create = async (req, res, next) => {
    try {
        if (req.body.username == undefined || req.body.password == undefined || req.body.confirmpassword == undefined || req.body.email == undefined || req.body.role == undefined) {
            return res.status(400).json({ message: 'Merci de renseigner les paramètres nécessaires.'});
        } else {
            username = req.body.username
            email = req.body.email
            role = req.body.role
        }

        const validUsernameRegex = /^[a-zA-Z0-9]+$/; // Check that username contains only alphanumerics

        if (!validUsernameRegex.test(username)) {
            return res.status(400).json({
                message: 'Merci de saisir un nom d\'utilisateur valide. (caractères alphanumériques uniquement)'
            });

        } else if (username.length > process.env.MAX_USERNAME_LENGTH) {
            return res.status(400).json({
                message: `Nom d'utilisateur trop long. ${process.env.MAX_USERNAME_LENGTH} caractères maximum.`
            });

        } else if (role != 'admin' && role != 'staff' && role != 'member') {
            return res.status(400).json({
                message: `Ce rôle n'existe pas. (Rôles : admin, staff, member)`
            });

        } else if (await User.findOne({ username: username })) { // Search user in BDD
            return res.status(400).json({
                message: `Utilisateur déjà existant.`
            });

        } else {
            const tempPass = 'admin' // Don't change for the moment
            const user = new User({
                username: username,
                password: await bcrypt.hash(tempPass, 10),
                email: email,
                isTempPassword: true,
                role: role
            });

            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé.',
                    tempPassword: tempPass
                }))
                .catch(error => {
                    res.status(400).json({ message : 'Erreur lors de la sauvegarde de l\'utilisateur dans la base de données. (voir logs)' })
                    console.log(error) // For unintended errors
                });
        }

    } catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error) // For unintended errors
    }

};

exports.login = (req, res, next) => {
    try {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user === null) {
                    res.status(401).json({ message: 'Identifiants incorrects.' })
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ message: 'Identifiants incorrects.' })
                            } else {
                                res.status(201).json({
                                    userId: user._id,
                                    token: jwt.sign(
                                        { userId: user._id, role: user.role },
                                        process.env.JWT_SECRET_TOKEN,
                                        { expiresIn: '24h' }
                                    )
                                })
                            }
                    })
                }
            })
    } catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error)
    }
};

exports.isTempPassword = (req, res, next) => {
    try {
        User.findOne({ _id: req.auth.userId })
            .then(user => {
                if (user === null) {
                    res.status(401).json({ message: 'Utilisateur introuvable.' })
                } else {
                    res.status(200).json({
                        isTempPassword: user.isTempPassword
                    })
                }
            })
    } catch (error) {
        res.status(500).json({ message : 'Erreur avec le serveur. (voir logs)' })
        console.log(error)
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const newPassword = req.body.newPassword;
        if (newPassword.length < process.env.MIN_PASSWORD_LENGTH) {
            return res.status(200).json({ message: `Mot de passe trop court, il faut minimum ${process.env.MIN_PASSWORD_LENGTH} caractères.` });
        }
        
        let user = await User.findById(req.auth.userId);

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur introuvable.' });
        }

        if (user.isTempPassword === false && (req.body.oldPassword === undefined || !(await bcrypt.compare(req.body.oldPassword, user.password)))) {
            return res.status(403).json({ message: 'Mot de passe actuel invalide.' });
        }

        user.password = await bcrypt.hash(newPassword, 10);;
        user.isTempPassword = false;

        await user.save();
        res.status(200).json({ message: 'Mot de passe modifié.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur avec le serveur. (voir logs)' });
        console.error(error);
    }
};