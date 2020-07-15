import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import Party from '@postgres/models/Party';

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

  public toJSON(): Object {
    return {
      id: this.id,
      cpf: this.cpf,
      email: this.email,
      rg: this.rg,
      name: this.name,
      signature: this.signature,
      party: this.party.id,
    }
  }
}

export default User;