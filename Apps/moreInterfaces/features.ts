export interface QueryString{
  // readonly fields?: string;
  readonly sort?:string;
  readonly search?: string;
  readonly page?:string;
  readonly limit?:number;
  [key: string]: any;
}

export interface SearchQuery{
  $or?: Array<{ [key:string]: RegExp }>;
  [key:string]:any;
}