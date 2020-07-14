import { model, Schema } from 'mongoose';

import { NotificationModel, NotificationDocument } from '@typings/Notification';

const Notification: NotificationModel =
  model<NotificationDocument>('Notification', new Schema({
    _id: String,
    date: String,
  }));

export default Notification;

