<?php

namespace Game\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game\CoreBundle\Entity\MapItems
 *
 * @ORM\Table(name="map_items")
 * @ORM\Entity
 */
class MapItems
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
     * @var integer $mapId
     *
     * @ORM\Column(name="mapId", type="integer", nullable=false)
     */
    private $mapId;

    /**
     * @var integer $itemType
     *
     * @ORM\Column(name="itemType", type="smallint", nullable=false)
     */
    private $itemType;

    /**
     * @var string $itemAnimation
     *
     * @ORM\Column(name="itemAnimation", type="string", length=50, nullable=false)
     */
    private $itemAnimation;

    /**
     * @var string $itemAction
     *
     * @ORM\Column(name="itemAction", type="string", length=50, nullable=false)
     */
    private $itemAction;

    /**
     * @var string $itemposition
     *
     * @ORM\Column(name="itemPosition", type="string", length=50, nullable=false)
     */
    private $itemPosition;



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
     * Set mapId
     *
     * @param integer $mapId
     * @return MapItems
     */
    public function setMapId($mapId)
    {
        $this->mapId = $mapId;
    
        return $this;
    }

    /**
     * Get mapId
     *
     * @return integer 
     */
    public function getMapId()
    {
        return $this->mapId;
    }

    /**
     * Set itemType
     *
     * @param integer $itemType
     * @return MapItems
     */
    public function setItemType($itemType)
    {
        $this->itemType = $itemType;
    
        return $this;
    }

    /**
     * Get itemType
     *
     * @return integer 
     */
    public function getItemType()
    {
        return $this->itemType;
    }

    /**
     * Set itemAnimation
     *
     * @param string $itemAnimation
     * @return MapItems
     */
    public function setItemAnimation($itemAnimation)
    {
        $this->itemAnimation = $itemAnimation;
    
        return $this;
    }

    /**
     * Get itemAnimation
     *
     * @return string 
     */
    public function getItemAnimation()
    {
        return $this->itemAnimation;
    }

    /**
     * Set itemAction
     *
     * @param string $itemAction
     * @return MapItems
     */
    public function setItemAction($itemAction)
    {
        $this->itemAction = $itemAction;
    
        return $this;
    }

    /**
     * Get itemAction
     *
     * @return string 
     */
    public function getItemAction()
    {
        return $this->itemAction;
    }

    /**
     * Set itemPosition
     *
     * @param string $itemPosition
     * @return MapItems
     */
    public function setItemPosition($itemPosition)
    {
        $this->itemPosition = $itemPosition;
    
        return $this;
    }

    /**
     * Get itemPosition
     *
     * @return string 
     */
    public function getItemPosition()
    {
        return $this->itemPosition;
    }
}