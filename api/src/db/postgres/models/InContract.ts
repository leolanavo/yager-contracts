import { Entity, PrimaryColumn, BaseEntity, ManyToOne } from "typeorm";
import Party from '@postgres/models/Party';

@Entity({ name: 'in_contract' })
class InContract extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public contractId!: string;

  @ManyToOne(() => Party, party => party.contractsAsMain)
  public mainParty!: Party;

  @ManyToOne(() => Party, party => party.contractsAsSecondary)
  public secondaryParty!: Party;
}

export default InContract;
