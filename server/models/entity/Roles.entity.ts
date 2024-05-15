import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class RolesEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "title", type: "varchar", length: 50 })
    title: string | undefined;
}