<?php

namespace TestBundle\Entity\Repository;

use TestBundle\Entity\Vocabulary;
use Doctrine\ORM\EntityRepository;

/**
 * Class VocabularyRepository
 */
class VocabularyRepository extends EntityRepository
{
    public function getNextWord($wordsCurrentUser) {
        $qb  = $this->getEntityManager()->createQueryBuilder();

        $wordsVariants = $qb
            ->select('v.id', 'v.eng', 'v.rus')
            ->from('TestBundle:Vocabulary', 'v')
            ->where($qb->expr()->notIn('v.id', $wordsCurrentUser))
            ->setMaxResults(10)
            ->getQuery()
            ->getArrayResult();

        shuffle($wordsVariants);
        $word = array_slice($wordsVariants, 0, 1);

        return $word;
    }

    public function getChoices($currentWord) {
        $qb  = $this->getEntityManager()->createQueryBuilder();

        $wordsVariants = $qb
            ->select('v.id', 'v.eng', 'v.rus')
            ->from('TestBundle:Vocabulary', 'v')
            ->where($qb->expr()->notIn('v.id', $currentWord))
            ->setMaxResults(10)
            ->getQuery()
            ->getArrayResult();

        shuffle($wordsVariants);
        $word = array_slice($wordsVariants, 0, 3);

        return $word;
    }

}
