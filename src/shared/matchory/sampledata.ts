export const keywordsArr = [
  { name: 'corn', isSelected: true },
  { name: 'bran', isSelected: true },
  { name: 'breakfast food', isSelected: true },
  { name: 'grain', isSelected: true },
  { name: 'oats', isSelected: true },
  { name: 'rice', isSelected: true },
  { name: 'rye', isSelected: true },
  { name: 'barley', isSelected: true },
];
export const mfgsArr = [
  { name: 'cereal', isSelected: true },
  { name: 'grass', isSelected: true },
  { name: 'durum', isSelected: true },
  { name: 'gluten', isSelected: true },
  { name: 'semolina', isSelected: true },
  { name: 'spelt', isSelected: true },
];

export const alternativesArr = [
  { name: 'Harvesting', isSelected: true },
  { name: 'Storage', isSelected: true },
  { name: 'Cleaning', isSelected: true },
  { name: 'Conditioning', isSelected: true },
  { name: 'Bending', isSelected: true },
  { name: 'Grinding', isSelected: true },
  { name: 'Scrap Phase', isSelected: true },
  { name: 'Sieving', isSelected: true },
  { name: 'Packing', isSelected: true },
  { name: 'Destoner', isSelected: true },
  { name: 'Trieur', isSelected: true },
];

export const locationsArr = [
  { name: 'China', isSelected: true },
  { name: 'India', isSelected: true },
  { name: 'Russia', isSelected: true },
  { name: 'Germany', isSelected: true },
  { name: 'France', isSelected: true },
  { name: 'United States', isSelected: true },
];

export const hscodesArr = [
  { name: '10019910 - Wheat', isSelected: true },
  { name: '1103 - Cereal Groats, Meal And Pelle...', isSelected: true },
  { name: '11031300 - Of wheat: Of maize (corn)', isSelected: true },
  { name: '11042951 - Cereal, grains, wheat', isSelected: true },
  { name: '1105 - Flour, Meal, Powder, Flakes...', isSelected: true },
];

export const buyersArr = [
  { name: 'Nestle', isSelected: true },
  { name: 'Lenovo', isSelected: true },
  { name: 'IBM', isSelected: true },
  { name: 'Proctor & Gamble', isSelected: true },
  { name: 'Johnson & Johnson', isSelected: true },
  { name: 'John Deere', isSelected: true },
];

export const sectionLabels = {
  keyword: 'KEYWORDS',
  alternative: 'ALTERNATIVE_KEYWORDS',
  mfgprocess: 'MANUFACTURING_PROCESSES',
  locations: 'LOCATIONS',
  hscodes: 'HSCODES',
  buyers: 'BUYERS',
};

export const searchResultsData = {
  totalResults: 12346,
  searchterm: 'Asynchronous motor',
  keywords: [
    { name: 'Generator', isSelected: false },
    { name: 'AC/DC', isSelected: false },
    { name: 'Generator2', isSelected: false },
    {
      name: 'Threephase motor asdasdasdassssd sdsda sd 1',
      isSelected: false,
    },
    { name: 'Squirrel cage motor 1', isSelected: false },
    { name: 'electric motor 1', isSelected: false },
    { name: 'Generator3', isSelected: false },
    { name: 'AB/DC', isSelected: false },
    { name: 'Generator4', isSelected: false },
    { name: 'Threephase motor 2', isSelected: false },
    { name: 'Squirrel cage motor 2', isSelected: false },
    { name: 'electric motor 2', isSelected: false },
    { name: 'Generator5', isSelected: false },
    { name: 'AZ/DC', isSelected: false },
    { name: 'Generator6', isSelected: false },
    { name: 'Threephase motor 3', isSelected: false },
    { name: 'Squirrel cage motor 3', isSelected: false },
    { name: 'electric motor 3', isSelected: false },
  ],
  suppliers: [
    {
      name: 'Supplier A',
      isSelected: false,
      location: {
        locname: 'Location A',
        longitude: -122.4194,
        latitude: 37.7749,
      },
    },
    {
      name: 'Supplier B',
      isSelected: false,
      location: {
        locname: 'Location B',
        longitude: -74.006,
        latitude: 40.7128,
      },
    },
    {
      name: 'Supplier C',
      isSelected: false,
      location: {
        locname: 'Location C',
        longitude: -0.1276,
        latitude: 51.5074,
      },
    },
    {
      name: 'Supplier D',
      isSelected: false,
      location: {
        locname: 'Location D',
        longitude: 139.6917,
        latitude: 35.6895,
      },
    },
    {
      name: 'Supplier E',
      isSelected: false,
      location: { locname: 'Location E', longitude: 2.3522, latitude: 48.8566 },
    },
    {
      name: 'Supplier F',
      isSelected: false,
      location: {
        locname: 'Location F',
        longitude: -3.7038,
        latitude: 40.4168,
      },
    },
    {
      name: 'Supplier G',
      isSelected: false,
      location: {
        locname: 'Location G',
        longitude: 114.1694,
        latitude: 22.3193,
      },
    },
    {
      name: 'Supplier H',
      isSelected: false,
      location: {
        locname: 'Location H',
        longitude: 103.8198,
        latitude: 1.3521,
      },
    },
    {
      name: 'Supplier I',
      isSelected: false,
      location: { locname: 'Location I', longitude: 4.8952, latitude: 52.3702 },
    },
    {
      name: 'Supplier J',
      isSelected: false,
      location: {
        locname: 'Location J',
        longitude: -77.0369,
        latitude: 38.9072,
      },
    },
  ],
};

export const searchDatafromapi = [
  {
    sectionName: 'Keywords',
    suggested: 'Suggested Keywords',
    preselectedItems: keywordsArr,
    isOpen: false,
    tagname: `TagName_Keywords`.trim().toUpperCase(),
  },
  {
    sectionName: 'Manufacturing Processes',
    suggested: 'Suggested Mfg Processes',
    preselectedItems: mfgsArr,
    isOpen: false,
    tagname: `TagName_Manufacturing`.trim().toUpperCase(),
  },
  {
    sectionName: 'Alternative keywords',
    suggested: 'Suggested Mfg Processes',
    preselectedItems: alternativesArr,
    isOpen: false,
    tagname: `TagName_Alternative`.trim().toUpperCase(),
  },
];

export const filterDatafromapi = [
  {
    sectionName: 'Locations',
    suggested: 'Suggested locations',
    preselectedItems: locationsArr,
    isOpen: false,
    tagname: `TagName_Locations`.trim().toUpperCase(),
  },
  {
    sectionName: 'HS-Codes',
    suggested: 'Suggested HS-codes',
    preselectedItems: hscodesArr,
    isOpen: false,
    tagname: `TagName_HSCODES`.trim().toUpperCase(),
  },
  {
    sectionName: 'Buyers',
    suggested: 'Suggested buyers',
    preselectedItems: buyersArr,
    isOpen: false,
    tagname: `TagName_Buyers`.trim().toUpperCase(),
  },
];
