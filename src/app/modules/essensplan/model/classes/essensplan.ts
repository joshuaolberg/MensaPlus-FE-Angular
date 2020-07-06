import {Essen} from '../../../essen/model/classes/essen';
import {Wochentag} from '../enums/wochentag';

export interface Essensplan {
  id: number;
  kalenderwoche: number;
  essenProWoche: { [key in Wochentag]: Essen };
}
