import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: 'companies' })
class Company extends BaseEntity {

  @PrimaryColumn({ type: "uuid" })
  public id!: string;

  @Column({ type: "varchar", unique: true })
  public cnpj!: string;

  @Column({ type: "varchar", nullable: false })
  public name!: string;
}

export default Company;