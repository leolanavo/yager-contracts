import { createConnection } from "typeorm";

import Company from "@postgres/models/Company";

export default createConnection({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  logging: true,
  entities: [Company]
});
