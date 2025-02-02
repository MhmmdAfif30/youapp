const aboutDTO = (about) => {
    return {
        image: about.image,
        displayName: about.displayName,
        gender: about.gender,
        birthday: about.birthday,
        horoscope: about.horoscope,
        zodiac: about.zodiac,
        height: about.height,
        weight: about.weight,
    };
};

module.exports = { aboutDTO };
