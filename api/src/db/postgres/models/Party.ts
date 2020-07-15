import { Column, Entity, PrimaryColumn, BaseEntity } from "typeorm";

@Entity({ name: 'parties' })
class Party extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;

  @Column({ type: "varchar", default: "user" })
  public entity: "company" | "user" = "user";
}

export default Party;