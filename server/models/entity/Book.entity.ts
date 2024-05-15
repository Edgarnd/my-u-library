import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("book")
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "title", type: "varchar", length: "80" })
    title: string | undefined;

    @Column({ name: "author", type: "varchar", length: "80" })
    author: string | undefined;

    @Column({ name: "genre", type: "varchar", length: "80" })
    genre: string | undefined;

    @Column({ name: "description", type: "varchar", length: "200" })
    description: string | undefined;

    @Column({ name: "revision", type: "varchar", length: "40" })
    revision: string | undefined;

    @Column({ name: "year_pub", type: "int" })
    yearPub: number | undefined;

    @Column({ name: "photo", type: "bytea" })
    photo: Buffer | undefined;

    @Column({ name: "photo_type", type: "varchar", length: "80" })
    photoType: string | undefined;
}