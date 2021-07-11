export interface Mp3Url {
  ulr: string;
  expires: string;
  canExpire: boolean;
}

export interface Mp3UrlCollection {
  [key: string]: Mp3Url;
}
