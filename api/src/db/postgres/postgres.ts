import { createConnection } from "typeorm";

import Company from "@postgres/models/Company";
import User from "@postgres/models/User";
import Party from "@postgres/models/Party";
import InContract from "@postgres/models/InContract";

export default createConnection({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  logging: true,
  synchronize: true,
  entities: [Company, User, Party, InContract]
});
