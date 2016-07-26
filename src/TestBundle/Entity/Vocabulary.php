<?php

namespace TestBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Vocabulary
 *
 * @ORM\Table(name="vocabulary", indexes={@ORM\Index(name="eng", columns={"eng"}), @ORM\Index(name="rus", columns={"rus"})})
 * @ORM\Entity(repositoryClass="TestBundle\Entity\Repository\VocabularyRepository")
 */
class Vocabulary
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="eng", type="text", nullable=false)
     */
    private $eng;

    /**
     * @var string
     * @ORM\Column(name="rus", type="text", nullable=false)
     */
    private $rus;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get english word
     * @return string
     */
    public function getEng()
    {
        return $this->eng;
    }

    /**
     * Get russian word
     * @return string
     */
    public function getRus()
    {
        return $this->rus;
    }


}
