import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import Party from '@postgres/models/Party';
import Company from '@postgres/models/Company';

@Entity({ name: 'users' })
class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  public id!: string;

  @Column({ type: "varchar", unique: true })
  public cpf!: string;

  @Column({ type: "varchar", unique: true })
  public email!: string;

  @Column({ type: "varchar" })
  public rg!: string;

  @Column({ type: "varchar", nullable: false })
  public name!: string;

  @Column({ type: "varchar", nullable: true })
  public signature!: string;

  @OneToOne(() => Party)
  @JoinColumn()
  public party!: Party;

  @ManyToMany(() => Company)
  @JoinColumn()
  public companies!: Company[];

  public toJSON(): Object {
    const companies: Object[] = this.companies
      ? this.companies.map(c => c.toJSON())
      : [];

    return {
      id: this.id,
      cpf: this.cpf,
      email: this.email,
      rg: this.rg,
      name: this.name,
      signature: this.signature,
      party: this.party.id,
      companies,
    }
  }
}

export default User;