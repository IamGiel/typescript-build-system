export type ISearchWord = {
  term: string;
  isSelected: boolean;
};

export type ISearches = {
  searches: ISearchWord[];
};

export interface IMatchoryFilters {
  key: string;
  value: number;
}

export interface ILocation {
  country: string;
  locality: string;
}

export interface ICustomer extends IMatchoryFilters {
  data: ILocation;
  label: string;
}

export interface IFinalFilter {
  locations: IMatchoryFilters[]; // Initialize the country array
  buyers: ICustomer[]; // Initialize the buyers array
  hscodes: IMatchoryFilters[]; // Initialize the hscodes array
}

export interface ITaxonomyCode {
  identifier: string;
  type: string | null;
  count: number;
  description: string;
}
export interface ITopCustomer {
  uuid: string;
  name: string;
  legalName: string;
  country: string;
  locality: string;
}
export interface ITopKeyword {
  [index: number]: string;
}

export interface ICoordinates {
  latitude: string;
  longitude: string;
}

export interface IAddress {
  continent: string;
  country: string;
  locality: string;
  postOfficeBoxNumber: string;
  nullpostalCode: string;
  region: string;
  streetAddress: string;
  subcontinent: string;
}

export interface ICredential {
  identifier: string;
  name: string;
  type: string;
  expires: string | null;
}

export interface IAttributes {
  address: IAddress;
  credentials: ICredential[]; // You may want to provide a more specific type for this array
  foundingDate: Date; // Use Date type here
  legalName: string;
  location: ICoordinates;
  name: string;
  numberOfEmployees: number;
  revenue: number | null;
  taxonomyCodes: ITaxonomyCode[];
  topCustomers: ITopCustomer[];
  topDemandKeywords: ITopKeyword;
  topOfferKeywords: ITopKeyword;
  url: string;
  uuid: string;
}

export interface ILinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
  self: string;
  // Add other properties as needed
}
export interface IData {
  attributes: {
    aggregatedMatchedKeywords: string[];
    aggregatedScore: number;
    uuid: string;
    // Add other properties as needed
  };
  id: string;
  links: {
    self: string;
    // Add other properties as needed
  };
  relationships: {
    additionalMatches: {
      data: any[]; // Replace 'any' with the appropriate type if needed
      // Add other properties as needed
    };
    topMatch: {
      data: any; // Replace 'any' with the appropriate type if needed
      // Add other properties as needed
    };
    // Add other relationships as needed
  };
  type: string;
}

export interface IAggregations {
  classifications: Array<any>; // Replace 'any' with the appropriate type for classifications
  customers: Array<any>; // Replace 'any' with the appropriate type for customers
  countries: Array<any>; // Replace 'any' with the appropriate type for countries
  continents: Array<any>; // Replace 'any' with the appropriate type for continents
  // Add other properties as needed
}

export interface IMeta {
  aggregations: IAggregations;
  currentPage: number;
  from: number;
  hitCount: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
  // Add other properties as needed
}

export interface IMatchoryIncluded {
  attributes: IAttributes;
  id: string;
  links: any;
  meta: any;
  type: string;
}

export interface IMatchoryListQueryApiResponse {
  data: IData[];
  included: IMatchoryIncluded[];
  links: ILinks;
  meta: IMeta;
  id?: string;
}

export interface IExtendedMatchoryIncluded extends IMatchoryIncluded {
  isSelected: boolean;
}

export interface INextPage {
  id: string;
  page: number;
}
export interface MatchorySearchProps {
  token: string;
  emitFilters: (filters: any) => void;
  emitResults: (results: any) => void;
  isFetchingProp: (isFetching: boolean) => void;
  // hasSearchTerm: boolean;
  hasSearchTerm: (hasTerm: boolean) => void;
  getNextPage: INextPage;
}
