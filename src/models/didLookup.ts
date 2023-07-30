export interface DidLookupCnam {
  name?: string;
  type?: any;
}

export interface DidLookupDetails {
  cnam?: DidLookupCnam;
  lrn?: any;
  carrier?: any;
}

export interface DidLookup {
  phonenumber?: string;
  country_code?: string;
  in_country_format?: string;
  international_format?: string;
  e164_format?: string;
  state?: string;
  details?: DidLookupDetails;
}
