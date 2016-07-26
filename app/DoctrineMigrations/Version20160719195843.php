<?php

namespace Application\Migrations;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160719195843 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $vocabulary_keys = ['eng', 'rus'];
        $words = [
            ['apple', 'яблоко'],
            ['pear', 'персик'],
            ['orange', 'апельсин'],
            ['grape', 'виноград'],
            ['lemon', 'лимон'],
            ['pineapple', 'ананас'],
            ['watermelon', 'арбуз'],
            ['coconut', 'кокос'],
            ['banana', 'банан'],
            ['pomelo', 'помело'],
            ['strawberry', 'клубника'],
            ['melon', 'дыня'],
            ['apricot', 'абрикос'],
            ['mango', 'манго'],
            ['pear', 'слива'],
            ['pomegranate', 'гранат'],
            ['cherry', 'вишня']
        ];

        $connection = $this->connection;
        $connection->transactional(function(Connection $connection) use ($vocabulary_keys, $words){
            $this->insertMultiple('vocabulary', $words, $vocabulary_keys, $connection);
        });
    }

    /**
     * @param $table
     * @param $entities
     * @param $entity_keys
     * @param Connection $connection
     */
    private function insertMultiple($table, $entities, $entity_keys, $connection){
        foreach($entities as $p) {
            $entity = [];
            foreach($entity_keys as $i => $entity_key){
                $entity[$entity_key] = $p[$i];
            }
            $connection->insert($table, $entity);
        }
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
