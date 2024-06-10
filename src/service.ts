export const getZodiacSign = (day: number, month: number) => {
    const zodiacSigns = [
      { sign: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
      { sign: 'Tauro', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
      { sign: 'Géminis', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
      { sign: 'Cáncer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
      { sign: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
      { sign: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
      { sign: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
      { sign: 'Escorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
      { sign: 'Sagitario', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
      { sign: 'Capricornio', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
      { sign: 'Acuario', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
      { sign: 'Piscis', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 }
    ];
  
    for (const zodiac of zodiacSigns) {
      if (
        (month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay)
      ) {
        return zodiac.sign;
      }
    }
  
    return null;
  };