<?php

namespace TestBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * WrongStat
 *
 * @ORM\Table(name="wrong_stat", indexes={@ORM\Index(name="word", columns={"word"})})
 * @ORM\Entity
 */
class WrongStat
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
     * @ORM\Column(name="word", type="text", nullable=false)
     */
    private $word;

    /**
     * @var string
     * @ORM\Column(name="translation", type="text", nullable=false)
     */
    private $translation;

    /**
     * @var integer
     * @ORM\Column(name="count", type="integer", nullable=false)
     */
    private $count;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get word
     * @return string
     */
    public function getWord()
    {
        return $this->word;
    }

    /**
     * Set word
     *
     * @param string $word
     * @return Result
     */
    public function setWord($word)
    {
        $this->word = $word;
        return $this;
    }

    /**
     * Get translation
     * @return string
     */
    public function getTranslation()
    {
        return $this->translation;
    }

    /**
     * Set translation
     * @param string $translation
     * @return Result
     */
    public function setTranslation($translation)
    {
        $this->translation = $translation;
        return $this;
    }

    /**
     * Get count
     * @return integer
     */
    public function getCount()
    {
        return $this->count;
    }

    /**
     * Set count
     * @param integer $count
     * @return Result
     */
    public function setCount($count)
    {
        $this->count = $count;
        return $this;
    }
}
