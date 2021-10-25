import {
  Language,
  Majors,
  MajorSimilarity,
  Mentee,
  Mentor,
  Skills,
  University,
  User,
} from '@prisma/client';

export type MenteeTypeCustom = User & {
  language: Language[];
  majors: Majors[];
  mentee: Mentee | null;
  skills: Skills[];
  university: University[];
};

export type MentorTypeCustom = User & {
  language: Language[];
  majors: Majors[];
  mentee: Mentee | null;
  mentor: Mentor | null;
  skills: Skills[];
  university: University[];
};

export const scoreAlgorithm = (
  mentee: MenteeTypeCustom,
  mentor: MentorTypeCustom,
  matrix: MajorSimilarity[],
) => {
  const WEIGHTS = {
    UNIVERSITY_SIMILARITY: 10,
    MAJORS_SIMILARITY: 44,
    SKILLS_SIMILARITY: 13,
    LANGUAGES_SIMILARITY: 7,

    AGE_SIMILARITY: 11,
    MAX_EDUCATION: 7,

    INT_NATIONAL_STUDENT: 3,
    YEARS_OF_EXP: 5,
  };

  const getUniScore = () => {
    let tempScore: number = 0;
    if (
      mentee.university.some(
        (x) => mentor.university.find((y) => y.name === x.name)?.name,
      )
    ) {
      tempScore = 1;
    } else if (
      mentee.university.some(
        (x) =>
          mentor.university.find((y) => y.province === x.province)?.province,
      )
    ) {
      tempScore = 0.69625;
    } else if (
      mentee.university.some(
        (x) =>
          mentor.university.find((y) => y.size_score === x.size_score)
            ?.size_score,
      )
    ) {
      tempScore = 0.4;
    } else if (
      mentee.university.some(
        (x) =>
          mentor.university.find((y) => y.language === x.language)?.language,
      )
    ) {
      tempScore = 0.248;
    } else {
      tempScore = 0.178;
    }

    console.log('UNI SCORE:', WEIGHTS.UNIVERSITY_SIMILARITY * tempScore);
    return WEIGHTS.UNIVERSITY_SIMILARITY * tempScore;
  };

  const getMatrixScore = () => {
    const mentorMajors = mentor.majors.map((x) => x.major);
    console.log('name: ', mentor.mentor?.name);
    //@ts-ignore
    console.log(mentorMajors.map((y) => matrix.map((x) => x[y])));
    //@ts-ignore

    const tempScores = mentorMajors.map((y) => matrix.map((x) => x[y]));
    const max = Math.max(...tempScores[0]);
    console.log('MATRIX MAJOR SCORE:', max * WEIGHTS.MAJORS_SIMILARITY);
    return max * WEIGHTS.MAJORS_SIMILARITY;
  };

  const getAgeGroupScore = () => {
    let tempScore: number = 0;
    const ageGroup = (age: number) => {
      if (age < 25) return 1;
      if (age <= 30) return 2;
      if (age <= 35) return 3;
      if (age <= 40) return 4;
      return 5;
    };
    const currentYear = new Date();

    const menteeAgeGroup = ageGroup(
      currentYear.getFullYear() - mentee.mentee!.birthyear,
    );
    const mentorAgeGroup = ageGroup(
      currentYear.getFullYear() - mentor.mentor!.birthyear,
    );

    const ageDifference = Math.abs(menteeAgeGroup - mentorAgeGroup);

    if (menteeAgeGroup === mentorAgeGroup) {
      tempScore = 1;
    } else if (mentorAgeGroup === 5) {
      tempScore = 0.949;
    } else if (ageDifference > 1 && ageDifference <= 2) {
      tempScore = 0.77812;
    } else if (ageDifference > 2 && ageDifference <= 3) {
      tempScore = 0.60657;
    } else if (ageDifference > 3 && ageDifference <= 4) {
      tempScore = 0.5131;
    } else if (ageDifference > 4 && ageDifference <= 5) {
      tempScore = 0.564;
    }
    console.log('AGEGROUP SCORE:', tempScore * WEIGHTS.AGE_SIMILARITY);
    return tempScore * WEIGHTS.AGE_SIMILARITY;
  };

  const getLanguageScore = () => {
    let tempScore: number = 0;
    const menteeOnlyEnglish =
      mentee.language.length === 1 && mentee.language[0].language === 'Engish';
    const mentorOnlyEnglish =
      mentor.language.length === 1 && mentor.language[0].language === 'Engish';

    if (menteeOnlyEnglish && mentorOnlyEnglish) {
      return 0.701 * WEIGHTS.LANGUAGES_SIMILARITY;
    } else if (
      (menteeOnlyEnglish && !mentorOnlyEnglish) ||
      (!menteeOnlyEnglish && mentorOnlyEnglish)
    ) {
      return 0.428571 * WEIGHTS.LANGUAGES_SIMILARITY;
    }

    // International language scoring worth more
    const nonEnglishLanguagesMentee = mentee.language.filter(
      (x) => x.language !== 'English',
    );
    const nonEnglishLanguagesMentor = mentor.language.filter(
      (x) => x.language !== 'English',
    );
    if (
      nonEnglishLanguagesMentee.some(
        (x) =>
          nonEnglishLanguagesMentor.find((y) => y.language === x.language)
            ?.language,
      )
    ) {
      tempScore = 1;
    } else if (
      nonEnglishLanguagesMentee.some(
        (x) =>
          nonEnglishLanguagesMentor.find((y) => y.country === x.country)
            ?.country,
      )
    ) {
      tempScore = 0.87142;
    } else if (
      nonEnglishLanguagesMentee.some(
        (x) =>
          nonEnglishLanguagesMentor.find((y) => y.continent === x.continent)
            ?.continent,
      )
    ) {
      tempScore = 0.71428;
    }
    console.log(
      'languages score for secondary langs: ',
      tempScore * WEIGHTS.LANGUAGES_SIMILARITY,
    );
    return tempScore * WEIGHTS.LANGUAGES_SIMILARITY;
  };

  const getInternationalScore = () => {
    let tempScore: number = 0;
    const internationalMentee = mentee.university.some(
      (x) => x.country !== 'Canada',
    );
    const internationalMentor = mentor.university.some(
      (x) => x.country !== 'Canada',
    );
    if (internationalMentee && !internationalMentor) {
      tempScore = 0.2331;
    } else if (!internationalMentee && internationalMentor) {
      tempScore = 0.415189;
    } else if (internationalMentee && internationalMentor) {
      tempScore = 1;
    } else {
      tempScore = 0.851161;
    }
    return tempScore * WEIGHTS.INT_NATIONAL_STUDENT;
  };

  const getExperienceScore = () => {
    const menteeExp = mentee.mentee!.years_experience;
    const mentorExp = mentor.mentor!.years_experience;
    if (mentorExp - menteeExp <= 0) return 0.341 * WEIGHTS.YEARS_OF_EXP;
    if (mentorExp - menteeExp === 1) return 0.74 * WEIGHTS.YEARS_OF_EXP;
    if (mentorExp - menteeExp === 2) return 0.86 * WEIGHTS.YEARS_OF_EXP;
    if (mentorExp - menteeExp === 3) return 0.84 * WEIGHTS.YEARS_OF_EXP;
    if (mentorExp - menteeExp === 4) return 0.89 * WEIGHTS.YEARS_OF_EXP;
    console.log('years exp score: ', 0.92 * WEIGHTS.YEARS_OF_EXP);
    return 0.92 * WEIGHTS.YEARS_OF_EXP;
  };

  const getMaxEducationScore = () => {
    const maxEducationMentee = mentee.mentee!.highest_education;
    const maxEducationMentor = mentor.mentor!.highest_education;
    if (maxEducationMentee === maxEducationMentor)
      return 1 * WEIGHTS.MAX_EDUCATION;
    if (maxEducationMentee > maxEducationMentor)
      return 0.87 * WEIGHTS.MAX_EDUCATION;
    return 0.7134 * WEIGHTS.MAX_EDUCATION;
  };

  const getSkillsScore = () => {
    //TODO work for multiple purposes/roles, not just first instance
    const menteeSkills = mentee.skills.map((x) => x.skill);
    const mentorSkills = new Set(mentor.skills.map((x) => x.skill));
    const menteeSkillPurpose = mentee.skills.map((x) => x.purpose)[0];
    console.log('menteeSkillPurpose: ', menteeSkillPurpose);
    const mentorSkillPurpose = new Set(mentor.skills.map((x) => x.purpose));
    const menteeSkillRole = mentee.skills.map((x) => x.purpose)[0];
    const mentorSkillRole = new Set(mentor.skills.map((x) => x.purpose));

    let skillCount: number = 0;
    for (let i = 0; i < menteeSkills.length; i++) {
      if (menteeSkills[i] in mentorSkills) {
        console.log('skill match! : ', menteeSkills[i]);
        skillCount += 1;
      }
    }

    let skillPurposeCount: number = 0;
    for (let i = 0; i < menteeSkillPurpose.length; i++) {
      if (menteeSkillPurpose[i] in mentorSkillPurpose) {
        console.log('menteeSkillPurpose match! : ', menteeSkillPurpose[i]);
        skillPurposeCount += 1;
      }
    }

    let skillRollCount: number = 0;
    for (let i = 0; i < menteeSkillRole.length; i++) {
      if (menteeSkillRole[i] in mentorSkillRole) {
        console.log('skillRollCount match! : ', menteeSkillRole[i]);
        skillRollCount += 1;
      }
    }

    if (skillCount === 3) {
      return 1 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillCount === 2) {
      return 0.9127 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillPurposeCount === 3) {
      return 0.841402 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillPurposeCount === 2) {
      return 0.7842 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillRollCount === 3) {
      return 0.75591 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillRollCount === 2) {
      return 0.712319 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillCount === 1) {
      return 0.6758 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillPurposeCount === 1) {
      return 0.64128 * WEIGHTS.SKILLS_SIMILARITY;
    }
    if (skillRollCount === 1) {
      return 0.5794 * WEIGHTS.SKILLS_SIMILARITY;
    } else return 0.4712 * WEIGHTS.SKILLS_SIMILARITY;
  };

  return Math.round(
    getUniScore() +
      getMatrixScore() +
      getAgeGroupScore() +
      getLanguageScore() +
      getInternationalScore() +
      getExperienceScore() +
      getMaxEducationScore() +
      getSkillsScore(),
  );
};
