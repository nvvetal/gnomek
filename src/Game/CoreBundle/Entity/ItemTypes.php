<?php

namespace Game\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game\CoreBundle\Entity\ItemTypes
 *
 * @ORM\Table(name="item_types")
 * @ORM\Entity
 */
class ItemTypes
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="smallint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string $name
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string $collisionType
     *
     * @ORM\Column(name="collisionType", type="string", nullable=false)
     */
    private $collisionType;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return ItemTypes
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set collisionType
     *
     * @param string $collisionType
     * @return ItemTypes
     */
    public function setCollisionType($collisionType)
    {
        $this->collisionType = $collisionType;
    
        return $this;
    }

    /**
     * Get collisionType
     *
     * @return string 
     */
    public function getCollisionType()
    {
        return $this->collisionType;
    }
}