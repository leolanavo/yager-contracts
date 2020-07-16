import { Column, Entity, PrimaryColumn, BaseEntity, OneToMany } from "typeorm";
import InContract from '@postgres/models/InContract';

@Entity({ name: 'parties' })
class Party extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;

  @Column({ type: "varchar", default: "user" })
  public entity: "company" | "user" = "user";

  @OneToMany(() => InContract, contract => contract.mainParty)
  public contractsAsMain!: InContract[];

  @OneToMany(() => InContract, contract => contract.secondaryParty)
  public contractsAsSecondary!: InContract[];
}

export default Party;