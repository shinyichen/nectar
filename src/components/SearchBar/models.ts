import { TypeaheadOption } from './types';

export const typeaheadOptions: TypeaheadOption[] = [
  { value: 'author:""', label: 'Author', match: ['author:"'], desc: '', id: 0 },
  { value: 'author:"^"', label: 'First Author', match: ['first author', 'author:"^'], desc: '', id: 1 },
  { value: 'bibcode:""', label: 'Bibcode', desc: 'e.g. bibcode:1989ApJ...342L..71R', match: ['bibcode:"'], id: 2 },
  {
    value: 'bibstem:""',
    label: 'Publication',
    desc: 'e.g. bibstem:ApJ',
    match: ['bibstem:"', 'publication (bibstem)'],
    id: 3,
  },
  { value: 'arXiv:', label: 'arXiv ID', desc: '', match: ['arxiv:'], id: 4 },
  { value: 'doi:', label: 'DOI', desc: '', match: ['doi:'], id: 5 },
  {
    value: 'full:""',
    label: 'Full text search',
    desc: 'title, abstract, and body',
    match: ['full:', 'fulltext'],
    id: 6,
  },
  { value: 'full:""', label: 'Full text search', desc: 'title, abstract, and body', match: ['text'], id: 7 },
  { value: 'year:', label: 'Year', match: ['year'], desc: '', id: 8 },
  { value: 'year:1999-2005', label: 'Year Range', desc: 'e.g. 1999-2005', match: ['year', 'range'], id: 9 },
  { value: 'aff:""', label: 'Affiliation', match: ['aff:'], desc: '', id: 10 },
  { value: 'abs:""', label: 'Search abstract + title + keywords', match: ['abs:'], desc: '', id: 11 },
  {
    value: 'collection:astronomy',
    label: 'Limit to papers in the astronomy collection',
    match: ['astronomy', 'collection:astronomy'],
    desc: '',
    id: 12,
  },
  {
    value: 'collection:physics',
    label: 'Limit to papers in the physics collection',
    match: ['physics', 'collection:physics'],
    desc: '',
    id: 13,
  },
  { value: 'title:""', label: 'Title', match: ['title:"'], desc: '', id: 14 },
  { value: 'orcid:', label: 'ORCiD identifier', match: ['orcid:'], desc: '', id: 15 },
  { value: 'object:', label: 'SIMBAD object (e.g. object:LMC)', desc: '', match: ['object:'], id: 16 },
  {
    value: 'property:refereed',
    label: 'Limit to refereed',
    desc: '(property:refereed)',
    match: ['refereed', 'property:refereed'],
    id: 17,
  },
  {
    value: 'property:notrefereed',
    label: 'Limit to non-refereed',
    desc: '(property:notrefereed)',
    match: ['notrefereed', 'property:notrefereed'],
    id: 18,
  },
  {
    value: 'property:eprint',
    label: 'Limit to eprints',
    desc: '(property:eprint)',
    match: ['eprint', 'property:eprint'],
    id: 19,
  },
  {
    value: 'property:openaccess',
    label: 'Limit to open access',
    desc: '(property:openaccess)',
    match: ['property:openaccess', 'openaccess'],
    id: 20,
  },
  {
    value: 'doctype:software',
    label: 'Limit to software',
    desc: '(doctype:software)',
    match: ['software', 'doctype:software'],
    id: 21,
  },
  {
    value: 'property:inproceedings',
    label: 'Limit to papers in conference proceedings',
    desc: '(property:inproceedings)',
    match: ['proceedings', 'property:inproceedings'],
    id: 22,
  },
  {
    value: 'citations()',
    label: 'Citations',
    desc: 'Get papers citing your search result set',
    match: ['citations('],
    id: 23,
  },
  {
    value: 'references()',
    label: 'References',
    desc: 'Get papers referenced by your search result set',
    match: ['references('],
    id: 24,
  },
  {
    value: 'trending()',
    label: 'Trending',
    desc: 'Get papers most read by users who recently read your search result set',
    match: ['trending('],
    id: 25,
  },
  {
    value: 'reviews()',
    label: 'Review Articles',
    desc: 'Get most relevant papers that cite your search result set',
    match: ['reviews('],
    id: 26,
  },
  {
    value: 'useful()',
    label: 'Useful',
    desc: 'Get papers most frequently cited by your search result set',
    match: ['useful('],
    id: 27,
  },
  {
    value: 'similar()',
    label: 'Similar',
    desc: 'Get papers that have similar full text to your search result set',
    match: ['similar('],
    id: 28,
  },
];
