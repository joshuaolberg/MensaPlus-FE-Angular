import {essenArt} from '../enums/essenArt';

export interface Essen {
  id: number;
  name: string;
  preis: number;
  art: essenArt;
}
