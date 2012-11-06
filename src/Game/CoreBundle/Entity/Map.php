<?php

namespace Game\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game\CoreBundle\Entity\Map
 *
 * @ORM\Table(name="map")
 * @ORM\Entity
 */
class Map
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer $x
     *
     * @ORM\Column(name="x", type="integer", nullable=false)
     */
    private $x;

    /**
     * @var integer $y
     *
     * @ORM\Column(name="y", type="integer", nullable=false)
     */
    private $y;

    /**
     * @var string $mapdata
     *
     * @ORM\Column(name="mapData", type="text", nullable=false)
     */
    private $mapdata;



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
     * Set x
     *
     * @param integer $x
     * @return Map
     */
    public function setX($x)
    {
        $this->x = $x;
    
        return $this;
    }

    /**
     * Get x
     *
     * @return integer 
     */
    public function getX()
    {
        return $this->x;
    }

    /**
     * Set y
     *
     * @param integer $y
     * @return Map
     */
    public function setY($y)
    {
        $this->y = $y;
    
        return $this;
    }

    /**
     * Get y
     *
     * @return integer 
     */
    public function getY()
    {
        return $this->y;
    }

    /**
     * Set mapdata
     *
     * @param string $mapdata
     * @return Map
     */
    public function setMapdata($mapdata)
    {
        $this->mapdata = $mapdata;
    
        return $this;
    }

    /**
     * Get mapdata
     *
     * @return string 
     */
    public function getMapdata()
    {
        return $this->mapdata;
    }
}