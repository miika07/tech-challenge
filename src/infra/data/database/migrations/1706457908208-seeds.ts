import { MigrationInterface, QueryRunner } from "typeorm";

export class Seeds1706457908208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO \`produtos\` (\`id\`, \`nome\`, \`descricao\`, \`preco\`, \`categoria\`)
         VALUES 
         ('0688c7bd-daac-4db6-a52b-c6cbcb3e1b85', 'X-Salada', 'Pão, Hamburguer, Queijo e Salada', 25, 'Lanches'),
         ('342e139f-3c3b-450d-b2b2-b18db17d9be6', 'Batata frita', 'Batata frita na hora', 10, 'Acompanhamentos'), 
         ('7f1152f7-66bc-44d9-aae6-4c0161194c59', 'Coca-cola', 'Refrigerante', 5, 'Bebidas');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
