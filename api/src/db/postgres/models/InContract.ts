import { Entity, PrimaryColumn, BaseEntity, OneToMany } from "typeorm";
import Party from '@postgres/models/Party';

@Entity({ name: 'in_contract' })
class InContract extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public contractId!: string;

  @OneToMany(() => Party, party => party.contractsAsMain)
  public mainParty!: Party;

  @OneToMany(() => Party, party => party.contractsAsSecondary)
  public secondaryParty!: Party;
}

export default InContract;
