const path = require("path");
const Imagekit = require("../libs/imagekit");
const Abouts = require("../models/aboutModels");
const { aboutDTO } = require("../utils/dto/aboutDto");
const { aboutValidation } = require("../utils/validation/aboutValidation");

let getHoroscope = (birthdate) => {
    let month = birthdate.getMonth() + 1;
    let day = birthdate.getDate();

    let horoscopeSigns = [
        { sign: "Capricorn", start: [12, 22], end: [1, 19] },
        { sign: "Aquarius", start: [1, 20], end: [2, 18] },
        { sign: "Pisces", start: [2, 19], end: [3, 20] },
        { sign: "Aries", start: [3, 21], end: [4, 19] },
        { sign: "Taurus", start: [4, 20], end: [5, 20] },
        { sign: "Gemini", start: [5, 21], end: [6, 20] },
        { sign: "Cancer", start: [6, 21], end: [7, 22] },
        { sign: "Leo", start: [7, 23], end: [8, 22] },
        { sign: "Virgo", start: [8, 23], end: [9, 22] },
        { sign: "Libra", start: [9, 23], end: [10, 22] },
        { sign: "Scorpio", start: [10, 23], end: [11, 21] },
        { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    for (let i = 0; i < horoscopeSigns.length; i++) {
        let { start, end, sign } = horoscopeSigns[i];
        if (
            (month === start[0] && day >= start[1]) ||
            (month === end[0] && day <= end[1]) ||
            (month > start[0] && month < end[0]) ||
            (month === start[0] && day <= end[1])
        ) {
            return sign;
        }
    }
    return "Unknown Horoscope";
};

let getChineseZodiac = (year) => {
    let chineseZodiacAnimals = [
        "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
    ];
    let startYear = 1900;
    let cycle = 12;
    let index = (year - startYear) % cycle;
    return chineseZodiacAnimals[index];
};

module.exports = {
    createProfile: async (req, res, next) => {
        try {
            let { error } = aboutValidation.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            let {
                displayName,
                gender,
                birthday,
                height,
                weight,
                userId
            } = req.body;

            let birthDate = new Date(birthday);
            let horoscope = getHoroscope(birthDate);
            let zodiac = getChineseZodiac(birthDate.getFullYear());

            let strFile = req.file.buffer.toString("base64");

            let { url } = await Imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile,
            });

            let newProfile = new Abouts({
                displayName,
                gender,
                birthday,
                horoscope,
                zodiac,
                height,
                weight,
                image: url,
                userId
            });

            await newProfile.save();
            let profile = await Abouts.findById(newProfile._id).populate('userId', 'username email');

            return res.status(201).json({
                status: true,
                message: "Profil has been created",
                data: aboutDTO(profile)
            });
        } catch (err) {
            next(err);
        }
    },

    updateProfile: async (req, res, next) => {
        try {
            const { error } = aboutValidation.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            const { displayName, gender, birthday, height, weight, userId } = req.body;
            const birthDate = new Date(birthday);
            const horoscope = getHoroscope(birthDate);
            const zodiac = getChineseZodiac(birthDate.getFullYear());

            let updateData = {
                displayName,
                gender,
                birthday,
                horoscope,
                zodiac,
                height,
                weight
            };

            if (req.file) {
                let strFile = req.file.buffer.toString("base64");
                let { url } = await Imagekit.upload({
                    fileName: Date.now() + path.extname(req.file.originalname),
                    file: strFile,
                });
                updateData.image = url;
            }

            const updatedProfile = await Abouts.findOneAndUpdate({ userId }, updateData).populate('userId', 'username email');

            if (!updatedProfile) {
                return res.status(404).json({
                    status: false,
                    message: "Profile not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "Profile has been updated",
                data: aboutDTO(updatedProfile)
            });
        } catch (err) {
            next(err);
        }
    },
};
