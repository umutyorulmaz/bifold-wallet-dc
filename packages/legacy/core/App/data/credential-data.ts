import { Image } from '../assets/images/images';

import { AvailableCredential } from '@digicred-holdings/digicred-sdk';
import { CourseTranscriptData } from '@digicred-holdings/digicred-sdk/lib/core/vc/credential-types';

export enum CredentialTitle {
  StudentID = 'Student ID',
  TranscriptV1 = 'Student Transcript v1',
}

export interface UserData {
  name: string;
  id: string;
  gpa?: string;
  birthDate?: string;
  gender?: string;
  profileImage: string;
}

export interface Address {
  street: string;
  county: string;
  state: string;
  zipCode: number;
}

export interface Requirement {
  name: string;
  creditValue: number;
}

export interface NonRequirement {
  name: string;
}

export interface OrganizationData {
  name: string;
  address?: Address;
  websiteUrl?: string;
  orgLogo: string;
}

export interface BaseCredential {
  title: CredentialTitle;
  user?: UserData;
  organization: OrganizationData;
  expirationDate?: string;
}

export interface StudentIdCredential extends BaseCredential {
  credentialTemplate: string;
}
export interface TranscriptCredential extends BaseCredential {
  requirements: Requirement[];
  nonRequirements: NonRequirement[];
  courses: CourseTranscriptData[];
  issueDate: string;
}

export interface CredentialViewSchema {
  issuedOn: string;
  status: string;
  typeSAID: string;
  credentialSAID: string;
  title: string;
  id: string;
  issuerId: string;
  issuerName: string;
  issuerLogo: string;
  label?: string;
  data: any;
}

export interface CredentialDetailData {
  typeSAID: string;
  cardTitle: string;
  status: string;
  issuedOn: string;
  content: any;
}

export const emptyAddress: Address = {
  street: '',
  county: '',
  state: '',
  zipCode: 0,
};
export const sampleAddress: Address = {
  street: '12200 Lamar Ave',
  county: 'Overland Park',
  state: 'KS',
  zipCode: 66209,
};

export const sampleRequirements: Requirement[] = [
  { creditValue: 4, name: 'English' },
  { creditValue: 2, name: 'Fine Arts' },
  { creditValue: 3, name: 'Mathematics' },
  { creditValue: 2, name: 'Physical Education' },
  { creditValue: 3, name: 'Science' },
  { creditValue: 1, name: 'Technology' },
  { creditValue: 3, name: 'Social Science' },
  { creditValue: 2, name: 'Career Education' },
  { creditValue: 4, name: 'World Languages' },
];

export const sampleNonRequirements: NonRequirement[] = [
  { name: '40 Hours of Service Learning' },
  { name: 'Driver Education' },
  { name: 'Constitution (Public Law' },
];

export const emptyUserData: UserData = {
  name: '',
  id: '',
  birthDate: '',
  gender: '',
  profileImage:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
};

export const sampleUserData: UserData = {
  name: 'Emily Davis',
  id: '4567890123',
  birthDate: '5/8/2006',
  gender: 'Female',
  profileImage:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
};

export const emptyOrganizationData: OrganizationData = {
  name: '',
  orgLogo: '',
  address: emptyAddress,
};

export const sampleOrganizationData: OrganizationData = {
  name: 'Blue Valley North High School',
  orgLogo: Image.BVNLogo,
  address: sampleAddress,
  websiteUrl: 'www.bluevalleyk12.org/bvn',
};

export const emptyStudentIdCredential: StudentIdCredential = {
  credentialTemplate: Image.StudentId,
  organization: emptyOrganizationData,
  user: emptyUserData,
  title: CredentialTitle.StudentID,
};

export const sampleStudentIdCredential: StudentIdCredential = {
  credentialTemplate: Image.StudentId,
  expirationDate: '05/24',
  organization: sampleOrganizationData,
  user: sampleUserData,
  title: CredentialTitle.StudentID,
};

export const sampleAvailableStudentIdCredential: AvailableCredential = {
  said: '1',
  issuer_id: '1',
  issuer_name: 'neom',
  title: 'Neom',
  label: CredentialTitle.StudentID,
  logo_url: '',
};

export const sampleTranscriptCredential: TranscriptCredential = {
  title: CredentialTitle.TranscriptV1,
  requirements: sampleRequirements,
  nonRequirements: sampleNonRequirements,
  organization: sampleOrganizationData,
  issueDate: 'October 10th, 2023',
  user: sampleUserData,
  courses: [
    {
      id: '018CD120-8908-E567-895F-AC48D7A445AE',
      code: 'PHY 101',
      year: '2023-2024',
      term: 'First',
      title: 'Introduction to Physics',
      attempted: 3.0,
      earned: 2.88,
      result: 'PASS',
      letter: 'A',
      numeric: 3.84,
    },
    {
      id: '018CD120-8908-E567-895F-AC48D7A445AE',
      code: 'ENG 105',
      year: '2023-2024',
      term: 'First',
      title: 'Intermediate Style and Storytelling',
      attempted: 3.0,
      earned: 3.0,
      result: 'PASS',
      letter: 'A+',
      numeric: 4.0,
    },
    {
      id: '018CD120-8908-E567-895F-AC48D7A445AE',
      code: 'HLT 1010',
      year: '2023-2024',
      term: 'First',
      title: 'Introduction to Health',
      attempted: 3.0,
      earned: 2.76,
      result: 'PASS',
      letter: 'B+',
      numeric: 3.68,
    },
  ],
};

export interface QRScanResult {
  verifierId: string;
  oobi: string;
  aid: string;
}
