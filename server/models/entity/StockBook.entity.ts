import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stock_book")
export class StockBookEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({ name: "id_book", type: "int" })
    idBook: number | undefined;

    @Column({ name: "quantity", type: "int" })
    quantity: number | undefined;

    @Column({ name: "qty_lend", type: "int" })
    lend: number | undefined;
}