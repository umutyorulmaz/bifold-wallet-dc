import { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import { Icon } from '../assets/icons/icons'
import { Image } from '../assets/img/images'

export enum InstitutionCategoryType {
  Education = 'education',
  Employers = 'employers',
  StateGovernment = 'state-government',
  Military = 'military',
}

interface InstitutionCategory {
  type: InstitutionCategoryType
  displayName: string
  icon: FC<SvgProps>
  institutions: InstitutionDetail[]
}

export interface InstitutionDetail {
  id: string
  name: string
  iconUrl: string
  bannerImage?: string
  cardImage?: any
  description: string
  address?: string
  invitationLink?: string
}

export const InstitutionRegistry: InstitutionCategory[] = [
  {
    type: InstitutionCategoryType.Education,
    displayName: 'Education',
    icon: Icon.GraduationOutline,
    institutions: [
      //TODO:  Region has been prepended to the name field to assist in filtering institutions by a particular geographical region.
      {
        id: '01',
        name: 'FL|Miami Dade College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Miami_Dade_College_logo.svg/1200px-Miami_Dade_College_logo.svg.png',
        description: `Miami Dade College is a public college in Miami, Florida. Founded in 1959, it has a total of eight campuses and twenty-one outreach centers throughout Miami-Dade County. It is the largest college in the Florida College System with more than 100,000 students.`,
        address: '300 NE 2nd Ave, Miami, FL',
        bannerImage: 'https://www.mdc.edu/padron/img/padron-at-night.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '02',
        name: 'FL|Florida International University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Florida_Internation_University_seal.svg/180px-Florida_Internation_University_seal.svg.png',
        description: `Florida International University is a public research university with its main campus in University Park, Florida. Founded in 1965 by the Florida Legislature, the school opened its doors to students in 1972.`,
        address: '11200 SW 8th St, Miami, FL',
        bannerImage: 'https://www.miamiandbeaches.com/getmedia/b55086c8-eff3-401b-aa1f-5919c61cecec/fiu-1440x900.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '03',
        name: 'NC|North Carolina State University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/North_Carolina_State_University_seal.svg/1024px-North_Carolina_State_University_seal.svg.png',
        description:
          'North Carolina State University is a public land-grant research university in Raleigh, North Carolina, United States. Founded in 1887 and part of the University of North Carolina system, it is the largest university in the Carolinas.',
        address: '2101 Hillsborough Street, Raleigh, NC',
        bannerImage: 'https://www.ncsu.edu/wp-content/uploads/2021/03/nc-state-2017-review-spot-1024x576.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '04',
        name: 'LA|Los Angeles Unified School District',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LAUSD_seal_2022.png/440px-LAUSD_seal_2022.png',
        description:
          'Los Angeles Unified School District (LAUSD) is a public school district in Los Angeles, California, United States. It is the largest public school system in California in terms of number of students and the 2nd largest public school district in the United States, with only the New York City Department of Education having a larger student population. During the 2022–2023 school year, LAUSD served 565,479 students, including 11,795 early childhood education students and 27,740 adult students.',
        address: '333 South Beaudry Ave Los Angeles, CA 90017',
        bannerImage: 'https://s7d2.scene7.com/is/image/TWCNews/2022-01-12-lausd-lawsuit-la_01122022',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '05',
        name: 'LA|University of California, Los Angeles',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/300px-The_University_of_California_UCLA.svg.png',
        description:
          'Los Angeles Unified School District (LAUSD) is a public school district in Los Angeles, California, United States. It is the largest public school system in California in terms of number of students and the 2nd largest public school district in the United States, with only the New York City Department of Education having a larger student population. During the 2022–2023 school year, LAUSD served 565,479 students, including 11,795 early childhood education students and 27,740 adult students.',
        address: '405 Hilgard Avenue, Los Angeles, CA',
        bannerImage: 'https://media.cybernews.com/2023/10/UCLAImage_1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '06',
        name: 'LA|Pomona College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Pomona_College_seal.svg/220px-Pomona_College_seal.svg.png',
        description:
          'Pomona College is a private liberal arts college in Claremont, California. It was established in 1887 by a group of Congregationalists who wanted to recreate a "college of the New England type" in Southern California. In 1925, it became the founding member of the Claremont Colleges consortium of adjacent, affiliated institutions.',
        address: '333 N College Way, Claremont, CA 91711',
        bannerImage:
          'https://www.pomona.edu/sites/default/files/images/paragraphs/smith-campus-center-aerial-night.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '07',
        name: 'LA|Claremont McKenna College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Claremont_McKenna_College_Seal.svg/280px-Claremont_McKenna_College_Seal.svg.png',
        description:
          'Claremont McKenna College (CMC) is a private liberal arts college in Claremont, California. It has a curricular emphasis on government, economics, public affairs, finance, and international relations. CMC is a member of the Claremont Colleges consortium.',
        address: '888 N Columbia Ave, Claremont, CA 91711',
        bannerImage: 'https://www.cmc.edu/sites/default/files/about/images/20170213-cube.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '08',
        name: 'LA|Harvey Mudd College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Harvey_Mudd_College_seal.svg/400px-Harvey_Mudd_College_seal.svg.png',
        description:
          'Harvey Mudd College (HMC) is a private liberal arts college in Claremont, California, focused on science and engineering. It is part of the Claremont Colleges, which share adjoining campus grounds and resources. The college enrolled 902 undergraduate students as of 2021 and awards the Bachelor of Science degree. Admission to Harvey Mudd is highly competitive, and the college maintains a competitive academic culture.',
        address: '301 Platt Blvd, Claremont, CA 91711',
        bannerImage: 'https://www.hmc.edu/about/wp-content/uploads/sites/2/2023/05/Feature_768x450_photo.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '09',
        name: 'LA|Occidental College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Occidental_College_Seal.svg/260px-Occidental_College_Seal.svg.png',
        description:
          'Occidental College (informally Oxy) is a private liberal arts college in Los Angeles, California. Founded in 1887 as a coeducational college by clergy and members of the Presbyterian Church, it became non-sectarian in 1910. It is one of the oldest liberal arts colleges on the West Coast of the United States.',
        address: '1600 Campus Rd, Los Angeles, CA 90041',
        bannerImage: 'https://www.oxy.edu/sites/default/files/News_USNWR23_1440x800-2.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '10',
        name: 'LA|University of Southern California',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/University_of_Southern_California_seal.svg/300px-University_of_Southern_California_seal.svg.png',
        description:
          'The University of Southern California (USC, SC, Southern Cal[a] or SoCal) is a private research university in Los Angeles, California. Founded in 1880 by Robert Maclay Widney, it is the oldest private research university in California. The university is composed of one liberal arts school, the Dornsife College of Letters, Arts and Sciences, and 22 undergraduate, graduate, and professional schools, enrolling roughly 21,000 undergraduate and 28,500 post-graduate students from all fifty U.S. states and more than 115 countries. It is a member of the Association of American Universities, which it joined in 1969.',
        address: '3551 Trousdale Pkwy, Los Angeles, CA',
        bannerImage:
          'https://media.cnn.com/api/v1/images/stellar/prod/220727174432-university-of-southern-california-file.jpg?c=original',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '11',
        name: 'LA|Los Angeles Community College District',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Los_Angeles_Community_College_District_Logo.png',
        description:
          'The Los Angeles Community College District (LACCD) is the community college district serving Los Angeles, California, and some of its neighboring cities and certain unincorporated areas of Los Angeles County. Its headquarters are in Downtown Los Angeles. Over the past seventy-seven years, LACCD has served as educator to more than three million students.',
        address: '6201 Winnetka Ave. Woodland Hills, CA 91371',
        bannerImage: 'https://www.gafcon.com/wp-content/uploads/2022/01/LACCD2.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '12',
        name: 'LA|California Institute of Technology',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_California_Institute_of_Technology.svg/300px-Seal_of_the_California_Institute_of_Technology.svg.png',
        description: `The California Institute of Technology (branded as Caltech) is a private research university in Pasadena, California. The university is responsible for many modern scientific advancements and is among a small group of institutes of technology in the United States which are strongly devoted to the instruction of pure and applied sciences. Due to its history of technological innovation, Caltech has been considered to be one of the world's most prestigious universities.`,
        address: '1200 E. California Blvd., Pasadena, CA 91125',
        bannerImage: 'https://images.shiksha.com/mediadata/images/1534833227phpo5CzKB.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '13',
        name: 'LA|Mt. San Antonio Community College District',
        iconUrl: 'https://www.mtsac.edu/_resources/_assets/images/mtsac-logo-bottom.png',
        description: `Mt. San Antonio College (Mt. SAC) is a public community college in Walnut, California. It offers more than 400 degree and certificate programs, 36 support programs, and more than 50 student clubs and athletic programs, including food pantry, counseling and tutoring. The college offers associate degrees, career education, community recreation courses, ESL, adult education, and youth summer programs.`,
        address: '1100 N. Grand Ave., Walnut, CA 91789',
        bannerImage: 'https://www.mtsac.edu/newsroom/news/posts/images/2017-04-27-studentsofdistinction.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '14',
        name: 'LA|California State University, Long Beach',
        iconUrl:
          'https://www.csulb.edu/sites/default/files/styles/wysiwyg_300w/public/images/lb_logo.png?itok=ish95v6v',
        description: `California State University, Long Beach (CSULB), also known in athletics as Long Beach State University (LBSU), is a public research university in Long Beach, California. The 322-acre campus is the second largest in the California State University system (CSU).[13] The university is one of the largest in the state of California by enrollment with a student body numbering 38,273 for the fall 2022 semester.`,
        address: '1250 Bellflower Blvd, Long Beach, CA',
        bannerImage: 'https://cdnassets.hw.net/ae/c2/a6eb68544e07add7e4306a3532c7/e44b5a1a6bc64819949307f192ecb525.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '15',
        name: 'LA|California State University, Northridge',
        iconUrl:
          'https://seeklogo.com/images/C/california-state-university-northridge-seal-logo-7CC00352F6-seeklogo.com.png',
        description: `California State University, Northridge (CSUN or Cal State Northridge) is a public university in the Northridge neighborhood of Los Angeles, California, United States. With a total enrollment of 38,551 students (as of Fall 2021), it has the second largest undergraduate population as well as the third largest total student body in the California State University system, making it one of the largest comprehensive universities in the United States in terms of enrollment size.`,
        address: '18111 Nordhoff Street, Northridge CA',
        bannerImage: 'https://cdn.learfield.com/wp-content/uploads/2017/10/CSUN-Slider-Picture.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '16',
        name: 'NC|Duke University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Duke_University_seal.svg/180px-Duke_University_seal.svg.png',
        description: `Duke University is a private research university in Durham, North Carolina, United States. Founded by Methodists and Quakers in the present-day city of Trinity in 1838, the school moved to Durham in 1892.`,
        address: '2080 Duke University Road, Durham, NC',
        bannerImage:
          'https://www.tclf.org/sites/default/files/styles/crop_2000x700/public/thumbnails/image/DukeUniversity_CourtesyDukeUniversity_2017_Hero-01.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '17',
        name: 'NC|University of North Carolina, Chapel Hill',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg/150px-University_of_North_Carolina_at_Chapel_Hill_seal.svg.png',
        description: `The University of North Carolina at Chapel Hill is a public research university in Chapel Hill, North Carolina. After being chartered in 1789, the university first began enrolling students in 1795, making it one of the oldest public universities in the United States.`,
        address: '2080 Duke University Road, Durham, NC',
        bannerImage: 'https://miro.medium.com/v2/resize:fit:1200/1*fG_UJJk5jN39Z_GvGOpbtA.jpegFdigicred',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '18',
        name: 'NC|University of North Carolina, Charlotte',
        iconUrl: 'https://pa-hrsuite-production.s3.amazonaws.com/1427/docs/908639.png',
        description: `The University of North Carolina at Charlotte is a public research university in Charlotte, North Carolina. UNC Charlotte offers 24 doctoral, 66 master's, and 79 bachelor's degree programs through nine colleges. It is classified among "R2: Doctoral Universities – High research activity".`,
        address: '9201 University City Blvd, Charlotte, NC',
        bannerImage: 'https://admissions.charlotte.edu/wp-content/uploads/sites/667/2023/08/Home-Carousel-Shape.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '19',
        name: 'NC|Wake Forest University',
        iconUrl: 'https://prod.wp.cdn.aws.wfu.edu/sites/73/2017/04/WFU_Univ_V_RGB.jpg',
        description: `Wake Forest University is a private research university in Winston-Salem, North Carolina, United States. Founded in 1834, the university received its name from its original location in Wake Forest, north of Raleigh, North Carolina.`,
        address: '1834 Wake Forest Rd, Winston-Salem, NC',
        bannerImage:
          'https://imageio.forbes.com/specials-images/imageserve/63d045a698efe86fe1922d84/Wait-Chapel-at-Wake-Forest-University/960x0.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '20',
        name: 'NC|University of North Carolina, Asheville',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/1/19/University_of_North_Carolina_at_Asheville_seal.png/150px-University_of_North_Carolina_at_Asheville_seal.png',
        description: `The University of North Carolina at Asheville (UNC Asheville, UNCA, or simply Asheville) is a public liberal arts university in Asheville, North Carolina, United States. UNC Asheville is the designated liberal arts institution in the University of North Carolina system. It is a member and the headquarters of the Council of Public Liberal Arts Colleges.`,
        address: '1 University Heights, Asheville, NC',
        bannerImage: 'https://new.unca.edu/wp-content/uploads/2023/09/UNCA-Drone-June-10th-2023-18.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '21',
        name: 'NC|Appalachian State University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Appalachian_State_University_logo_2.png/150px-Appalachian_State_University_logo_2.png',
        description: `Appalachian State University is a public university in Boone, North Carolina. It was founded as a teachers college in 1899 by brothers B. B. and D. D. Dougherty and the latter's wife, Lillie Shull Dougherty. The university expanded to include other programs in 1967 and joined the University of North Carolina System in 1971.`,
        address: 'John E. Thomas Hall, 287 Rivers St, Boone, NC',
        bannerImage:
          'https://images.squarespace-cdn.com/content/v1/5e9f4bd62de05567e4362a7a/1587740346692-XQ19WD4GZR58ZPS9QI44/choose-10-1400x700.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '22',
        name: 'NC|University of North Carolina, Wilmington',
        iconUrl: 'https://pbs.twimg.com/profile_images/580848581893963776/B1nCmDVD_400x400.jpg',
        description:
          'From humble beginnings in 1947 as Wilmington College, UNCW has evolved into a top doctoral and research institution with nearly 18,000 students and about 2,500 employees.',
        address: '601 S. College Road, Wilmington, NC',
        bannerImage:
          'https://uncw.edu/media/images/image-text-feature/seahawk-statue-night-20171101-dsc3841-hdr-image-text-feature.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '23',
        name: 'FL|University of Florida',
        iconUrl:
          'https://toppublicuniversities.admissionsconsultants.com/wp-content/uploads/2014/02/university-of-florida.jpg',
        description: `The University of Florida is a public land-grant research university in Gainesville, Florida. It is a senior member and flagship of the State University System of Florida. The university traces its origins to 1853 and has operated continuously on its Gainesville campus since September 1906.`,
        address: '201 Criser Hall PO Box 114000 Gainesville, FL',
        bannerImage: 'https://www.collegetransitions.com/wp-content/uploads/2021/01/florida-scaled-e1611318605901.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '24',
        name: 'FL|Florida State University',
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3c0p2teLTpLzPI9qMSChdTcjkTYTL6zLtg&usqp=CAU',
        description: `Florida State University is a public research university in Tallahassee, Florida, United States. It is a senior member of the State University System of Florida. Chartered in 1851, it is located on Florida's oldest continuous site of higher education.`,
        address: '600 W College Ave, Tallahassee, FL',
        bannerImage: 'https://news.fsu.edu/wp-content/uploads/2022/09/westcott-FIRE-ranking-2022.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '25',
        name: 'FL|University of Miami',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/University_of_Miami_seal.svg/150px-University_of_Miami_seal.svg.png',
        description: `The University of Miami is a private research university in Coral Gables, Florida. As of 2023, the university enrolled 19,593 students in two colleges and eight schools across nearly 350 academic majors and programs, including the Leonard M. Miller School of Medicine in Miami's Health District, the law school on the main campus, the Rosenstiel School of Marine, Atmospheric, and Earth Science on Virginia Key, and additional research facilities in southern Miami-Dade County.`,
        address: '1320 S Dixie Hwy, Coral Gables, FL',
        bannerImage: 'https://pbs.twimg.com/media/Ebtlkx9WkAEc-pt?format=jpg&name=4096x4096',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '26',
        name: 'FL|University of South Florida',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/University_of_South_Florida_seal.svg/150px-University_of_South_Florida_seal.svg.png',
        description: `The University of South Florida is a public research university with its main campus located in Tampa, Florida, and other campuses in St. Petersburg and Sarasota. It is one of 12 members of the State University System of Florida.`,
        address: '4202 E Fowler Ave, Tampa, FL',
        bannerImage: 'https://collegevine.imgix.net/b0fb76c8-9187-4581-baf7-185acabf88fb.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '27',
        name: 'FL|University of Central Florida',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_University_of_Central_Florida.svg/150px-Seal_of_the_University_of_Central_Florida.svg.png',
        description: `The University of Central Florida is a public research university with its main campus in unincorporated Orange County, Florida. It is part of the State University System of Florida.`,
        address: '4000 Central Florida Blvd, Orlando, FL',
        bannerImage: 'https://hems-assets.princetonreview.com/images/profilepics/1022881/201.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '28',
        name: 'FL|Florida Polytechnic University',
        iconUrl:
          'https://student-public.s3.ap-southeast-1.amazonaws.com/prod/schools/x0UjeWdVMSe1kl6Qpuf43NV1SZFs5PPBg7XMVPo2.png',
        description: `Florida Polytechnic University (Florida Poly) is a public university in Lakeland, Florida. Created as an independent university in 2012, it is the newest of the 12 institutions in the State University System of Florida. It is the state's only public polytechnic university, and focuses solely on STEM education.`,
        address: '4700 Research Way, Lakeland, FL',
        bannerImage: 'https://cdn.obe.com/wp-content/uploads/2019/07/case_study_florida_polytechnic_university.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '29',
        name: 'FL|Florida A&M University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Florida_A%26M_University_seal.svg/150px-Florida_A%26M_University_seal.svg.png',
        description: `Florida Agricultural and Mechanical University, commonly known as Florida A&M, is a public historically black land-grant university in Tallahassee, Florida.`,
        address: '1601 S Martin Luther King Jr Blvd, Tallahassee, FL',
        bannerImage: 'https://www.flbog.edu/wp-content/uploads/famu-header-1024x427-1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '30',
        name: 'FL|University of Tampa',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/UTampa_logo.png',
        description: `The University of Tampa is a private university in Tampa, Florida. It is accredited by the Southern Association of Colleges and Schools. UT offers more than 200 programs of study, including 22 master's degrees and a broad variety of majors, minors, pre-professional programs, and certificates.`,
        address: '401 W Kennedy Blvd, Tampa, FL',
        bannerImage: 'https://www.ut.edu//uploadedImages/_Site_Root/_UT_Life/Placeholder_THUMB-a_2707.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '31',
        name: 'NC|East Carolina University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/East_Carolina_University_seal.svg/1200px-East_Carolina_University_seal.svg.png',
        description:
          'Founded as a teachers college, today ECU is the only public university in the state with a dental school, medical school, and college of engineering.',
        address: 'E 5th Street, Greenville, NC',
        bannerImage:
          'https://news.ecu.edu/wp-content/pv-uploads/sites/80/2020/10/Main_Campus_Student_Center_Map_uncropped_ch_inset.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '32',
        name: 'FL|Florida Institute of Technology',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Florida_Institute_of_Technology_%28seal%29.svg/150px-Florida_Institute_of_Technology_%28seal%29.svg.png',
        description: `The Florida Institute of Technology is a private research university in Melbourne, Florida. The university comprises four academic colleges: Engineering & Science, Aeronautics, Psychology & Liberal Arts, and Business.Approximately half of FIT's students are enrolled in the College of Engineering & Science.`,
        address: '150 W University Blvd, Melbourne, FL',
        bannerImage:
          'https://www.usnews.com/dims4/USNEWS/3c4dd37/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fwww.usnews.com%2Fcmsmedia%2Ff7%2F68%2F7f14289f4df09ba7f7206f7afb32%2Foec-crop.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '33',
        name: 'FL|Nova Southeastern University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nova_Southeastern_University_seal.svg/150px-Nova_Southeastern_University_seal.svg.png',
        description: `Nova Southeastern University is a private research university with its main campus in Fort Lauderdale-Davie, Florida, United States, in the Miami metropolitan area. The university consists of 14 total colleges, offering over 150 programs of study.`,
        address: '3300 S University Dr, Fort Lauderdale, FL',
        bannerImage:
          'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/visitflorida/nova1_jpg_1200_630_ab973f14-08d5-47d1-9547-0a861045cacb.rendition.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '34',
        name: 'AZ|Eastern Arizona College',
        iconUrl: 'https://www.allhighered.com/uploaded_logos/eastern_arizona_college.jpg',
        description: `Eastern Arizona College, is a community college in Graham County, Arizona. The main campus is in Thatcher, with satellite locations in Gila County and Greenlee County. It is the oldest community college in Arizona and the only one in the state with a marching band.`,
        address: '615 N Stadium Ave, Thatcher, AZ',
        bannerImage: 'https://gilaherald.com/wp-content/uploads/2022/05/EAC-Thatcher-Campus1-735x393.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '35',
        name: 'AZ|Maricopa Community Colleges',
        iconUrl:
          'https://www.azcentral.com/gcdn/-mm-/355fe8152fd9ff0786244baf17ca705df30cfbb3/c=62-90-846-533/local/-/media/Phoenix/Phoenix/2014/12/01/635530474395365004-Maricopa-County-Community-C.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
        description: `The Maricopa County Community College District (MCCCD), also known as Maricopa Community Colleges, is a public community college district in Maricopa County, Arizona. Headquartered in Tempe, MCCCD is among the largest community college districts in the United States, serving more than 100,000 students each year in the Phoenix metropolitan area.`,
        address: '2411 W 14th St, Tempe, AZ',
        bannerImage:
          'https://www.maricopa.edu/sites/default/files/styles/pb_card/public/images/pb-image-crd/767-maricopa-history-gwcc.jpg?itok=-pI7ijVH',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '36',
        name: 'AZ|Grand Canyon University',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/3/37/Grand_Canyon_University_seal.svg',
        description: `Grand Canyon University (GCU) is a private for-profit Christian university in Phoenix, Arizona. The university offers degrees in over 200 courses of study and is administratively divided into 9 separate colleges. As of September 2023, more than 100,000 students were enrolled online and in-person, making it one of the largest Christian universities by enrollment.`,
        address: '3300 W Camelback Rd, Phoenix, AZ',
        bannerImage: 'https://www.collegeboxes.com/wp-content/uploads/2022/06/GCU-campus-1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '37',
        name: 'AZ|Arizona State University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Arizona_State_University_seal.svg/1200px-Arizona_State_University_seal.svg.png',
        description: `Arizona State University is a public research university in the Phoenix metropolitan area. Founded in 1885 as Territorial Normal School by the 13th Arizona Territorial Legislature, ASU is now one of the largest public universities by enrollment in the United States.`,
        address: '1151 S Forest Ave, Tempe, AZ',
        bannerImage: 'https://www.asu.edu/sites/default/files/2022-03/HomepageLocations-Downtown.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '38',
        name: 'AZ|University of Arizona',
        iconUrl:
          'https://images.squarespace-cdn.com/content/v1/623126b50d2dfb281caaafd3/1651197450354-RRM5NZ1G2SB05NU17Z1C/University-of-Arizona-logo.jpg',
        description: `The University of Arizona is a public land-grant research university in Tucson, Arizona. Founded in 1885 by the 13th Arizona Territorial Legislature, it was the first university in the Arizona Territory. The University of Arizona is one of three universities governed by the Arizona Board of Regents.`,
        address: '1200 E University Blvd, Tucson, AZ',
        bannerImage: 'https://www.commonapp.org/static/12ae9bb983b1451e145a5c596558527d/university-arizona_886.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '39',
        name: 'AZ|Northern Arizona University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Northern_Arizona_University_seal.svg/640px-Northern_Arizona_University_seal.svg.png',
        description: `Northern Arizona University is a public research university based in Flagstaff, Arizona. Founded in 1899, it was the final university established in the Arizona Territory. NAU is one of the three universities governed by the Arizona Board of Regents and accredited by the Higher Learning Commission.`,
        address: 'S San Francisco St, Flagstaff, AZ',
        bannerImage:
          'https://www.usnews.com/dims4/USNEWS/144e4c5/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F3a%2Fad9de107d6bdb77c34bfbeae9677fb%2FDJI_0015SummerDrone05152020.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '40',
        name: 'AZ|Arizona Western College',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Arizona_Western_College_Seal.svg/180px-Arizona_Western_College_Seal.svg.png',
        description: `Arizona Western College is a public community college in Yuma, Arizona. It offers associate degrees, occupational certificates, and transfer degrees. AWC also offers classes in Dateland, La Paz, San Luis, Somerton, and Wellton.`,
        address: '2020 S Ave 8 E, Yuma, AZ',
        bannerImage:
          'https://www.azwestern.edu/sites/default/files/styles/article_800x500_/public/images/articles/3u9p1325f.jpg?itok=v8xKQYCe',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '41',
        name: 'LA|California Polytechnic University, Pomona',
        iconUrl:
          'data:image/jpegbase64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExMWFhUXGRobGBcXGRsdIBogIh4dHiEgHSAbICghICAlIhgfITEjJSkuLi8uICAzODMtNygtLisBCgoKDg0OGhAQGzUmICU1Ly0tLS4tLS0tLS0tLS0tLS0tNS0tLS0tLTUtLS0tNS0tLS0tLy0rLS0tLS0tLS0tLf/AABEIANMA1QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgUHAwQIAgH/xABMEAACAgAEAwYDBAYFCQcFAQABAgMRAAQSIQUGMQcTIkFRYTJxgRQjQpFSYnKCobEIFTOSwRckQ1OistHh8DRjc4OTwvElREWzwxb/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAgMBBP/EACYRAQEAAgMAAQQBBQEAAAAAAAABAhEDITFBBBITUWEiMkJxsRT/2gAMAwEAAhEDEQA/ALxwYMGAMGDBgDBgwYAwY86ht79MKXP3Nb5GMPEkbsoMjrI+i0BC6VP+sYt4RRvS+xwDVJKBVkCyALNWT0HzxG8xcaXKRd4yNIbpY0rU5osdN0NlVmNnopxQ/PHasmfhEX2QhdD2rPYWQjSrggDVoUmga3a/wi1LhUvE84FigfNzBAVAVpGCKatbulU6RsSBsMB0BP2n5F8sJYMzEJHOhVlOkxsRZaRTvpUWdtmI0qSSMKOR7c07lkmi/wA4U6VkQXE29ayL1ChvpF36reypwnsR4jLRlMMA8w76m/JAR/HDdkOwGED77OSMf+7RU/3i2AhOE9tMkDzI4fNQksYZJNKSC96cL4St+Q3A2uqAwZDtikhzhl+9ny8ijvI5SFIfe2iAJVF6DT5gb23iw+Qdh/DF6nMP+1IP/aoxl/yJ8L/Qm/8AVP8AwwCP/locZqGf7xoiGWfLlVCoLGnuiCSzruSzVq6Uoqp/iHbXCHiki0mHvdMkRVu+0UbkvZFo0QoLFvMrjdzXYTw9vglzKH9tCP4pf8cLvFewF9zls4p9FlQj/aUn/dwFj8V7QsnFGJlYzRBkDyxDUkYcgAs3QkXZRbYVuBhq75dOrUNNXqsVXrfSscucZ7KOKZcE/Z++XzMDa7/d2c/3cRE3MmaWFspPbgII1WcOTCB/q1Y0pra9NgdOgoOv8GKW4D2yj7GA+j7TFEdRlZx3rKCBoCqQzNQvUybk1sMWpy1xdM3lYcylaZUDVfwn8S/usCv0wErgwYMAYMGDAGDBgwBgwYMAYMGDAGDBgwBiB5r5kXIxiRopZQdRKxBSwVVLM9MQKWhe/njBzzxV8vlw0cscLs+kSSi0WldzY+SEbb79D0xzpx/nziHECkTPZIaMLCpUuHK2tDc2UXb6eZwDL2l9peWz8YjigkICMB3tLocsp1jSzWVCEDcfG1+hV+WuT+IcUKlA7RqNIlmZtCizspNk0SfCoPX3xY/Z52MqoWfiI1N1XLg7D/xCOp/VG3qT0xaue4rBlTBE/wB2JnEUQC0oaiQtgUt1QH/OgR+VOxjJ5anzF5qX9YVGPkgO/wC8SD6DDjFx/JRTR5KOWISmwsMQvTQJOoIKTp+KsK3aFnc7l5oJWdfsH2nLM7paNCA41CTfxxvfX1oV6zPEeXCmfyucykaLvKmaC6V1pINWs/pMHUH1N4DX4Jzz9pzz5URxxBJJYz3ky967ILOiJQTp2vUTVdOmMPKXHszmJmlmzGXSEzTQLldNOHjNCnLWzEbkVVdB6bR5KC56XOpmpIllZHeONYxZQAeJ2BbS1WVFXZxo53iXA8pmmzbSZcZkkkshMjAkUToj1aWI6mgTgFvlPmTPSZvh8c/ed0Js7C8plBE7AMVDRjp3ekAE9b2xH8L5iz39YRQvJKcvJxKXu37xvhRnVoW33TdGCnYfybD2i8OTeHJ5iTS+3c5WqeTz8Wmme/mb88fP8qGTpWbIZ1QS7qTl0/Ds7bOaq9z747pzca+a5mzMUHFJkktlzy5aDX4lj/s1Jo7ADWT6Xhy5WXMBJFzGaizRWQhZY1VTVC1kVfCGU+nlV4WH7QOFMskM8MkSSM3erLlXAZti2sKptuhJO/TE/wAqcY4YYxFkZsuF8o4yqmz56TTWfUjHHWCHniItIGjcKM4MnGy03eSEbmtqVTYJs9Lxv8X4Rkc/rhnjhnaOg421x2LAtfElg31GITh/IZhzCzfaDJDDJNNDlu7Vakkuy0mrxVZqwKsb7YSOC8t59OJouYLImZ053OMD4VMbykRBwaoa0BF9CPIYDFzb2FsLk4fLqHXuZSAfkr9D8mA+eK3fiOcyQkyc8dDSy91Omru9V+KPV8J3JDLte/vjoHhvOshgbOSJqgnzaQZONRTMpYR6yT11EMwHt13FS3FOG5Di0Lo+idUZk1oRqjcddLDoensduowCZyP2nwjhqd5HI75WECbS0IoL4VP3kis1jT8IPiNYtHI5pZY0lTdZFV1+TAEfwOOYe0Ps2zHDiZFubKk7Sgbr6CQDofK+h9iaxN8u9rs2XySxEgyQiOOJe6tWQAC2fWCCoFVW+3vQdGYMGDAGDBgwBgwYMAYMGDAGFznfi8cGTzGqdIpDE+j7wI16SBp3Bu+lb3iU4lxeDLgNPPFED0Mjqt/LUReOVeds5Dmc2wykVkyyjWtkzlpnKEL+yyr0snAeOJ5rMcQzZy8E2azKPIRAk8jO1b0TZoEC7PkLxfnZx2cw8Mj76UrJmSvjkPwxjzCX0Hq3U+w2x87LOQE4bD3soBzUi/eN5Rr10Kf5nzPsBh8ljDAqwBUiiCLBB6gjzGASONc2pnMvmsvwyYnNiJmiIVgHCsAxicjSx6qCD1II9cLXLMY4iM3kVlnlyrQpKsk+syZTMX/Zl2ALEEa9j5EeZtn5S5KOSz08iaWyzRgQFmYvBblmiQHbuyTqvY9BvucbHOfPcWTYQRocxnGHhgSzW16noEgVvQGo+Q88Bny+UTJZeSTiGcM4bSZHn0hAV6COMCl33oWxNdThT4l2nTT/APYYRHDveazAPwqwV2SNTZCagTZ2G5GIVuHy5qX7RnpFzD0Sq79yiWRqiA/BRAZxUkbBWNjEi2SZZC4DbkM21ksBWuht3qqadRtNGbF9Brjx/tjly/pG5zg0ub8OezMsztripm0xw5geKNgiUpjkUgix+iOrUNzhHDY00ssKxrdsgAFJKO6mjJ8+6lXUT5LQxLwcN1UtEI6BRpN+AG0Kt+lE26NtaMDuV2zZnPwwD79g7uCCkSs5LVUtKu4Twqxvob8yMazGRhc7WsnDXCUQSwXLEmvifLzeJv3gFr2x7zvB/u9I8kzoF7VrewLPtteFocUfihe3aCNQe5WN2DhtgrvVWRfQGhv1O+NLhXO2eysogzqCRU+Nivj0dNSOCFfpe4s0Rd4n8mG9K/HlrZn4lkiwcf6wZxPkZZooV/heIzivLsEpkd4EYj7S1VRLFxBAupaNHu2I361hwyOdy+YQvDMkiWrkKw8JDGQWPwkmvir3xFcI47lswwRWImUjVC12e71UFaqca/GGHXr7Y0siZbERAM5k5u7yWcfuo9KlMyTJGdCF5n38SItxr4D8TEbYZOH9ocbAQcTy/wBlaSMElqeFlex4j1jvcaXA6EXj1DwoVUl9PGaoMAxd+p27x2LHyKijWIxpstmGlRJoJpNRZ0JVl2FBnF+NIl2CDYtuaJsZ5cUXjzUy8z8mx56HKQxzdzloXV9MX4lCFVCMD4diRe+xOFPiPEJmzycP4aJMrBkyFPdBLLsNneJyGky634m8y2qzsca3DZszw0k5S5MuN3ykp3AoUUb8E0hNiFRVHcAkDD7wvOZXiKfacvpXMIrxh2Qd7l2YEEMp3BB8jsd/I4xyxs9ejHKZeNjKcey7y/1fPLC+b7oGWJQdLWPEAG67b6TvpINVime1fssOV1ZvJqTl+skXUxe49U/ivuOjVwXkk5XNyyZieXuoZY5ogdGvNzCJi7AnxWSSO7B38/XDdyRzY3EEYyZYxBkDodXeJIjErWoAAOpUqyHcYlSm+QOfZjmsjBLK6qJT3sr5iYh1IIVWR37sUT1A38PSjfR0cgYWpBB6EGx/DHOXa/2e/YJPteWBGWdtwP8AQv5D9k+R8jt6XOdiXMaPmc1LmpYInMcKKKSINRazQABa6snc6vToF7YMY45AQCCCD0I88ZMAYMGDAGMUsoUFmIVQLJJoAepJ6Yy4WufuIZaPJTpmpo4hJG6rrIsmttK7liCQaAOAqbtw5lyUzKkDQ5mQoUZ137qnVlKuNiSC6kAn38sbvYNyP/8Akp19Rl1P5GT+ar9T6HFe8v8ABxxXindxRLDFI5dljFCOMbmvTbYeVkY6X4zxfLcOyyvLccCaIxoRmCjoopQaG1X8sBB87vJnoMxlcjIrSwun2iI6lEikajCJBspYbGj7Grxg7MuP5nMAxSwlVhDLIzJ3XdyavDBGlbrGnVib3XEPy7kclJOG4PxB48yCWnSUSOJ11WxlSQKdQ1UGFEX73hv5+5pXh2VMtBpn8MMf6T11P6qjcn0FeYwEXz/zm0DLk8mO8zkovYFhCnm7KASSBuFAJ866Ap/B+Cx5WJp80/ika5Hcl2mfr4QPE9sLUaUkQg7nGhkszFlo5MwzjMTS00k7AsJHO+lBqAtaNEVpF36DeyurMP3zxq9gjW8jEhfQDSAoI6gLv5k4qZ44z91jlvL/AE95nimYlhaaACJQ2pY9tRqgXlNGj5lUo9fESRX2DtAiSNO9yzd6fCvclWjYA3YJZSosGrWxvV74xSyNFJpr7hrUggVRHRr3sljRsg7g1iGzPDhlpQSne5SQUVZSzxk9E2/Dvdt6VfS5nNlsvHjTNxDmSWWADLxmFGNPI7jw3W0egmh5EtpofCLqoORPsueTQ1RyoCE0lgKoNWncE2DdHc9PWOXMSZU61ZHy7eEs6MzAnorkEWPINRs9aJ3zvme/SPMQSL3kCnwhdQZDVij6UOnv0vE5Z3L13HGY+PvEsmMvnY5Yird/3jaHZQAQVsKen4yaJ8uuN7mXhv2lFcKWkhB8Dg0ytXn0Y+G9iR5eeNaaFM5CmsqSrXqUGhe7AgmwDQ9ga9MY8zzHl8ogTVrYXSIbHSx5bDy29d8RtXfw+8rSlJCRGkch0hKQ+ELuQw1A9NvID33xN8F4pIJJm0RzP3zgSBiO6B3KhG/DbEkBup86GEjjXFeISAnu2RKulI6WANWkkkeoOxvETkVljjMqxsF8Ta0cKQvp+FttJ+nzOKmeU8q/wzL098azWYzFq0ol7trOX8ABFkWQACa9GJHQ7GsQGcjYP9vyi6NABdRSlCBWpaBsadihG++xs4wQczOFWV0JQEBZJEI6g7a12B2PW79qxucK4plJJSqLpeXVqH6Vgkj+PQgb37Y5cst7qLx3CHHlnnBMye7n0LILCSR7K9iioJb7uQ3V3v5Vj7neHSwuM7ktMM0Y06VBMc6i6jIA1zMxr7zYDqNwSKxzkLQfcSE6QSELHSjD1O5BNdRXXE7wfjuYy/wzd4rAoe91lTdbxkOClUL0EA7bbA43nNLNZMvs1d4rkyc+W4xlakV0kjca0DFZctMvmCNwRvTdCPqMR2V4JmVI4fle8ymThbVLmmYNNmGY6yIz0Fk+JyPYDYjFdxc4jLZgZyNSk60s8K7xzxbDagCjr1Bceo1Hobjz+Xj4nk07rMSJDLpYtCQpdPNCSLAPQ1vtXqMTdfDbG7jBw7jOV4ombypAbu3aGWMlTY3AcFSRRqwRuCPIjHO3MfDM1wXPukUjIQD3UorxxsCOh29QR5EfI4uXjfHeHcKzGWy+WTLRSGkmf/VQA62DFbYux6A2Sdz5HGftb5cTiXDvtEFPJEvfQsu+tCAWA+a+Ie4Hrjim72UcSgPDsrEs6vLoLMpNMWZmZ9motTMRqFiwd8POOWuynix+25WHMZgrlYneYIxIQOENE+QogNZ2FH1OOoI5QwDKQQRYINgj2IwGXBgwYAxQvb3mssJCqiKTMSKgYg28Ghid6/TVwNJ8luvM3lmoQ6MhLAMpUlSQRYqwRuDvsRjkrj+Rjkzy5XKot6khLK5dZZdWkyKST4WJsC9sBcn9H7lsQ5R8448eYNJflGpr/aYE/ILiQ4rzmn2jNw53Lyf1dtAJe5Zk1j+07xhuB4gqkD8NgjDdNl2ymQaPKpreDLkQpXxMieEV5kkD54TeWudM3LmMpBNAO5nVk1SqUmdo49UkpT4ViLeCq3N16YBg5B5ciycDmOUTJK5kjmPxGIqmgMx+IBVG+wqthio+aOaXzebkzKKrILhyuu9KJdNKQN7kbYHbbbyxaHarxQw5H7PEQsuaYQR1tpU/Ga9AgI26WMIceRjg1SKBSRKqj2TUfz/54nK6TldK64hlZzmKpvCWc6bFEbdLoHotg/X0nuFwrH94qDWqhhIGYawa6UGpgSL1X5DpYG9wQhHkLDUWjRSfXUZGYn2IomvU49w5eREaJVDEuxVjYCow863Ntqoe/wBDNqbkxcP5hWJ3BDd1pdkVviB1WV2s/EfXcEHoNvfBuZJJ3Co8Mab0vVqBoXvsen8fbCXNlj3xY+JB0ZxaknpspXY116bDqN8MOQ4ak6EFBHMhFsu2xvxL5g7dLP8AHC6LpJc0NJExlZtUL0r+EHT+qQdirdL8r+WNXh8SpT5c0a3RzSn2V7u62piR8uuN9OKFI0WcLbLW7DSfz6jp6+9Y0JuGIg1ZbUCDZj1Eij+iGIAI60f+GJ2nbd4xKsmUnpWjYKzEAaTa7jVp2N/kd6xW7oFb18Tge9VXXfFgZjNF8nKN77tgQbBG1Vvv/wBHCXItqCfxMbA8767+d/kfocdxrTj7lWNxHSYN9m0bbdfGCNj7Dyx74Nw4T8KljjYPNThU1AG69DW/iI32xpy5WM5csqKG0rZUC7Pn06n54l+TM3lVyR+092wRzZkCnrQHxe4rGM6nT0/KJ5i5clThES91IZe9t0UFiB94ATpvaiv54mebuBoqwP0LZiNtgARpjmar6mzV36D0xkzXHuGBgqx2dt8uGAF+8dC/PC5x/mBJdCwLKpSTV99M0l+B12Qsx1ePoDtRx2WlwuUv2x4+1W5D6itnwuo6H0J2IHT86xoZjh6R9JAEbyd6IHoCeqj9Hb3JxhMjMu56noi6N/fe2YVdKa9T0ONfMuKa9z0BZ7v97zIutI8IvcnfFbRj9Hn7ldM0LQhiwLOeoIQ711IJAHl6/XfFgdi3M6rM+QJqOW5csCQaP+kQUTsaLAdNm9cVtms5TA0CCK1AXuPnWr8gqny2OMEHEzC6TRNc0UgkUjeiu51kAE2AQb2rbfc4rG3bTL6fDCXV7dSx8Ny2XMswjijLsXlkIUWT1ZmP+ONTgnN2TzU0kGWnWV411NosirrZqpq26E9Rj20GW4nlInkjWWGQJKqt61YuvMXRHzGEPhEnDOH59iublfu9cQjWMmLK97IGZWdVoDXsLPh8/XGzzqu7QOFvwriznLkxixNAwrwhr2AO1BtS0fIYvPshjUcNiIkWSSQtLKVN07nVRH4SFKiva/PCr/SJ4JrysObUeKF9DfsP0v5MoH7xxCdg00+ZzA1zARZOIqiDSGfWWoMQNTotsaJpTorAX3gwYMAp9ovDe+yZDSSpCh1TrE2lnioh96Pwg69PRtNVvtRHYvw0TcXiIBKRB5aPWgKW/cMynFpdt+XnbLH/ADhosqI2LKiX3kg3VJG1AhGHTy1DeyVwq/0bMnc+bmrdI40B/bZmP/6xgL7xgMClg5VdQBAahYBqwD1AOkWPYemE7tCyfFGKyZCciJVqWBBGsjbnxJI6sLojw7dPMnbd7Nlk+wRPPJO8z6jL9ovUrg6WUAgFVBTYfXzwFc9rOcbMcS7pU7xMrCAVJIqSXxXsCfhVf+tij8LzM0sgXMBnSMkKuq+h6nb7ythYP895v+t+8zmdmY7S5h9J8yqnSg+gAH8Oux+wZZBEsVnwgU3Qg1swPr/z+WMssu2OWXb0XAnm9LhqveNVH0vf6E+WPOcntViVv7VgtgV4aLP0/VBArzax7RsOZY5oqa1CMM1fpKXXb9pXDfljZ1f5yo/CkRNeQZmo/wABiam18bhgkacNsG0qm3QLf0rxV9MZ8rmUVV1fEUUP060PzP8Azx4eYO5Vjt5C+vsR/Hz9sauYlgHgPXpQBJvrXnZPWj1O/XE7cm702jHFMrAElTudvnuD6+/tvvvjDkYJUFMQaFA7/wCO9fyxopnAliMEMdzq31H2UHUT868rOME2ddwCX39ELL7bVqJ+Z29L6469GP03Jl/E/lM8Vn+4ks76T89+g+d4Tzl5CFHdttZJIAq73PmB06j1xvZiRQwJVNPUMwpr2336/Miz5VeDLzHUe7Vymx8KsQNwLBY6bsgWdht1s47Oo9PH9Pjx9ZZMjzSMiqZiUOnUPCLA9AFJAHqxHTGbaMlVFLXUbVflZYkX+zbeVYy5bl7Ny6l0abY7yGzYF70KJ9zf8MTWQ7OpCytJIdtGygL4SPEPn5XeIuWM9raZ44/2wqtmQU/CNBvxf8aBF+i7nzO+Pq5rvNJUSOxpSI9Xn0U1QC/qirrriyMh2f5ZOqAnxglt7vofn8j/ADwxRcHiUUEH4fIfh6e+IvNjPD8mdVDBwfMzMoSLw3pDOTY9vDdDoKvf64muHchZh0IeWg4shQo36VdHar9P54auaOa4Ml4FTvJzuI1/D7sfIe3U/wAcVVx7mnN5lreZlF7RoSgH7t2fm2LxuefnUZZ569qwoOz/AC67SOD4VA1m6og7aj06jphkynL2XWiqgjVqFVV1R6bUfTHPscF0Sbs428nO8RBid4z4t0Yqdj7HHcuK3/JMz/h0f2SzaIcxkif+yTsqA9e6f7xL/NvywtczZfh2TllgzXEMz3Bk75sjGh027a6d1XxIT0BYeW+2InsL49LJxGdZn1NLl1JJABYxkBbrqdLtv7YdO1ngcuaSId/lctAjBzNPI6Msm9aQCEO36XvWPRjvXbG+pXmXTxHg87IjqJoGdFkXS1r4ksb1ZUH5Ucc9dnmazP2gZbKqne5hkCyMG1Q6dRMiFWBGlSxPUEWCDdY6T5MVvsgD55M/uw79AtEfo+BiDXqTeOYeF5r7BxAkxtJ3MkqaFcoxPiQFWAJDA0wodRjrjrpFoAFiSPM1Z9zQAv5DBiN5bfMHKxHN0JytuAaq+gNAAsBQYgAaroVWDAVh27ZnOMjxBkiykaJIQWbXmLdV28NERsy2l3uG38Nev6NkY+z5tvMyIPyU/wDE48dvXEZ5Y2y0cH3MGiaaZtN+I6U7sE6tNtRZR122o39/o1t9xnB/3kZ/2W/4YCT534tkos3IZs7xPLOCoPcNIIr0itI0lDt197w/cuyL9lhZZZJVKBhJNs7A7gtsN6PoMV3zzwjJPxDvMzxcwzINccLhGWIBfIOCoJrUAdyaryxYXCZhLko2SVpg8IqRl0tJa/EVoUT1qhgOZeExEwq3UsWPluST/h6377brNZVm2v8A6/Pf/rz2OF3hufqKNAwXY9CNRNn2NA/K/oN9iCGeZgFhdidIJcCjqsCtQFA6T06+ZOMMpXP/AD3Lu3X/AFIZmdEnEt9U0fM6rJs7bbAkn2xg/rDxMdKgsKVrsHb30+HYm/yu8b/DeTM1Lp1ARodFqfF4Td7GhsB06WTXUVPcM7OVA++kZtVF0DEKTqsihWxWh+eIueM+W+PBhPjZIl4kGOl3HqWjJA+lm/qb3Ow6V4y0Uk1KsTtRAQqo87qiwoWAdxua3OLY4XydloNOlAWXSdVAElSSCf738Biay+URAAqgAV0Hp0xneaTyNsepqSRUWT5RzkrKSoQHSPEb2N/hGlaFbgevzxuT8sxZdQ2ezQj1BW0LsSQ3iGlPERQqx0vD3zZxk5WC40LSMdMYAJANfEQPwqN/yHnils3DJI7yzuS58RLqxLfT6bD+WLwyufd6icsrDTwziXCIm6SHp42juyH1Buur0H0xYPATk5k1ZZkdRfTqtnVRGzDcXRxQ2Vg3Gwsk/TErwXMywSxyxEhgT06EX8J9jjvJxy+VGNv6X8qAdAMesJXBeZTNxOSK/B3TBBe1qwHQGrNOb60V8sTnNvGxk8tJNY11pjB83PT6DqfYHHmvHZZGsymtpnCzztzOMpGFQgzuPAD+EebEe3QDzPyON/gfGRNk481JSXGWf0Gm9RHtsT8sU/x3NvmJ3lk1AubCuuwX8K37Db52cVx8e8u/hzLLrpE5uYsWdyzMSSddkk/tDa7/AJY1ol8QPz/hsMbWbbfQNgCtgMWBPl+QHTHiIbj5kY9m+mOu2OIbJ/15HBGNx+y388ZIx8HyOPEY6fsH/DAOPY3IV4zlR5Mkin/0nP8A7Ri5e0nhAm+zSmXJqYXeo89vDJqUA2LFstWPmcUz2UL/APWslXpJ/CGTFydqXCpc1DFBAMoZXZtP2miQK37oEEFt99jQxePjPL1k7M+EpBHPWYy0zyy9465QIsUW2lVVU6bL1IBNeZBJoTmORIOOTvJrCLnWdjHs4HeaiU9GANj3rF7dlnK02Qikjmhy8ZOinhd2aQjVZkL+ligoA3O2KN58EbccnEraIzmQHar0rahjXnQs1inHRnIfGZM5lEnkRlskIzqEMqD4ZCgJ06vS62sbEYMe+S+OrnMqsqCgCUtVZUbTtqj1gHQfL03B3BwYBG7e+Ip9mGWWJpJ2GvUoJ7mIHxMxH4WK1R28JPVRiC/o05inzsfqsLD6GQH/AHhh+7VpMvFw+aaaw4Ro4ippmMg06P1kbqym9gT1UEVB/R/4h3fFO7J/toXQD3FP/JDgHrtG4JlEzbT5riX2cTvFIsIy4kYtEvdq3RmI3P4a3PWsWHynm45cpE8WYbMpRHfMKZiCQdQoUQdqodML/O3DF+1Q5mPPnJzmKSO+5WXvI0uVgoYeFlGo2N8TPJfD4oMpGIZWmWS5u9f4pDIdZcihV30r+OAq/kTgsKxyqYwZIszMjHztGIH5BsRnOnPQyznL5RU7xdncgaUO/hA6Fh53sNxubqU5lzx4fmuLKCF193PDf6UoCM3vT7/TFRzQkIWOr2Oq7vzNi98eace87cm33f0zSVg504hqL/aSa3oquk/SqrbFn8lc3rnVKOoSdRZUdGHTUt71exB6bdcUyq1Y9h/jiR5YzhhzeWcfpKp+TEBv4E47yceOU6juNsX/AI0s7xAICB4nAJ0dCQOpAokj5A41uOccXLgGgxuq1qK/PfCfxHiHfEvHLKrfEcvIoQn3S/CSegYMD5gk1jyYcdrTLLTS5n48ZSpXV4BRjfRe+5KMhpkIUGxR2J3qsQ/Es2rwlkOkUNWsWR57qR7dRY2xg4jxghy0oFk7ggqynYm1IsGwCeoJo7m3xqpxwEmhpI+HdCN/csK+Q+uPXjxs/va+SkBJ1KpYdClnr5mjXl6j5Y15+KlTUYAAsEEDr/eJ/jjD3DykuwUDVuyhb9wgBGs7X4b9SRd4n15aKRo5I7yTwxq6tq8XQ7NpQVvvfnWrbGn2Y/LP76jxnHgmjnhb75UjayFAAMKA3fUnUfn16nHviHME+anWWZNbRg+FRsABV6SGqj4jt5+VCrA5Z5fRI5QyUsYpX1B2DgX4I6Kk+V0Ceg88JEvDbM0im21P3ZZNOqtioAB0sKbw17g2LHet7c70sTmJhDwlI43DBlijDjcMCQWbbyYBvzxXDqUalYD9lzv81bbGxwLmNzGcnKw7vVqUkkMh3sX0qzdeV7emPPFYtJJezQNWFcbb+Qvz88YTG43Vbb3NoMPqYsfNh6epHltgj+L944+ZcbD9zGSFd/3m/ljSoj5GPh+Rx8ZaA/8ADx7QbD9g4+TjYfsDHHT12J5TXxhG/wBVA7/n4P8A+mLZ7S+WJ+ILl4oky5VJO8d5mcEUKCr3Y1U12aZfhG+Er+jrwyzm80Rt93Cp+Q1OP9zFl81T59O4+wxRSXKBN3hrSnmR4h/Cz02ONp4yvrxyVwTMZSAxZnNtmjdqWWtAr4bJLMPdjjm/iKLmuNTBimh81KfG+hSodiFL/hDAab8rx1RxTOCGGWZvhjR3PyVSx/ljlPkLhCZvOA5kM0CfeZgqaOksq2T5LqdS1UQuo2KvHXHUnL+Zhky0T5cKsWmlUADTp8JWhsCpBUgeYx8xuZLJxwxrFEioiilVdgB7AYMBp8a4LHmlUSAhkbXG4q0aiLFgg7EimBB8xjlvKcXXK8X+0o4eOPNM2tRpDprNlRvQZSaHocdYZzLiSN42vS6spokGiKNEbg79RjnDto5biyMuWSIx0Y2FKgR9IbYyafCzEsw1gC9NEbWQu/nzhUGYyyyTzyQRwN33fQnxAaWU0QCaKuegOFzs3iy0UtZHJZsQuul83mGKhgtlAiObYEmvCoq8SnZDx4ZzhsJJuSEdzJ+6AFJ+aaT87xqc4y5zO68plso0QikRvtuYYRojRsGDRKLZxtV9Ot4Bf7fuEf8AZc4o+FjDJVdG8SXe1Bg3X1GKdzBXS1hb2o6SpHiHzB/PHUHE8tDxXh0kayI8cyMqyLenWpIDDzIV0v3rHL+cgeMPE6lZI30SLqOzKaPhPy8sRlO9rxvwxqu/0OMvDx95Cf1h/PGJT4vocbXCv7WEf96o/wBoYzaLe5s4nFGvikKMPPeh71rQHr0BvFd8Q4iP0VkFatS6k/gwJB36sHO+zjph15wzMStZWUsPwjLkg+Xhd0I/um/Q4QeKTr8McbeE2VUGkPqKDkdbu1JPnjPhx6M72hMxm9bCmIA2CansfV2NV66q9hjxkcm8rG2bSDpuw1k9FB1KDfmboDfHmVmc6A0hPWRmLkAD2q6HuMWx2Y8tjbMvHojUVGCF8QrdmuzqJAY77eEDYY9PkZepDljkyKBBPMPvAFFKU0IB1AJN0ADdtvZ86pUl4j9vz8jAySxxeKtNEAEUApHlv+HE32ncz6AuXgBYstDuzVWNhsL3AuhW3zvCpyBl+6zwUhWcpuRJuCfMgjfqLH88TP2NvN8UEbyRNl3VG8ah1B6+HdAAFrT8YGxO4o4i5eHFjKsetVPiSR/i1ggMqAHeyV326+eGniXCFXMNHOklkh45HmIIUjxBSpsUNq33+ePcHAxl3RHFwmzFmEZiaII0qotVbcb2bNG9iB3YQJMoRJAwYBpWSxuCjXodW8wb+p8Xvjb48VokFfECOrKenpQv+GHPmflwsxMagS+GXuxZthsJFtQCGI8Siq3NAjdW4m2qJ23HUEFxYbzU36H0uxRHXGefsrTDywuqN/8A0/5nHtPi+r/yOPIHT5J/M49gb/V/5YV18T4f/LxizD7X+oP8cZFHh/8ALGGPs85cOe4hDERcUYWSb00qb0n9okD5Enyx2Tdct1F7dmPBTk+GQRsp7xlMsgrfU/ir5gUv0xii7RMt30OXkjzEM8sgjEU0RRgW6HfwspNLak9RtW4nOZ5cymXZ8mqvKhVu7b/SKDbID5MwsA+uFjs75sl4i0wnhiAi0MpRZB3bEt92/ejeVAASV23xsxHbdxj7PwqVQaacrEv13b/ZVh9cVT2N8lx52VpJ3kWNQdMaEr3wFCQFgb0rrQEDrrG4rG3/AEguP99nI8ohtcuviA85Ho170oX6k4eOyLkd8vDDmZs1I5pmSBSRHEWBVw17lvUCgGX8VA4CzUiAAA2A6DBjLgwBiue0jkaPMjMZtmQuMuV++1VEEDNqjKHw72xtWvcbXixsRnMHDPtWWmy+sxiVChZRZAOx6+osfXAc89hvNH2TPdxIaizVJv0Dj4D9bK/vD0xdvP8AwTN5yBYMrLFGjN9/3mu3T9AFN6PRtwSNr63Rfa5ykOHzQGMRIsiEARF+qafEVcsVvUPxtZBN4ujso5vHEcmC7f5xFSTDzO3hf94D8w2Aw8qJ/VXdZPM5wOJiRllELKiEsToEpZrvV4VY30A64VO2vlBVkXiKq3dtpTMhNII8lk8Skein931Jw08K5ClUwRZjNmXK5WTvIIVTSWYMWUzPZ1aSegoHqfTDxmcusiNHIoZHBVlO4IIog/TAczQ8BhNHTOfQrPlvP9w4muE8oQGRW/ztCpDjU+XIsEEdF9cfOa+W24VmAptspIT3MvdwsUPXu3MgAseRLAUPnU7waYddPuGaOBRsCdzGzH/48sZWaRcsp8l7miXuSzIK3NyQytHfnThAY2PkaW8JXE8wpjJTUA1E6n6+4UkH3sAjE3zhxKWaUE973Z6l4Nh6BVaxR69W33vyxH8q8uSZuQlACi9X0LpUdSWHU0Og0kk1sMVJJF4267SXJfK/fMI2sbhpySQNFWEtCRvYJDFfL6XDxDMxZTLU2mNAp8J6fKwD/AH/ABxp8r8NjiQRRj7qIknVHu7/AKVte/n4aq/O8LPaXx5E0RmV42O7A6tvQUAPqflvib3V+K+zUqZjNM7dybre6DE+xNmh+WN7j1wGCZFfSh800ppNXpXwlvLexdDfzDxyTwFzD3up2RgzVqaIsTuCCoDHyG/y3xX3OGZR01KsO7bOjFmPW7YknFS9pN3HuIw5zLx5iM5Qyp8RdgGG46Bqc113rr1Pntcl8eEhMEjIQb/sNMYQ7XZXop071f8APGlyxyZl0y0UsqTGdk1nuy4oMbHTw2ARYPvtjLm+Sb1GGWbV105pWdSR6FN/P9b5bbc3E/kmzHn5Bl2EcoJi8pGLIkbnyB0W1iqFm7I8hhL4rlleV2Si5Uak0qkcsd14KBkZ7GxrZgfcY2Zc9mEYQ56LoAEmdVKCt9jZBKkWNTX7CqxA5niciOQakTuQS5UMWDSAOVsbDyC3QVa8ycJF7/SQy/J0coZop5DVBl7i2RltirDvAQfLpRsUTjzm+UChPjm/F/8Abdb9LnGJLlOQPNNoJZI40jK6fhKyyhbVWAsqCSQdyxPU4zcXmQgu4ACizrhjX3JGtzZJJ/59TzXbO55S62VOIcDESF2eXoEVTAo1HyAqcmz8ji8OzjlpOFZJ5cwVSWQd7mGPRABYS/RBf1J9sL3Zlym07pxDMoFiXfKRaFW/SZlUDevhBv19CbN4zwyPMwSZeYXHIpVgDRr2PqOuLxmlbvyrqTMzyZuTivDhDno3VYghLrNAApDKiuVUAuFc34iCa23w457jTZLhv2nOlTLHCpkC0A0lAaVrbdjW230xB8q9n75PPPmjmTIpDgage8fXp/tnumC6NqA63itu3Pm45rMrkYCWjhbx6d9cvShXXTen5lvbFBT5W4TmuKZ8usipK0hkaVroN4n2ABtvAxC/qn0x05y1wl8rB3ck7TuWd2kZVS2YlmpV2AJJNb7k74rXsm5CzcCQ5h8zGsTMk4hRNTE6GXxOaKHS7KQNQ3OLjwBgwYMAYMGDAJ3N3I8eemEz6GKxNEElVmUWSSy6XXS+9ajqqgQLxz5wLjMvB+JSFDr7mR4ZVB2kVWKkf7Ng1sQPljrTFQdonZvEuSzUySC1aTMkvEpkLG2Yd4pU6T0oggel74CzuB8XizUCZiBtUcgsH09QfQg7EeuNnOZpIkaSRgiICzMxoADqSccv9mvPcvCptMgZstJRkj8xfSRL86+jD6EdHzpl+I5TwvrhlCsrof0WDKRY6hlGxHUUR1GAJY8rxHKlSFmy8oIPXyNedFWBHsQRikOOcAl4HK0hiM+WYEQzi7jJ20yAELdWLPXqP0Q88SzecyGbeZ2DxyERwQIDplYlmLNoBplVTI7hNTMxUArWHyDMRZhGikVC2le+gYo5TWDSyAEjej7GsCxzguXOacZiZtUIFVHqPlvY2IJ39qG/nbRlc+Z+7y0SlYAQqhGC2fLV0F/MAX0HTEjzj2NEMZ+GMFPU5dzsf2GPT5N+Y6YR+WAMrnUjzMcuVl8QYMVVDsab7z3rpd+WJsdi6Mjl1jjWME0LO93QO/nfy/5YqvifFC+Z1M7ImrSA8sKpQ28LMTJvV7+vl0w88T5jhVZCGDuI6TSaonw/GBSfpE0KHS8JHJuXLT3oiYdLQd5Y3u5GWh9AT6b4iKqy+HZPu8qAH1LoLN4mcMCvQMTde4Av0GKPlyxnzsOXpirSAsGcOdI3atO3wg7V1xeHHmVMpLYJDKRRDyj2+XX2ANeQxTfKSKc3PLSRiNNKgo0YBc+YTxXpD/8AxjuKc/FiZxzZILAWeiA9A248XSwfTyxpxZp7Nd62/wDqLr8pB1rGpPmUINtl/O7+01vt+VbVjSSXLL0bKD5HMDE6YaTmah+0QvBKkw1itXcEUbBVviY2Dv5XWEl+S83qKqkZLAqZq0jSQdRKNHq1HV8Q/wCGN/OR5dvgfKqf1RIb/vY+cCy2YzLGLIwpOOhkCyJGh6eNiQOlmlsnFTfwqb+GwmWi4fC4LaiWBZzGQCQtBVUkdNwNyTZ9cMPI/Z++bdc3n4ljhB1RZbQFMnmGlG5C9PASb89viZ+UOzeLLOMxmmGYzI3Wx93F7RqfMfpNvsDtiU5m5vTLr9yY5HBGssxVEU611M4BFa4xET0RnXVQxci5DVXkMesIfZ9wjNLJJm5My7xZlUdUkRAzAqpRn0gaZFH3bbHUApvYAZ+0jn2LhkNCnzLj7qL/AN710UfmTsPMjrqM7XufhkIO4gb/ADuVdq/0SnbWffyUeu/lRqbs05CzWdlE6TfZu70SpIylmbxOAyDYGmiINkfXGhy9wDM8YzLSSykd5KFkmYavEwYgBbHkh2FAAD2GOgeRuTTw9SGzUmY8CousABFBJAUbmrY7FqHlgJzgHDTl8ukLSd4y6rfSFsli3wjYDeqxJ4MGAMGDBgDBgwYAxqcQyKTxPDKuqORSrrZFgiiLFEfTG3gwFK9tnJka5aCWASPN30cKhnLeBg9KNW9BgK3oWcIvKfNuc4JmGhkXVFq+8gLAg/rxsLF+4sHz8iOnsxl0caXVWX0YAj8jisu1jkQZpsmYIaVZHWbuETVpYA3RKg/AQLNAtgHTgPHcpxKASQssiWCVb4o2G41DqrAiwR6WD54X5+Shlw/2dpViMrZiQxsxn8EdLHGdy5Z2diWJsErRvFFcUyWe4LmlKNJAxGqNiUt0uvGqO6dRupJ8sWvyR20wTARZ8CCXoJVB7tvn1KH8x7jpgGfh3OTJI8GbjIlj7rvWiFqjSgFUPqbkSNdNljqNAA4m8zl8lxCJkcQ5mMEgjZtDdCNt0b8jjYOUgnEcoCOA4lRkNhmClQ1qaagdrvoPQVCLyjpkyvdyMqRd607qdMk7Oyv4io+FmDM24OwUbE4Bd452PxPZyuZkiO1JKqzoK6Be88S/3jiHg5N4plmFwx5pV6d1PoFfsSBRf723lixuM8bly2XzU8kSKI2AhJk2k1aVUtt4BravPbETB2hRiLvJYW2VCxjZCvjkmRSGkKKEIgL6mI2ZfM45oKPOebzzwiKLhmcUfiCaPpRjL2PYAfPCnyflc7lo5teRz3eyuDYgmFgA14tPqx64vKTmvLr3l97UbhCRE7BnJC6UKg6mDGiBv1PQXjBPzzk1BbvGYBQ/hRj4SISG6dCMzHR9z6Gn2wvfqpMvwrjMp8OSzSg/p5op/vEfyxM8O7NOJS/2+YigU+QeaVx8/EqH88P3/wDuIDJ3SRzPIYu9VFVbYaddAFrsgH2va7IB3cjzCJcvBmFhmZZ3CqEXUVVmIWR+mlKAYnyBGGo5qIHhXZZko9JnabNsu4+0SFlB9kFL9DeGDiXGcrkYwppVUhRHCmor4Wf4EFgBEd+nRTha5nh4tLK6ZWTQqSmiy6VZNCSJ4hTWskbxmrsOtiice+D9nMcbytJLIySE6Yg7Du6cumlwQylBJImxoqx9TfXWrxLmLOZvvIcrDpeOSEPFILWSKVJgdTDrGSqtrjPT3sYZuX+XEgVCVAKMzxIDYy/eKNcSsK1R6tRAIoeHbwivvGuYslw2JRNKkSqoCRjdiAKAVRbEDpfQeZxSPOna9ms4xgyYaCJjpGneWS9qsfDfou/ucBYnaP2qQ5HVBl9M2a6HzSI/rkdW/VH1rzofJxycRzMjZjMgSsrvqksmRgNkWtrOwA2AHToAZ3lzkHOaoszPkJZ8sSSyo6BmqxuobXWob7Cx0O946E4FynlYYIEOWgMkaIC/dJZYAW11d2LvARvLXZnkclKs0KymReheRj5EbqKU9T1GHTBgwBgwYMAYMGDAGDBgwBgwYMAYMGDALnM3KcWdky8rsVbLlytKjXrABsSKynoCLBxTnaV2YrDmssMq2mOfWrtJ8KOoLdI121LdKq9VNDHQ2DAcmJneJcGlCpJLDq8QBVtEgutWiVR6eag4e+X+3lxS53LBh5yQGj/cY0T+8MWtzVytHnTl3ZjHJl5e8jkVVYjbcAOCvUK24O6jbCD2i9k8UiRzZRHMokHf0baVWIBYA0oZetAKKLegwDXwvtO4XmRX2pEJ6pODHXsS3hP0JxLvw/I5xCNMEyMFB0FTYUEAEoegDEV0okYonnTsnmyuWbNxaiim2hZg7on6TMgVTXmFBAG9kAkL2e5GzkMTZqMCWGMAtNCWpb60WCltPmyalG9nbAdLz8q5ZhJ4XXvHDnTI40sDq1ILpCTudIF+d4xycm5Mh17qg8McBAYj7uM2gBu7G2/Xwr6Y5rTL8WWISo+aKGPvfu5mYiP9NlRiyrsd2A6H0x9yP9bTRrJFJnJFdiq6ZXJYqLIVQ2o0NzQ2wHTWU5Zy0bpKsZ7yNVVZGZiwChwBZPSpGHvtfwivM/HshlECNmcvCqigneIK9gt39AMcwZHhfEM8G0tJKFdYyry762ulCu2onwkmhQAJNAE4y5LkbMtmHykw7idQCkbizKSwUCOvCw3stekAMb2OAurjvbVw+EEQ95mW/UUqv1Z6P1AOK5412x8SzTd3llWANsFiXXIfbUQd/wBlQcbf+R3MZfMoJIxm4HBUNGxTQ5HhMovUIw3UqTt6HbFgJ2Q5SIxSZWWbLzxiu9Rr1kjSxKtdEgkeEgC+mAouLl/Myyxy50ZiKGVwHzUkbuFs1bE9dx5nFw8t9j8CRwZhZ8zDmgBIGBTwE7gMpTcgEKRdE35YtTK5dY0WNAFRFCqo8gBQH5DGfAanDsmsMUcKfDGioL9FAG/5Y28GDAGDBgwBgwYMAYMGDAGDBgwBgwYMAYMGDAGDBgwBgwYMBjljB2IBBFEHzGPndLWmhp6aa2qulemDBgNHhHB4Mqgjy8SxoSSQo6/Mnc10HoAANgBjBwPl7LZaSUwQrGWNmroXuQoJpFJ30rQ9sfMGA2Y+B5dcw2aWFBO6hWkA3I9/K/K+tAC6AxudwpKsVBZb0kjcX1r0vBgwGbBgwYAwYMGAMGDBgDBgwYAwYMGAMGDBgP/Z',
        description: `California State Polytechnic University-Pomona is a public university in southern California and one of two polytechnic institutions in the Cal State system. Cal Poly Pomona is home to nine colleges and schools conferring undergraduate degrees. In addition, every Cal Poly Pomona college offers a First Year Experience program featuring college skills classes, field trips, and community projects. For students who wish to learn in another culture, Cal Poly Pomona provides a chance to participate in faculty-led study abroad programs, exchange student opportunities, and the CSU International Program.`,
        address: '3801 W Temple Ave, Pomona, CA',
        bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Cal_Poly_Library_Entrance.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '42',
        name: 'LA|California State University, Los Angeles',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/CSU%2C_Los_Angeles_seal.svg/640px-CSU%2C_Los_Angeles_seal.svg.png',
        description: `Founded in 1947, California State University is a comprehensive public university located in the heart of Los Angeles, California. Its seven colleges offer 100 academic programs in 55 majors for graduate and undergraduate programs across a wide range of disciplines. Nationally-recognized programs include business, engineering and nursing.`,
        address: '5151 State University Dr, Los Angeles, CA',
        bannerImage: 'https://images.shiksha.com/mediadata/images/1525344968phpfUcXdj.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '43',
        name: 'LA|El Camino Community College District',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Elco_seal.png/100px-Elco_seal.png',
        description: `El Camino College is a public community college in Alondra Park, California. It consists of 37 buildings spanning an area of roughly 26 acres. It is one of two community colleges serving Southern California's South Bay area. The El Camino Community College District was officially established on July 1, 1947.`,
        address: '16007 Crenshaw Blvd, Torrance, CA',
        bannerImage:
          'https://assets-global.website-files.com/6151fdf3b075092b426e1e23/6154e22b5e04a0b06d163c99_El_Camino_College_01-e1599923002444.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '44',
        name: 'LA|Santa Monica College District',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Santa_Monica_College_seal.svg/150px-Santa_Monica_College_seal.svg.png',
        description: `Santa Monica College (SMC) is a public community college in Santa Monica, California. Founded as a junior college in 1929, SMC enrolls over 30,000 students in more than 90 fields of study. The college initially served pre-college high school students, eventually expanding its enrollment to educate college-age and non-traditional students with the intention to transfer to a four-year university. The college has high transfer rates to four-year universities such as the University of California and California State University campuses, being a leader among state community colleges in transfers to the former.`,
        address: '2714 Pico Blvd, Santa Monica, CA',
        bannerImage: 'https://scpr.brightspotcdn.com/0b/bb/b7e3d19846f3970a849460e0054e/smc.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '45',
        name: 'LA|Long Beach Community College District',
        iconUrl: 'https://smallbizla.org/wp-content/uploads/2016/04/LBCC-Logo-Copy.png',
        description: `Long Beach City is an above-average public college located in Long Beach, California in the Los Angeles Area. It is a mid-size institution with an enrollment of 8,136 undergraduate students. The Long Beach City acceptance rate is 100%. Popular majors include Liberal Arts and Humanities, Business, and Biology.`,
        address: '4901 E Carson St, Long Beach, CA',
        bannerImage:
          'https://www.lbcc.edu/sites/main/files/imagecache/carousel/main-images/lac-campus-004.png?1577830849',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '46',
        name: 'LA|Cerritos Community College District',
        iconUrl:
          'https://media.licdn.com/dms/image/C4E03AQEBIyJA7PdLpw/profile-displayphoto-shrink_400_400/0/1663101680912?e=2147483647&v=beta&t=NkeWWAeTWbvSRjYt4uT5G4gGvYnXoXtsIp3N-_k1Pis',
        description: `The community college provides employment services, immigration services, post-secondary education and WIA programs for people who live, primarily, within the school district which includes Downey, Norwalk, Lakewood, Hawaiian Gardens, Bellflower, Cerritos, Artesia and La Mirada as well as adjacent areas of South East Los Angeles County.`,
        address: '11110 Alondra Blvd, Norwalk, CA',
        bannerImage: 'https://www.teachlarc.org/wp-content/uploads/2018/12/Cerittos-College-Header.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '47',
        name: 'LA|Glendale Community College District',
        iconUrl: 'https://cdn.freebiesupply.com/logos/large/2x/glendale-community-college-1-logo-png-transparent.png',
        description: `The community college provides employment services, immigration services, post-secondary education and WIA programs for people who live, primarily, within the school district which includes Downey, Norwalk, Lakewood, Hawaiian Gardens, Bellflower, Cerritos, Artesia and La Mirada as well as adjacent areas of South East Los Angeles County.`,
        address: '1500 N Verdugo Rd, Glendale, CA',
        bannerImage:
          'https://media.licdn.com/dms/image/C561BAQHRmp1GbvdmQw/company-background_10000/0/1585265186421/glendale_community_college_ca_91208_cover?e=2147483647&v=beta&t=HRYpQWCMXc2URNIdf0Dw0uKb8BIm9G1DeID7p66W4qA',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '01HDQ51H434EGGMW809SJX4G55',
        name: 'XX|DigiCred University',
        iconUrl: '',
        description: ``,
        bannerImage: '',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '01HMYV1S6Z9BY2K2TAERGPF8JE',
        name: 'AZ|Thatcher School District',
        iconUrl: 'https://assets.azpreps365.com/program-operators/logos/512x512/thatcher-eagles-49fabe.png',
        description: `The mission of the District is to provide an appropriate and outstanding educational experience for every student served.`,
        address: '3490 West Main Street, Thatcher, AZ 85552',
        bannerImage: 'https://content.myconnectsuite.com/api/documents/0ae820d948714dffa98a147a0b920cdf.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '01HD1YJYJ17D9FQPGJ3BBJX3VG',
        name: 'SA|NEOM',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/5/55/Neom_City_Logo.svg',
        description: `NEOM is the land of the future, with an ambition to redefine livability, business and conservation at its heart.`,
        bannerImage:
          'https://www.neom.com/content/dam/neom/newsroom/gallery/neom-islands/benthouard_2019_NEOM_1326_Yabou%E2%80%99%20Island_TOURISM_lowres1.JPG',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '01HD1YKSN1Z9CFY269RAKQYCM5',
        name: 'NC|Cape Fear',
        iconUrl:
          'https://cfcc.academicworks.com/image_uploads/W1siZiIsImltYWdlX3VwbG9hZHMvMS81MDE1YmE2YS0wMzI4LTQ3MDMtYTYxMC0zYWY4NzQzODQyNzcvY2ZjYyBuYXV0aWx1cy5wbmciXV0?sha=63b4dac4e2e12804',
        description: `For more than six decades, Cape Fear Community College’s purpose has remained unchanged – to provide the Cape Fear region with accessible, quality education and world-class workforce-training opportunities.`,
        bannerImage: 'https://cfcc.edu/wp-content/uploads/2019/07/students-crossing-street-at-Union-Station.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
    ],
  },
  {
    type: InstitutionCategoryType.Employers,
    displayName: 'Employers',
    icon: Icon.BuildingOutline,
    institutions: [
      {
        id: '01',
        name: 'NC|Novant Health',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Novant_Health_logo.svg/220px-Novant_Health_logo.svg.png',
        description: `Novant Health is a four-state integrated network of physician clinics, outpatient centers and hospitals. Its network consists of more than 1,600 physicians and 29,000 employees at more than 640 locations, including 15 medical centers and hundreds of outpatient facilities and physician clinics.`,
        address: '2085 Frontis Plaza Boulevard, Winston-Salem, NC',
        bannerImage: 'https://supportnovanthealth.org/wp-content/uploads/Screen-Shot-2022-08-19-at-12.14.39-PM.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
        invitationLink:
          'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICJlZDkzYjdhZi0zMjVmLTQ1MzgtOTVkYi02NmI3NmUyNTg3ZDciLCAibGFiZWwiOiAiTm92YW50IEhlYWx0aCIsICJyZWNpcGllbnRLZXlzIjogWyI1eUc2Q3RmckFCakF4aHlUMVlwZkhRQ2Q1cFBSR21zU0NGOG1ZUEVteVVOcSJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHA6Ly9jcm1zLmRpZ2ljcmVkLnNlcnZpY2VzOjgwMzAiLCAiaW1hZ2VVcmwiOiAiaHR0cHM6Ly9idWlsZGhlYWx0aGNoYWxsZW5nZS5vcmcvd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDkvTm92YW50LUhlYWx0aC1sb2dvLTg4MHg2NDUtMjYzeDI2My5wbmcifQ==',
      },
      {
        id: '02',
        name: 'FL|CTS Engine',
        iconUrl: 'https://mms.businesswire.com/media/20160510005142/en/334195/23/CTS_Engines_RGB_Small.jpg',
        description: `CTS Engines is a leading provider of world-class jet engine maintenance, repair, and overhaul services. CTS specializes in the test, repair, and overhaul of the CF6-50, CF6-80A, CF6-80C2, CF6-80E1, PW2000, PW4000 and GP7200. Utilizing state-of-the-art facilities, cutting-edge technologies, and a highly skilled workforce, CTS Engines offers comprehensive solutions tailored to meet specific needs.`,
        address: '3060 SW 2nd Ave, Fort Lauderdale, FL',
        bannerImage: 'https://ctsengines.com/wp-content/uploads/2022/01/home1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
        invitationLink:
          'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIzNmU5OTZkZS01ODgzLTQxMDktOTFlYS05MTNkMGUwYmJlYWQiLCAibGFiZWwiOiAiQ1RTIEVuZ2luZXMiLCAicmVjaXBpZW50S2V5cyI6IFsiZzdneEd2alFleGJzcmltaU00ckZDbnNtREtmYWZmeWVSeEZGekxIcEMzViJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHA6Ly9jcm1zLmRpZ2ljcmVkLnNlcnZpY2VzOjgwMzAifQ==',
      },
      {
        id: '03',
        name: 'FL|Boeing',
        iconUrl: 'https://nasa-uli.utk.edu/wp-content/uploads/2019/02/boeing-logo.png',
        description: `The Boeing Company is an American multinational corporation that designs, manufactures, and sells airplanes, rotorcraft, rockets, satellites, and missiles worldwide. The company also provides leasing and product support services. Boeing is among the largest global aerospace manufacturers; it is the fourth-largest defense contractor in the world based on 2022 revenue and is the largest exporter in the United States by dollar value. Boeing was founded by William Boeing in Seattle, Washington, on July 15, 1916.`,
        address: '100 Boeing Way, Titusville, FL',
        bannerImage:
          'https://www.boeing.ca/content/theboeingcompany/ca/en/boeing-in-canada/_jcr_content/root/container_2091943792/hero_teaser.coreimg.jpeg/1709946120562/boeingcanada.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
        invitationLink:
          'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICI1ZWM0MjFlZC03MWVlLTQ0YTktYTQzMi0yNGJkMzM0NWZjZmUiLCAibGFiZWwiOiAiQm9laW5nIiwgInJlY2lwaWVudEtleXMiOiBbIjRzZ3hrVzFlN2lXQ2VuRFpNSGR1NVV5Y3VCM3lEVjVvRXZLa0hSVGVacDl3Il0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2NybXMuZGlnaWNyZWQuc2VydmljZXM6ODAzMCJ9',
      },
      {
        id: '04',
        name: 'FL|Spirit Airlines',
        iconUrl: 'https://e7.pngegg.com/pngimages/923/237/png-clipart-spirit-airlines-thumbnail.png',
        description: `Spirit Airlines, Inc., stylized as spirit, is a major American ultra-low cost airline headquartered in Miramar, Florida, in the Miami metropolitan area. Spirit operates scheduled flights throughout the United States, the Caribbean and Latin America.`,
        address: '2800 Executive Way, Miramar, FL',
        bannerImage: 'https://www.ch-aviation.com/images/stockPhotos/36/93e6b75410dbb2520e315fda9e9137a6402a2d3a.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
        invitationLink:
          'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIyMmJjZGYxNS01NDM4LTQ3ZjctYmExYy03YjRhZGViNTkzZDAiLCAibGFiZWwiOiAiU3Bpcml0IEFpcmxpbmVzIiwgInJlY2lwaWVudEtleXMiOiBbIjhMSGYybTN1VDhoTDM0MTlNU01rNkNXQlBERWlnOVI0NENwWHZZaFVtZ0R4Il0sICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2NybXMuZGlnaWNyZWQuc2VydmljZXM6ODAzMCJ9',
      },
      {
        id: '05',
        name: 'FL|General Dynamics',
        iconUrl: 'https://i.dell.com/sites/csimages/Banner_Imagery/all/general-dynamics.png',
        description: `General Dynamics Corporation (GD) is an American publicly traded aerospace and defense corporation headquartered in Reston, Virginia. As of 2020, it was the fifth-largest defense contractor in the world by arms sales, and fifth largest in the United States by total sales.`,
        address: '9100 NW 36th St, Miami, FL',
        bannerImage:
          'https://gdmissionsystems.com/-/media/general-dynamics/maritime-and-strategic-systems/images/submarine-systems/columbia-class-submarines/columbia-class-ballistic-missile-submarine-artist-rendering.ashx',
        cardImage: '/src/assets/images/generic-student-id.svg',
        invitationLink:
          'http://crms.digicred.services:8030?c_i=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL2Nvbm5lY3Rpb25zLzEuMC9pbnZpdGF0aW9uIiwgIkBpZCI6ICIzMWNkZDNlOS02NWQ4LTRhOTUtOWRmZi02Y2VmMTdiMWVkMDMiLCAibGFiZWwiOiAiR2VuZXJhbCBEeW5hbWljcyIsICJyZWNpcGllbnRLZXlzIjogWyI5a29IZ1RXOW1pMlJ1VUpDMUQ4RWVmbVV3aWFkdmJMYkFmSlJZVzRIM3BiSiJdLCAic2VydmljZUVuZHBvaW50IjogImh0dHA6Ly9jcm1zLmRpZ2ljcmVkLnNlcnZpY2VzOjgwMzAifQ==',
      },
      {
        id: '06',
        name: 'NC|Bayliss Boatworks',
        iconUrl:
          'https://www.baylissboatworks.com/wp-content/themes/bayliss-custom-theme/library/images/footer-logo.png',
        description: `Bayliss Boatworks builds custom built sportfishing yachts and has a full-service boatyard and repair facility on the Outer Banks, in Wanchese, NC.`,
        address: '600 Harbor Road, Wanchese, NC',
        bannerImage: 'https://www.baylissboatworks.com/wp-content/uploads/2014/01/Reel-Wheels-II-6.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '07',
        name: 'NC|Nordhavn Yachts',
        iconUrl:
          'https://media.licdn.com/dms/image/C4D0BAQFh1LNtmPEzGQ/company-logo_200_200/0/1674865506898/nordhavn_yachts_logo?e=1718236800&v=beta&t=Hc-G9SSUToD7c7kkuXkku2Jfc1r40JduaakzY5EYqWY',
        description: `Nordhavn builds the world’s most celebrated expedition trawler yachts for adventure boaters of all levels, with models ranging from 41 to 120 feet.`,
        address: 'Pacific Asian Enterprises, 25001 Dana Drive, Dana Point, CA',
        bannerImage: 'https://nordhavn-yachts.com/fileadmin/template/slider/3_Nordhavn_60_Encore.jpg?1710460800034',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '08',
        name: 'NC|Onslow Bay Boats',
        iconUrl: 'https://onslowbayboats.com/wp-content/uploads/2021/06/Onslow-Bay-Web-01.png',
        description: `Onslow Bay Boatworks offers a fleet of superior center console offshore and tournament edition boats designed with avid fishermen in mind.`,
        address: '400 Betty Taylor Wood Drive, Holly Ridge, NC',
        bannerImage: 'https://onslowbayboats.com/wp-content/uploads/2021/06/41-3.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '09',
        name: 'NC|Jarrett Bay',
        iconUrl: 'https://ocfishing.com/app/uploads/2022/08/jarrettbay-boatworks-logo.jpg',
        description: `Jarrett Bay Boatworks is a world-class boat builder and yacht service facility in the United States. Having delivered over 100 custom sport fishing boats and semi-production models, while servicing tens of thousands of recreational and commercial vessels, Jarrett Bay is renowned for quality craftsmanship.`,
        address: '530 Sensation Weigh, Beaufort, NC',
        bannerImage: 'https://photos.superyachtapi.com/download/246776/large',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '10',
        name: 'NC|Iconic Marine Group',
        iconUrl:
          'https://media.licdn.com/dms/image/C560BAQErqlzo7jbeqw/company-logo_200_200/0/1631336968992?e=1717632000&v=beta&t=ZOneN_DbzNu1aphPgLoDOFo_j6AapffXYNjWPfXs_p0',
        description: `Iconic Marine Group is a leading producer and importer of specialty marine products. Our prominent family of brands is driven to deliver premium performance, exceptional quality, and lifestyle-driven innovation.`,
        address: '1653 Whichards Beach Rd., Washington, NC',
        bannerImage:
          'https://www.powerboatnation.com/wp-content/uploads/2019/09/Screen-Shot-2019-09-26-at-1.28.14-AM.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '11',
        name: 'LA|Northrop Grumman Corp',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Northrop_Grumman_logo_blue-on-clear_2020.svg/440px-Northrop_Grumman_logo_blue-on-clear_2020.svg.png',
        description: `Northrop Grumman Corporation is an American multinational aerospace and defense technology company. With 95,000 employees and an annual revenue in excess of $30 billion, it is one of the world's largest weapons manufacturers and military technology providers. The firm ranked No.101 on the 2022 Fortune 500 list of America's largest corporations.`,
        address: '1 Space Park Dr, Redondo Beach, CA',
        bannerImage:
          'https://cdn.prd.ngc.agencyq.site/-/jssmedia/wp-content/uploads/Northrop-Grumman-and-the-US-Air-Force-Introduce-the-B-21-Raider-the-Worlds-First-Sixth-Generation-Ai.jpg?mw=3840&rev=d9261fac54784b64958b8aa1acb64180',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '12',
        name: 'LA|Walt Disney Co.',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/The_Walt_Disney_Company_Logo.svg/440px-The_Walt_Disney_Company_Logo.svg.png',
        description: `The Walt Disney Company, commonly known as Disney, is an American multinational mass media and entertainment conglomerate that is headquartered at the Walt Disney Studios complex in Burbank, California. Disney was founded on October 16, 1923, by brothers Walt Disney and Roy Disney as Disney Brothers Studio it also operated under the names Walt Disney Studio and Walt Disney Productions before changing its name to the Walt Disney Company in 1986.`,
        address: '2500 South Buena Vista Street, Burbank, CA',
        bannerImage:
          'https://www.disneytouristblog.com/wp-content/uploads/2020/05/central-plaza-partners-cinderella-castle-zoom-background.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '13',
        name: 'LA|NBCUniversal',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/NBCUniversal_Logo.svg/530px-NBCUniversal_Logo.svg.png',
        description: `NBCUniversal Media, LLC (abbreviated as NBCU and doing business as simply NBCUniversal or Comcast NBCUniversal since 2013) is an American multinational mass media and entertainment conglomerate that is a subsidiary of Comcast and is headquartered at 30 Rockefeller Plaza in Midtown Manhattan in New York City.`,
        address: '5750 Wilshire Blvd, Los Angeles, CA',
        bannerImage: 'https://coalregioncanary.com/wp-content/uploads/2021/03/nbc-universal-job-scam.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '14',
        name: 'LA|Space Exploration Technologies Corp. (SpaceX)',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SpaceX_logo_black.svg/500px-SpaceX_logo_black.svg.png',
        description: `Space Exploration Technologies Corp. commonly referred to as SpaceX, is an American spacecraft manufacturer, launch service provider, defense contractor and satellite communications company headquartered in Hawthorne, California. The company was founded in 2002 by Elon Musk with the goal of reducing space transportation costs and ultimately developing a sustainable colony on Mars. The company currently operates the Falcon 9 and Falcon Heavy rockets along with the Dragon and Starship spacecraft.`,
        address: '1 Rocket Rd Hawthorne, CA 90250',
        bannerImage: 'https://www.spacex.com/static/images/locations/kennedy.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '15',
        name: 'LA|Raytheon Co.',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Raytheon.svg/400px-Raytheon.svg.png',
        description: `RTX Corporation, formerly Raytheon Technologies Corporation, is an American multinational aerospace and defense conglomerate headquartered in Arlington, Virginia. It is one of the largest aerospace and defense manufacturers in the world by revenue and market capitalization, as well as one of the largest providers of intelligence services.`,
        address: '2006 East El Segundo Blvd, El Segundo, CA',
        bannerImage: 'https://costar.brightspotcdn.com/45/36/3933191e48088fe44ed2435e0495/raytheon.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '16',
        name: 'LA|Amgen',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Amgen.svg/500px-Amgen.svg.png',
        description: `Amgen Inc. (formerly Applied Molecular Genetics Inc.) is an American multinational biopharmaceutical company headquartered in Thousand Oaks, California. One of the world's largest independent biotechnology companies, Amgen's Thousand Oaks staff in 2022 numbered approximately 5,000 (8.5% of total city employment) and included hundreds of scientists, making Amgen the largest employer in Ventura County. As of 2022, Amgen has approximately 24,000 staff in total.`,
        address: '1 Amgen Center Dr, Thousand Oaks, CA',
        bannerImage:
          'https://www.amgen.ca/-/media/Themes/CorporateAffairs/amgen-ca/amgen-ca/images/Content/missisuaga-image.png?h=559&iar=0&w=642&hash=8606BA8F8AD8F7A2DB3F3002CC30E03C',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '17',
        name: 'LA|Paramount Pictures Corp',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Paramount_Pictures_2022_%28Blue%29.svg/350px-Paramount_Pictures_2022_%28Blue%29.svg.png',
        description: `Paramount Pictures Corporation is an American film and television production and distribution company and the namesake subsidiary of Paramount Global (Previously known as ViacomCBS). It is the sixth-oldest film studio in the world, the second-oldest film studio in the United States (behind Universal Pictures), and the sole member of the "Big Five" film studios located within the city limits of Los Angeles.`,
        address: '5555 Melrose Avenue, Hollywood, California',
        bannerImage:
          'https://image.cnbcfm.com/api/v1/image/107206479-1678453440417-gettyimages-1247972888-AFP_33AW4H9.jpeg?v=1698965565',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '18',
        name: 'NC|Corning Cable Systems',
        iconUrl: 'https://cdn.freebiesupply.com/logos/large/2x/corning-1-logo-png-transparent.png',
        description: `Corning Cable Systems offers a range of end-to-end fiber-optic and copper product solutions for various telecommunications networks. Its solutions include cables, connectors, and related hardware, and network services that include network design, project management, installation and maintenance, equipment rental, and training programs. The company offers an inventory of products, including digital subscriber line products, fiber closures, micro cabling systems, offshore and aerial cables, pedestals, plug & play systems, splice and test equipment, submarine cable systems, subscriber demarcation points, terminals, toolkits, and training equipment. It also offers public and private network solutions, original equipment manufacturer-specific products, cable assembly houses, copper solutions, and fiber-optic rentals.`,
        address: '3180 Centre Park Blvd, Winston-Salem, NC',
        bannerImage:
          'https://www.corning.com/media/worldwide/global/images/Newsroom2020Tests/Trivium_4.png.transform/retina-2048/img.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '19',
        name: 'NC|Atrium Health',
        iconUrl: 'https://atriumhealth.org/-/media/chs/images/logo/atrium-health-logo-square-151px.png',
        description: `Atrium Health, formerly Carolinas HealthCare System, is a hospital network with more than 70,000 employees and part of Advocate Health.`,
        address: '1000 Blythe Blvd, Charlotte, NC',
        bannerImage:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Carolinas_Medical_Center.jpg/1920px-Carolinas_Medical_Center.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '20',
        name: 'NC|Live Oak Bank',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Live_Oak_Bank%27s_New_Logo_released_in_June_2020.png',
        description: `Live Oak Bank, a subsidiary of Live Oak Bancshares, Inc., is an American bank. Headquartered in Wilmington, NC, it serves small business owners in all 50 states and was the leading SBA by dollar volume in 2022.`,
        address: '1757 Tiburon Drive, Wilmington, NC',
        bannerImage:
          'https://cdnassets.hw.net/66/b6/968c39e844d7952438f5831b40dc/0713b43c-e038-403a-aea8-8198539df19c.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '21',
        name: 'NC|Bank Of America',
        iconUrl:
          'https://yt3.googleusercontent.com/cNhnzp4erRv7ApITjJ5OFdIm-r-g49EivpztODKMLwWARJWhRZZo_6whxjN5n7EV6p0BvJwk1FI=s900-c-k-c0x00ffffff-no-rj',
        description: `The Bank of America Corporation is an American multinational investment bank and financial services holding company headquartered at the Bank of America Corporate Center in Charlotte, North Carolina, with investment banking and auxiliary headquarters in Manhattan. The bank was founded in San Francisco, California.`,
        address: '100 N Tryon St, Charlotte, NC',
        bannerImage:
          'https://www.charlotteobserver.com/latest-news/f5wur5/picture267636717/alternates/FREE_768/BoA%20013.JPG',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '22',
        name: 'NC|Duke Energy',
        iconUrl: 'https://digitalinfranetwork.com/wp-content/uploads/2024/02/duke_energy_logo.jpg',
        description: `Duke Energy Corporation is an American electric power and natural gas holding company headquartered in Charlotte, North Carolina.`,
        address: 'Duke Energy Plaza, Charlotte, NC',
        bannerImage: 'https://images.businessnc.com/wp-content/uploads/2023/12/Duke_energy_building_top.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '23',
        name: 'NC|CommScope',
        iconUrl: 'https://www.ngmn.org/wp-content/uploads/Logos/Commscope_500x500.jpg',
        description: `CommScope Holding Company, Inc. is an American network infrastructure provider based in Hickory, North Carolina. CommScope employs over 30,000 employees. The company joined the Nasdaq stock exchange on October 25, 2013. CommScope designs and manufactures network infrastructure products.`,
        address: '1100 Commscope Pl SE, Hickory, NC',
        bannerImage:
          'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/d57b984d93fe494cb804b07f164151b3/files/news/CommScope-Sunrise-300-dpi_photo-credit-to-CommScope.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '24',
        name: 'NC|Truist Financial',
        iconUrl: 'https://companieslogo.com/img/orig/TFC-10ef6fac.png?t=1634045116',
        description: `Truist Financial Corporation is an American bank holding company headquartered in Charlotte, North Carolina. The company was formed in December 2019 as the result of the merger of BB&T (Branch Banking and Trust Company) and SunTrust Banks. Its bank operates 2,781 branches in 15 states and Washington, D.C., offering consumer and commercial banking, securities brokerage, asset management, mortgage, and insurance products and services.`,
        address: '214 N Tryon St, Charlotte, NC',
        bannerImage: 'https://images.businessnc.com/wp-content/uploads/2023/07/truist-bank-696x436.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '25',
        name: 'NC|Honeywell',
        iconUrl: 'https://www.honeywell.com/content/dam/honeywellbt/en/images/logos/HON%20logo_200x37%202.png',
        description: `Honeywell International Inc. is an American publicly traded, multinational conglomerate corporation headquartered in Charlotte, North Carolina. It primarily operates in four areas of business: aerospace, building automation, performance materials and technologies (PMT), and safety and productivity solutions (SPS).`,
        address: '855 S Mint St, Charlotte, NC',
        bannerImage:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Honeywell-charlotte-hq-1.jpg/1920px-Honeywell-charlotte-hq-1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '26',
        name: 'FL|Publix',
        iconUrl: 'https://1000logos.net/wp-content/uploads/2019/06/Publix-Logo.jpg',
        description: `Publix Super Markets, Inc., commonly known as Publix, is an employee-owned American supermarket chain headquartered in Lakeland, Florida. Founded in 1930 by George W. Jenkins, Publix is a private corporation that is wholly owned by present and past employees and members of the Jenkins family.`,
        address: '3300 Publix Corporate Pkwy, Lakeland, FL',
        bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Publix_surfside_fl.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '27',
        name: 'FL|AdventHealth',
        iconUrl:
          'https://www.adventhealth.com/sites/default/files/styles/fc_800x533/public/media/pr-adventhealth-logo-hero_5.jpg.webp?h=4362216e&itok=v9KL6Abn',
        description: `AdventHealth is a Seventh-day Adventist non-profit health care system headquartered in Altamonte Springs, Florida, that operates facilities in 9 states across the United States. On January 2, 2019, Adventist Health System rebranded to AdventHealth. It is the largest not-for-profit Protestant health care provider.`,
        address: '900 Hope Way, Altamonte Springs, FL',
        bannerImage:
          'https://www.adventhealth.com/sites/default/files/styles/fc_1200x800/public/media/adventhealth-corporate-campus-headquarters_0.jpg.webp?h=39d8ac51&itok=YE3StWGQ',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '28',
        name: 'FL|Medtronic',
        iconUrl: 'https://media.bizj.us/view/img/2668641/medtronic-logo*750xx428-241-2-0.jpg',
        description: `Medtronic USA, Inc. manufactures surgical devices and systems including neurosurgery imaging and neuronavigation systems. The company was incorporated in 1984 and is based in Miami, Florida. Medtronic USA, Inc. operates as a subsidiary of Medtronic plc.`,
        address: '14400 NW 60th Ave, Hialeah, FL',
        bannerImage: 'https://miamilaker.com/Portals/0/easygalleryimages/1/12866/hoods1cmyk.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '29',
        name: 'FL|Wyndham Vacation Ownership',
        iconUrl: 'https://photos.prnewswire.com/prnfull/20150416/199211LOGO',
        description: `Wyndham Vacation Ownership (WVO) offers vacationers a (time) share of paradise. A top supplier and marketer of timeshare vacation properties worldwide, the company operates through two primary consumer brands: Wyndham Vacation Resorts and WorldMark by Wyndham. WVO boasts about 185 vacation ownership resorts in the US, Canada, Mexico, the Caribbean, and the South Pacific, representing some 23,000 individual vacation ownership units and more than 900,000 owners of vacation ownership and other real estate interests. It has been expanding its presence in the US. WVO is a subsidiary of Wyndham Worldwide, which was spun off from Cendant (now Avis Budget Group) in 2006.`,
        address: '6277 Sea Harbor Dr, Orlando, FL',
        bannerImage:
          'https://clubwyndham.wyndhamdestinations.com/content/dam/wyndham/wyndham-vacation-clubs/resorts/cw-bonnet-creek/amenities/004-bonnet-creek-gallery-amenity.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '30',
        name: 'FL|Norwegian Cruise Line',
        iconUrl: 'https://mma.prnewswire.com/media/612137/Norwegian_Cruise_Line_Logo.jpg?p=facebook',
        description: `Norwegian Cruise Line (NCL), also known in short as Norwegian, is an American cruise line founded in Norway in 1966, incorporated in Bermuda and headquartered in Miami. It is the fourth-largest cruise line in the world by passengers, controlling about 8.6% of the total worldwide share of the cruise market by passengers as of 2021. It is wholly owned by parent company Norwegian Cruise Line Holdings.`,
        address: '7665 Corporate Center Drive, Miami, FL',
        bannerImage: 'https://www.ncl.com/sites/default/files/800px_blog_header_ncl_POM_Terminal_Water_View_Day.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '31',
        name: 'FL|Interim HealthCare',
        iconUrl: 'https://tukuz.com/wp-content/uploads/2020/12/interim-healthcare-logo-vector.png',
        description: `Founded in 1966, Interim HealthCare is the nation’s first home care company and a trusted provider of home healthcare, personal care and support, hospice care and medical staffing services.`,
        address: '1551 Sawgrass Corporate Pkwy Suite 230, Sunrise, FL',
        bannerImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeFrq_fCTNtNMnrxM6a5jvpWaxQOMI7pMdGMpOeUYImgFX-JJGBYsq4zXNb5KnArtObEw&usqp=CAU',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '32',
        name: 'FL|SeaWorld Orlando',
        iconUrl:
          'https://fiu-original.b-cdn.net/fontsinuse.com/use-images/168/168656/168656.png?filename=Sea%20World%20logo.png',
        description: `SeaWorld Orlando is a theme park and marine zoological park located in Orlando, Florida. Although separately gated, it is often promoted with neighboring parks Discovery Cove and Aquatica as well as Busch Gardens Tampa Bay, all of which are owned and operated by United Parks & Resorts.`,
        address: '7007 Sea World Dr, Orlando, FL',
        bannerImage: 'https://cloudfront-us-east-1.images.arcpublishing.com/gmg/SNSTVWJXDZCCZGAXPL4AU3RDIU.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '33',
        name: 'FL|AdventHealth University',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/AdventHealth_Uni_Seal.jpg/220px-AdventHealth_Uni_Seal.jpg',
        description: `AdventHealth University (AHU) is a Seventh-day Adventist institution specializing in healthcare education that is located in Orlando, Florida Denver, Colorado and online. It is associated with AdventHealth, which is operated by the Seventh-day Adventist Church. It is a part of the Seventh-day Adventist education system, the world's second largest Christian school system. The physical facilities are located next to AdventHealth Orlando and Centura Health in Denver. The university offers over 20 undergraduate and graduate degrees from associate to doctorate level, including online and post-baccalaureate certificates.`,
        address: '671 Winyah Dr, Orlando, FL',
        bannerImage: 'https://cdn.adventistworld.org/wp-content/uploads/2023/02/download.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '34',
        name: 'FL|Baptist Health South Florida',
        iconUrl:
          'https://festivalboca.org/sites/FestivalBoca/cache/file/B83662C9-9AB3-4973-81E299342F320FE3_sponsorad.jpg',
        description: `Baptist Health South Florida is a faith-based not-for-profit healthcare organization and clinical care network in Miami-Dade, Broward, and Palm Beach counties. Baptist Health has 11 hospitals and in excess of 100 physician practices and outpatient facilities.`,
        address: '6855 South Red Road, Suite 500, Coral Cables, FL',
        bannerImage: 'https://healthcaredesignmagazine.com/wp-content/uploads/2021/05/Untitled-1baptistexterior2.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '35',
        name: 'FL|MasTec',
        iconUrl:
          'https://images.squarespace-cdn.com/content/v1/61007f0422a6616afa5f4346/4b0d557f-a62b-40c3-b3f0-44211f1c7550/mastechwebsitelogo.png',
        description: `Mastec, Inc. is an American multinational infrastructure engineering and construction company based in Coral Gables, Florida. The company provides engineering, building, installation, maintenance and upgrade of energy, utility and communications infrastructure. Its customers are primarily in the utility, communications and government industries.`,
        address: '800 S. Douglas Road, 12th Floor, Coral Gables, FL',
        bannerImage: 'https://contactdetailswala.com/wp-content/uploads/2019/11/mastec-1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '36',
        name: 'FL|Tech Data',
        iconUrl: 'https://1000logos.net/wp-content/uploads/2021/08/Tech-Data-Logo-1974.png',
        description: `Tech Data Corporation (commonly referred to as Tech Data) was an American multinational distribution company specializing in IT products and services headquartered in Clearwater, Florida. It merged with competitor Synnex to form TD Synnex. Synnex is to be the primary owner (55% share). Tech Data provided a broad range of product lines, logistics capabilities and value-added services that enable technology manufacturers and resellers, such as Google, Apple, Cisco, Dell, Fortinet, Hewlett Packard Enterprise, HP Inc., IBM, Lenovo, LG, Microsoft, Sony, Trend Micro, Viewsonic, TP-Link and VMware, to deploy IT solutions.`,
        address: '5350 Tech Data Dr, Clearwater, FL',
        bannerImage:
          'https://www.continuant.com/hubfs/_MARKETING%20-%20Continuant/Website/Success%20Stories/Tech%20Data%20Building%20Image.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '37',
        name: 'FL|Jackson North Medical Center',
        iconUrl:
          'https://media.licdn.com/dms/image/C4E0BAQHL3kGTZZJQSg/company-logo_100_100/0/1631326852216?e=2147483647&v=beta&t=r9YAZEZ8tCVXkh4KyiwBcXNlnre7aGq17nohBTNdxpM',
        description: `Jackson Memorial Hospital, also referred to as Jackson or abbreviated MJMH, is a non-profit, tertiary care hospital, and the primary teaching hospital of the University of Miami's School of Medicine. As of 2021, it is the largest hospital in the United States by number of beds, according to Becker's Hospital Review.`,
        address: '160 NW 170th St, North Miami Beach, FL',
        bannerImage: 'https://storage.googleapis.com/jacksonh/1/JHS_Location_JacksonMemorial_Header-1.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '38',
        name: 'AZ|Banner Health',
        iconUrl: 'https://clinicalpartnerships.asu.edu/sites/default/files/inline-images/cp-banner-health-logo_2_1.jpg',
        description: `Banner Health is a non-profit health system in the United States, based in Phoenix, Arizona. It operates 30 hospitals and several specialized facilities across 6 states. The health system is the largest employer in Arizona and one of the largest in the United States with over 50,000 employees.`,
        address: '2901 N Central Ave #160, Phoenix, AZ',
        bannerImage: 'https://media.bizj.us/view/img/10723409/banner-desert-ridge-1*900xx4032-2268-0-378.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '39',
        name: 'AZ|ON Semiconductor',
        iconUrl: 'https://cdn.theorg.com/c44825e4-e1e3-4e2f-8c95-deff33cdc995_thumb.jpg',
        description: `ON Semiconductor Corporation is an American semiconductor supplier company, based in Scottsdale, Arizona. Products include power and signal management, logic, discrete, and custom devices for automotive, communications, computing, consumer, industrial, LED lighting, medical, military/aerospace and power applications. onsemi runs a network of manufacturing facilities, sales offices and design centers in North America, Europe, and the Asia Pacific regions.`,
        address: '5005 East McDowell Road, Phoenix, AZ',
        bannerImage:
          'https://ewscripps.brightspotcdn.com/dims4/default/9f620d9/2147483647/strip/true/crop/1000x563+0+52/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F65%2F18%2Fa6a1ab2b4ea6ad05f81341ce2bf7%2Fon-semiconductor.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '40',
        name: 'AZ|HonorHealth',
        iconUrl:
          'https://www.honorhealth.com/sites/default/files/styles/square_teaser/public/2020-02/HonorHealth-icon-600px.png?itok=HSOIDH_b',
        description: `HonorHealth Scottsdale Osborn Medical Center is a private, non-profit acute-care teaching hospital in Scottsdale, Arizona.`,
        address: '7400 E Osborn Rd., Scottsdale, AZ',
        bannerImage:
          'https://www.honorhealth.com/sites/default/files/styles/location_primary_image/public/honorhealth-medical-center-scottsdale-thompson-peak.jpg?itok=yWvi6p-Y',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '41',
        name: 'AZ|Troon',
        iconUrl: 'https://www.troon.com/troon-golf-arizona/wp-content/uploads/sites/4/2022/04/Troon-North.png',
        description: `Troon is a development consisting of a country club, golf course and housing in North Scottsdale, Arizona, United States. The golf course was designed by Jay Morrish and Tom Weiskopf.`,
        address: '10320 E Dynamite Blvd, Scottsdale, AZ',
        bannerImage:
          'https://www.golfdigest.com/content/dam/images/golfdigest/fullset/course-photos-for-places-to-play/Troon%20North%20Pinnacle.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '42',
        name: 'AZ|Apollo Education Group',
        iconUrl: 'https://www.sogeti.com/globalassets/common/logos/apol-apollo-logo-vertical-blue-500x478.png',
        description: `Apollo Education Group, Inc. is an American corporation based in the South Phoenix area of Phoenix, Arizona, with an additional corporate office in Chicago, Illinois. It is privately-owned by a consortium of investors including The Vistria Group, LLC and funds affiliated with Apollo Global Management, LLC.`,
        address: '4025 S Riverpoint Pkwy, Phoenix, AZ',
        bannerImage: 'https://media.glassdoor.com/l/d9/3e/fa/f4/headquarters.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '43',
        name: 'AZ|Microchip Technology',
        iconUrl:
          'https://b2310233.smushcdn.com/2310233/wp-content/uploads/2021/08/Microchip_Technology-Logo.wine_.png?lossy=1&strip=1&webp=1',
        description: `Microchip Technology Incorporated is a leading provider of smart, connected and secure embedded control solutions. Its easy-to-use development tools and comprehensive product portfolio enable customers to create optimal designs, which reduce risk while lowering total system cost and time to market. The company's solutions serve approximately 125,000 customers across the industrial, automotive, consumer, aerospace and defense, communications and computing markets. Headquartered in Chandler, Arizona, Microchip offers outstanding technical support along with dependable delivery and quality.`,
        address: '2355 West Chandler Blvd. Chandler, AZ',
        bannerImage:
          'https://pictures.alignable.com/eyJidWNrZXQiOiJhbGlnbmFibGV3ZWItcHJvZHVjdGlvbiIsImtleSI6ImJ1c2luZXNzZXMvYmFubmVycy9vcmlnaW5hbC8yNjA1ODYvMTUwNTk5NjUyM18xMjQ5MjA2MF8xMDE1MzkxODU2OTc2Njc0Ml82ODk3ODMyNDk2OTg0MzY5MDU1X28uanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMTIwLCJoZWlnaHQiOjMwNH19fQ==',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '44',
        name: 'AZ|ARRIVIA',
        iconUrl: 'https://www.arrivia.com/wp-content/uploads/2021/05/arrivia-Logo-2-768x291-1.jpeg',
        description: `Operator of a travel privileges platform intended to reward travelers. The company partners with brands including financial services and travel companies to offer customers access to travel and leisure at preferred rates, enabling businesses to uncover new revenue streams, expand core products and reward their members.`,
        address: '15147 N Scottsdale Rd Ste 210, Scottsdale, AZ',
        bannerImage: 'https://careers.arrivia.com/wp-content/uploads/2021/12/arrivia-office-entrance.jpeg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '45',
        name: 'AZ|Carlisle Companies',
        iconUrl: 'https://mms.businesswire.com/media/20240206705757/en/1962969/23/Carlisle_MasterLogo_RGB.jpg',
        description: `Carlisle Companies Incorporated is an American diversified company that designs, manufactures, and markets a wide range of products that serve a broad range of niche markets to customers worldwide, including: commercial roofing, energy, agriculture, lawn and garden, mining and construction equipment, aerospace and electronics, dining and food delivery, and healthcare.`,
        address: '16430 N Scottsdale Rd #400, Scottsdale, AZ',
        bannerImage:
          'https://www.azcentral.com/gcdn/-mm-/25469fbfce2203199aa188571ac8e00564b9ac49/c=234-0-2748-1421/local/-/media/2016/02/11/Phoenix/Phoenix/635908137348588326-PNITab-09-12-2013-ABG-1-BG002-2013-09-10-IMG--PNI0912-biz-abg-rer-1-1-8B518NCK-L281943817-IMG--PNI0912-biz-abg-rer-1-1-8B518NCK.jpg?width=660&height=374&fit=crop&format=pjpg&auto=webp',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '46',
        name: 'AZ|Southern Copper',
        iconUrl: 'https://www.marketbeat.com/logos/southern-copper-co-logo.png?v=20240102162501',
        description: `Southern Copper Corp is an integrated producer of copper and other minerals and operates the mining, smelting, and refining facilities in Peru and Mexico. Its production includes copper, molybdenum, zinc, and silver. The company operates through the following segments: Peruvian operations, Mexican open-pit operations, and Mexican underground mining operations. Southern Copper generates the majority of its revenue from the sale of copper and the rest from the sale of non-copper products, such as molybdenum, silver, zinc, lead, and gold. The company's geographical segments are The Americas, Europe, and Asia.`,
        address: '1440 E Missouri Ave, Phoenix, AZ',
        bannerImage:
          'https://southerncoppercorp.com/eng/wp-content/uploads/sites/2/revslider/slider-1/SlidePrincipal.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '47',
        name: 'AZ|Carvana',
        iconUrl: 'https://i.pinimg.com/originals/b0/e3/44/b0e344335606f3b2ab2a47e36b482425.png',
        description: `Carvana Co. is an online used car retailer based in Tempe, Arizona. The company was the fastest growing online used car dealer in the United States and is known for its multi-story glass tower car vending machines. Carvana was named to the 2021 Fortune 500 list, one of the youngest companies to be added to the list.`,
        address: '707 E Gilbert Dr, Tempe, AZ',
        bannerImage:
          'https://chamberbusinessnews.com/wp-content/uploads/2018/08/Carvana-Tempe-Car-Vending-Machine-1500x500.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '48',
        name: 'AZ|Cohn Financial Group',
        iconUrl:
          'https://media.licdn.com/dms/image/C560BAQE1_4XGCTOncQ/company-logo_200_200/0/1630590675925/cfg_business_solutions_logo?e=2147483647&v=beta&t=YVPC-AdEArWKcdnrRNLQ-OhdezOUSaqsSkH77E36g6k',
        description: `Established in 1987, Cohn Financial Group (CFG) specializes in complex life insurance planning and is a leader in Private Placement Life Insurance (PPLI). CFG works exclusively with high net worth families, individuals, RIA's and family offices throughout the United States.`,
        address: '5090 N. 40th St., Suite 180. Phoenix, AZ',
        bannerImage:
          'https://media.licdn.com/dms/image/C561BAQG39KTkWi9t7A/company-background_10000/0/1585443562232/cfg_business_solutions_cover?e=2147483647&v=beta&t=d5QZaGl7MOlc1HSsNWbS46D5C1kAWhv9dwuNL6uxVlU',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '49',
        name: 'AZ|Magellan Health',
        iconUrl: 'https://www.magellanhealth.com/wp-content/uploads/2019/03/MH_color_r@2x.png',
        description: `Magellan Health Inc. (formerly Magellan Health Services Inc.), is an American for-profit managed health care company and subsidiary of Centene that's focused on special populations, complete pharmacy benefits and other specialty areas of healthcare. Magellan supports innovative ways of accessing better health through technology, while remaining focused on the critical personal relationships that are necessary to achieve a healthy, vibrant life.`,
        address: '4800 North Scottsdale Road, Suite 4400, Scottsdale, AZ',
        bannerImage: 'https://corporateofficeheadquarters.org/wp-content/uploads/2019/01/Magellan-Health.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '50',
        name: 'AZ|Shamrock Foods',
        iconUrl: 'https://cdn.phenompeople.com/CareerConnectResources/SHFOUS/social/1200x630-1641472879476.jpg',
        description: `Shamrock Foods distributes fresh and frozen foods, specialty items and gourmet foods to food service customers. The company also manufactures and distributes dairy products to supermarkets and convenience stores across the nation.`,
        address: '3900 East Camelback Road, Suite 300, Phoenix, AZ',
        bannerImage:
          'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0W7rTvxwX1ZytokqZT7nHJGNvXm8eCcJCwXtuDuxMvgH5NKhnRFYnngQN10W__DsiwOqGD950zkXi4bYIRXKKomqVra9auW1qLUJvvJsrAb1oEHr4wIZ0E_zpKJOGHNSVBkCGzX2KPLM/w1200-h630-p-k-no-nu/Shamrock+Foods+1.JPG',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '51',
        name: 'AZ|Morenci Mine',
        iconUrl: 'https://mms.businesswire.com/media/20240123350644/en/602050/22/FM_RGB_center_biz-wire.jpg',
        description: `Freeport-McMoRan (FCX) operates large, long-lived, geographically diverse assets with significant proven and probable reserves of copper, gold and molybdenum. The Morenci Mine is a large copper mine located near Morenci, Arizona, United States. Morenci represents one of the largest copper reserves in the United States and in the world, having estimated reserves of 3.2 billion tonnes of ore grading 0.16% copper.`,
        address: '333 N. Central Ave. Phoenix, AZ',
        bannerImage:
          'https://www.mining-technology.com/wp-content/uploads/sites/19/2016/06/Image-2-Morenci-Copper-Mine.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '52',
        name: 'LA|Adventist Health',
        iconUrl:
          'https://www.adventhealth.com/sites/default/files/styles/fc_800x533/public/media/pr-adventhealth-logo-hero_5.jpg.webp?h=4362216e&itok=v9KL6Abn',
        description: `Adventist Health Glendale is a hospital located in Glendale, California, it is part of the healthcare network Adventist Health. Adventist Health Glendale is one of the city's oldest businesses, founded in 1905, a year before Glendale was incorporated as a city. It was then known as Glendale Sanitarium, and it occupied the former Glendale Hotel, a 75-room Victorian structure on what is now Broadway Avenue.`,
        address: '1509 Wilson Terrace, Glendale, CA',
        bannerImage: 'https://media.spectrummagazine.org/app/uploads/2018/08/glendale_adventist.png',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '53',
        name: 'LA|Aerospace Corp',
        iconUrl:
          'https://media.licdn.com/dms/image/C560BAQF0iyB3ezgjpw/company-logo_200_200/0/1631376746621?e=2147483647&v=beta&t=kdEZqR9i4UiJ7wCeAB3BbFFJEsS4UF8OWKSTHDqPjh0',
        description: `The Aerospace Corporation is an American nonprofit corporation that operates a federally funded research and development center (FFRDC) in El Segundo, California. The corporation provides technical guidance and advice on all aspects of space missions to military, civil, and commercial customers. As the FFRDC for national-security space, Aerospace works closely with organizations such as the United States Space Force and the National Reconnaissance Office (NRO) to provide "objective technical analyses and assessments for space programs that serve the national interest". Although the USSF and NRO are the primary customers, Aerospace also performs work for civil agencies such as NASA and NOAA as well as international organizations and governments in the national interest.`,
        address: '2310 E El Segundo Blvd, El Segundo, CA',
        bannerImage: 'https://www.weoneil.com/wp-content/uploads/2022/03/aerospace-a9_1_feat_exterior-2400x1600.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
      {
        id: '54',
        name: 'LA|Charter Communications Inc. (Spectrum)',
        iconUrl: 'https://images.forbes.com/media/lists/companies/spectrum_416x416.jpg',
        description: `Charter Communications, Inc., is an American telecommunications and mass media company with services branded as Spectrum. With over 32 million customers in 41 states, it is the largest cable operator in the United States by subscribers, just ahead of Comcast, and the largest pay TV operator ahead of Comcast and AT&T.`,
        address: '1400 K Street, Suite 400, Sacramento, CA',
        bannerImage: 'https://corporate.charter.com/sites/default/files/2023-05/Enterprise_Hero_0.jpg',
        cardImage: '/src/assets/images/generic-student-id.svg',
      },
    ],
  },
  {
    type: InstitutionCategoryType.StateGovernment,
    displayName: 'State Government',
    icon: Icon.CapitolOutline,
    institutions: [],
  },
  {
    type: InstitutionCategoryType.Military,
    displayName: 'Military',
    icon: Icon.ShieldOutline,
    institutions: [
      {
        id: '01',
        name: 'XX|The U.S. Army',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Logo_of_the_United_States_Army.svg/1200px-Logo_of_the_United_States_Army.svg.png',
        description: `The United States Army (USA) is the land service branch of the United States Armed Forces. It is one of the eight U.S. uniformed services, and is designated as the Army of the United States in the U.S. Constitution. The Army is the oldest branch of the U.S. military and the most senior in order of precedence.`,
        bannerImage:
          'https://images03.military.com/sites/default/files/styles/full/public/2021-08/mil-barton-barracks-ansbach-alt-1800.jpg',
        cardImage: Image.UsArmyCard,
      },
      {
        id: '02',
        name: 'XX|The U.S. Air Force',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/US_Air_Force_Logo_Solid_Colour.svg/2560px-US_Air_Force_Logo_Solid_Colour.svg.png',
        description: `The United States Air Force (USAF) is the air service branch of the United States Armed Forces, and is one of the eight uniformed services of the United States. Originally created on 1 August 1907, as a part of the United States Army Signal Corps, the USAF was established as a separate branch of the United States Armed Forces in 1947 with the enactment of the National Security Act of 1947.`,
        bannerImage:
          'https://upload.wikimedia.org/wikipedia/commons/8/8a/Answering_the_call%2C_refueling_the_Spirit_130801-F-GR156-536.jpg',
        cardImage: Image.UsAirForceCard,
      },
      {
        id: '03',
        name: 'XX|The U.S. Marine Corps',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Emblem_of_the_United_States_Marine_Corps.svg/1200px-Emblem_of_the_United_States_Marine_Corps.svg.png',
        description: `The United States Marine Corps (USMC), also referred to as the United States Marines, is the maritime land force service branch of the United States Armed Forces responsible for conducting expeditionary and amphibious operations through combined arms, implementing its own infantry, artillery, aerial, and special operations forces. The U.S. Marine Corps is one of the eight uniformed services of the United States.`,
        bannerImage:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/2018-10-31_15_25_21_The_west_side_of_the_Marine_Corps_War_Memorial_in_Arlington_County%2C_Virginia.jpg/1200px-2018-10-31_15_25_21_The_west_side_of_the_Marine_Corps_War_Memorial_in_Arlington_County%2C_Virginia.jpg',
      },
      {
        id: '04',
        name: 'XX|The U.S. Navy',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Emblem_of_the_United_States_Navy.svg/440px-Emblem_of_the_United_States_Navy.svg.png',
        description: `The United States Navy (USN) is the maritime service branch of the United States Armed Forces and one of the eight uniformed services of the United States. It is the largest and most powerful navy in the world, with the estimated tonnage of its active battle fleet alone exceeding the next 13 navies combined, including 11 allies or partner nations of the U.S. as of 2009. It has the highest combined battle fleet tonnage (4,635,628 tonnes as of 2023) and the world's largest aircraft carrier fleet, with 11 in service, 1 undergoing trials, two new carriers under construction, and six other carriers planned as of 2024`,
        bannerImage:
          'https://globalaffairs.org/sites/default/files/styles/wide_lrg/public/2020-11/credit-us-navy-01.jpg?h=d8d1fca9&itok=8dJw8oIX',
        cardImage: Image.UsNavyCard,
      },
      {
        id: '05',
        name: 'XX|The U.S. Coast Guard',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Seal_of_the_United_States_Coast_Guard.svg/440px-Seal_of_the_United_States_Coast_Guard.svg.png',
        description: `The United States Coast Guard (USCG) is the maritime security, search and rescue, and law enforcement service branch of the United States Armed Forces and one of the country's eight uniformed services. The service is a maritime, military, multi-mission service unique among the United States military branches for having a maritime law enforcement mission with jurisdiction in both domestic and international waters and a federal regulatory agency mission as part of its duties. It is the largest coast guard in the world, rivaling the capabilities and size of most navies.`,
        bannerImage: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Coast_Guard_Island_May_2009.jpg',
        cardImage: Image.UsCoastGardCard,
      },
      {
        id: '06',
        name: 'XX|The U.S Space Force',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/United_States_Space_Force_logo.svg/440px-United_States_Space_Force_logo.svg.png',
        description: `The United States Space Force (USSF) is the space service branch of the U.S. Armed Forces. Along with the U.S. Air Force, it is part of the Department of the Air Force, led by the secretary of the Air Force. Its military heads are the chief of space operations, who is one of the Joint Chiefs of Staff, and vice chief of space operations.`,
        bannerImage:
          'https://images.ctfassets.net/jv40w9pms0ga/2hkGnasdvyKrgOj6LnFPNN/3d37ec0fadf4d0bcd85f0d495a2d13b8/peterson.jpg',
      },
    ],
  },
]
