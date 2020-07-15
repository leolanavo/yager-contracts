import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import Party from '@postgres/models/Party';

@Entity({ name: 'companies' })
class Company extends BaseEntity {

  @PrimaryColumn({ type: "uuid" })
  public id!: string;

  @Column({ type: "varchar", unique: true })
  public cnpj!: string;

  @Column({ type: "varchar", nullable: false })
  public name!: string;

  @Column({ type: "simple-array", default: [] })
  public segments!: string[];

  @Column({ type: "simple-array", default: [] })
  public documents!: string[];

  @OneToOne(() => Party)
  @JoinColumn()
  public party!: Party;

  public toJSON(): Object {
    return {
      id: this.id,
      cnpj: this.cnpj,
      name: this.name,
      segments: this.segments,
      documents: this.documents,
      party: this.party.id,
    }
  }
}

export default Company;