import { createConnection } from "typeorm";

import Company from "@postgres/models/Company";
import User from "@postgres/models/User";
import Party from "@postgres/models/Party";

export default createConnection({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  logging: true,
  entities: [Company, User, Party]
});
