export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: IAdress;
  company: ICompany;
}

export interface IAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
