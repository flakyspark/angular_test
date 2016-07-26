<?php

namespace TestBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Result
 *
 * @ORM\Table(name="results", indexes={@ORM\Index(name="username", columns={"username"})})
 * @ORM\Entity
 */
class Result
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
     * @ORM\Column(name="username", type="text", nullable=false)
     */
    private $username;

    /**
     * @var integer
     * @ORM\Column(name="score", type="integer", nullable=false)
     */
    private $score;

    /**
     * Get id
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get username
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set username
     * @param string $username
     * @return Result
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get score
     * @return integer
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Set score
     * @param integer $score
     * @return Result
     */
    public function setScore($score)
    {
        $this->score = $score;
        return $this;
    }
}
