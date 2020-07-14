import { model, Schema } from 'mongoose';

import { ExtensionModel, ExtensionDocument } from '@typings/Extension';

const Extension: ExtensionModel =
  model<ExtensionDocument>('Extension', new Schema({
    _id: String,
    date: String,
    newEndDate: String,
  }));

export default Extension;

