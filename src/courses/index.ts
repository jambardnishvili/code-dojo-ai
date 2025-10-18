// Central registry of all courses
import * as bashBasics from './bash-basics';
import * as gitFundamentals from './git-fundamentals';
import * as dockerIntro from './docker-intro';
import * as linuxUtils from './linux-utils';

export const courses = {
  'bash-basics': bashBasics,
  'git-fundamentals': gitFundamentals,
  'docker-intro': dockerIntro,
  'linux-utils': linuxUtils,
};

export const courseList = [
  bashBasics.metadata,
  gitFundamentals.metadata,
  dockerIntro.metadata,
  linuxUtils.metadata,
];
