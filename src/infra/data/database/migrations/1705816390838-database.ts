import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1705816390838 implements MigrationInterface {
    name = 'Database1705816390838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`clientes\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`produtos\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, \`preco\` int NOT NULL, \`categoria\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`itens_pedido\` (\`id\` varchar(36) NOT NULL, \`quantidade\` int NOT NULL, \`idPedido\` varchar(36) NULL, \`idProduto\` varchar(36) NULL, UNIQUE INDEX \`REL_1f3b2ecebc6d263090f6eedd85\` (\`idProduto\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedidos\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL, \`idCliente\` varchar(36) NULL, UNIQUE INDEX \`REL_8e5d1e37b1e2b6bea839aaca46\` (\`idCliente\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_a681a5780f65ef30fd5d87fef1e\` FOREIGN KEY (\`idPedido\`) REFERENCES \`pedidos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` ADD CONSTRAINT \`FK_1f3b2ecebc6d263090f6eedd85a\` FOREIGN KEY (\`idProduto\`) REFERENCES \`produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedidos\` ADD CONSTRAINT \`FK_8e5d1e37b1e2b6bea839aaca466\` FOREIGN KEY (\`idCliente\`) REFERENCES \`clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pedidos\` DROP FOREIGN KEY \`FK_8e5d1e37b1e2b6bea839aaca466\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_1f3b2ecebc6d263090f6eedd85a\``);
        await queryRunner.query(`ALTER TABLE \`itens_pedido\` DROP FOREIGN KEY \`FK_a681a5780f65ef30fd5d87fef1e\``);
        await queryRunner.query(`DROP INDEX \`REL_8e5d1e37b1e2b6bea839aaca46\` ON \`pedidos\``);
        await queryRunner.query(`DROP TABLE \`pedidos\``);
        await queryRunner.query(`DROP INDEX \`REL_1f3b2ecebc6d263090f6eedd85\` ON \`itens_pedido\``);
        await queryRunner.query(`DROP TABLE \`itens_pedido\``);
        await queryRunner.query(`DROP TABLE \`produtos\``);
        await queryRunner.query(`DROP TABLE \`clientes\``);
    }

}