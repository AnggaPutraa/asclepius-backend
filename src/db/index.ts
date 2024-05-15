import { Firestore } from '@google-cloud/firestore';
import { conf } from '../conf';

export const db = new Firestore({
  keyFilename: conf.keyFilenamePath,
});
