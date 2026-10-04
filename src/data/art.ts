/**
 * Every image on the site comes from Wikimedia Commons and is public domain or CC0.
 * `scripts/images.mjs` downloads the sources and renders them into public/images;
 * the credits page and figure captions read the same list.
 */
export interface Art {
  id: string;
  /** what the picture shows, used as alt text and caption */
  caption: string;
  author: string;
  date: string;
  license: 'Public domain' | 'CC0';
  /** Commons file page */
  page: string;
  /** direct download (a Commons thumbnail is plenty) */
  source: string;
  /** crop as fractions of the source: [left, top, width, height] */
  crop?: [number, number, number, number];
  /** levels applied before toning: luminance below black → ink, above white → paper */
  levels?: [number, number];
}

const commons = 'https://commons.wikimedia.org/wiki/File:';
const thumb = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/';
const upload = 'https://upload.wikimedia.org/wikipedia/commons/';

export const art = {
  calculator: {
    id: 'calculator',
    caption: 'Calculating machine, patent drawing by William S. Burroughs, 1888',
    author: 'William Seward Burroughs / U.S. National Archives',
    date: '1888',
    license: 'Public domain',
    page: `${commons}Drawing_for_a_Calculating_Machine_-_NARA_-_595511_(page_2).jpg`,
    source: `${thumb}5/54/Drawing_for_a_Calculating_Machine_-_NARA_-_595511_%28page_2%29.jpg/1920px-Drawing_for_a_Calculating_Machine_-_NARA_-_595511_%28page_2%29.jpg`,
    crop: [0.08, 0.17, 0.84, 0.64],
    levels: [70, 175],
  },
  punchcard: {
    id: 'punchcard',
    caption: 'IBM 80-column punched card',
    author: 'Gwern / agr',
    date: '2009',
    license: 'Public domain',
    page: `${commons}Blue-punch-card-front-horiz.png`,
    source: `${thumb}4/4c/Blue-punch-card-front-horiz.png/1920px-Blue-punch-card-front-horiz.png`,
    levels: [60, 150],
  },
  cabinet: {
    id: 'cabinet',
    caption: 'Filing cabinet, patent drawing by Joseph J. Atkinson, 1909',
    author: 'Joseph J. Atkinson / University of North Texas Libraries',
    date: '1909',
    license: 'Public domain',
    page: `${commons}Filing-Cabinet._-_DPLA_-_3f5b273652d799503cf2b3cf80c09010_(page_1).jpg`,
    source: `${upload}2/2d/Filing-Cabinet._-_DPLA_-_3f5b273652d799503cf2b3cf80c09010_%28page_1%29.jpg`,
    crop: [0.05, 0.1, 0.9, 0.62],
    levels: [80, 200],
  },
  hollerith: {
    id: 'hollerith',
    caption: 'Hollerith punched card, 1895',
    author: 'Unknown / Library of Congress',
    date: '1895',
    license: 'Public domain',
    page: `${commons}Hollerith_Punched_Card.jpg`,
    source: `${upload}e/ea/Hollerith_Punched_Card.jpg`,
    levels: [40, 190],
  },
  census: {
    id: 'census',
    caption: 'Tabulating machine built for the 1940 U.S. census',
    author: 'Harris & Ewing / Library of Congress',
    date: '1939',
    license: 'Public domain',
    page: `${commons}New_machine_to_speed_up_statistics_of_census_of_1940._Washington,_D.C.,_Dec._2._Back_in_1870,_it_took_7_years_to_compile_statistics_from_the_facts_taken_by_census_takers,_but_in_the_next_10_LCCN2016876696.jpg`,
    source: `${thumb}6/68/New_machine_to_speed_up_statistics_of_census_of_1940._Washington%2C_D.C.%2C_Dec._2._Back_in_1870%2C_it_took_7_years_to_compile_statistics_from_the_facts_taken_by_census_takers%2C_but_in_the_next_10_LCCN2016876696.jpg/1920px-thumbnail.jpg`,
    crop: [0.04, 0.06, 0.92, 0.88],
    levels: [20, 210],
  },
  typewriter: {
    id: 'typewriter',
    caption: 'Type-writing machine, patent drawing by C. L. Sholes',
    author: 'C. L. Sholes / U.S. National Archives',
    date: '1878',
    license: 'Public domain',
    page: `${commons}C._L._Sholes_Type_Writing_Machine_-_NARA_-_84785533_(page_1).jpg`,
    source: `${thumb}4/45/C._L._Sholes_Type_Writing_Machine_-_NARA_-_84785533_%28page_1%29.jpg/1920px-C._L._Sholes_Type_Writing_Machine_-_NARA_-_84785533_%28page_1%29.jpg`,
    crop: [0.06, 0.16, 0.88, 0.6],
    levels: [70, 185],
  },
  telegraph: {
    id: 'telegraph',
    caption: 'Apparatus for wireless telegraphy, patent drawing by Guglielmo Marconi, 1904',
    author: 'Guglielmo Marconi / U.S. National Archives',
    date: '1904',
    license: 'Public domain',
    page: `${commons}Patent_Drawing_for_G._Marconi%27s_Apparatus_for_Wireless_Telegraphy_-_NARA_-_6277803.jpg`,
    source: `${thumb}f/f9/Patent_Drawing_for_G._Marconi%27s_Apparatus_for_Wireless_Telegraphy_-_NARA_-_6277803.jpg/1920px-Patent_Drawing_for_G._Marconi%27s_Apparatus_for_Wireless_Telegraphy_-_NARA_-_6277803.jpg`,
    crop: [0.08, 0.14, 0.84, 0.56],
    levels: [80, 180],
  },
  astrolabe: {
    id: 'astrolabe',
    caption: 'Astrolabium, engraving by Jan Collaert II after Jan van der Straet, c. 1590',
    author: 'Jan Collaert II after Jan van der Straet / British Museum',
    date: 'c. 1590',
    license: 'Public domain',
    page: `${commons}Astrolabium_(BM_1948,0410.4.208).jpg`,
    source: `${upload}5/59/Astrolabium_%28BM_1948%2C0410.4.208%29.jpg`,
    crop: [0.3, 0.08, 0.66, 0.8],
    levels: [40, 200],
  },
  map: {
    id: 'map',
    caption: 'Map of Morocco and the Barbary Coast by Pierre Lapie, 1829',
    author: 'Pierre Lapie / Geographicus Rare Antique Maps',
    date: '1829',
    license: 'Public domain',
    page: `${commons}1829_Lapie_Map_of_the_Eastern_Mediterranean,_Morocco,_and_the_Barbary_Coast_-_Geographicus_-_Barbarie-lapie-1829.jpg`,
    source: `${thumb}3/39/1829_Lapie_Map_of_the_Eastern_Mediterranean%2C_Morocco%2C_and_the_Barbary_Coast_-_Geographicus_-_Barbarie-lapie-1829.jpg/1920px-1829_Lapie_Map_of_the_Eastern_Mediterranean%2C_Morocco%2C_and_the_Barbary_Coast_-_Geographicus_-_Barbarie-lapie-1829.jpg`,
    crop: [0.02, 0.2, 0.56, 0.62],
    levels: [60, 215],
  },
} satisfies Record<string, Art>;

export type ArtId = keyof typeof art;
