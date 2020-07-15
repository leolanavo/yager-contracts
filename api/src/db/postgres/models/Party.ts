import { Entity, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ name: 'parties' })
class Party extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;
}

export default Party;