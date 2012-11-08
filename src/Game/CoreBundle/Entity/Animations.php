<?php

namespace Game\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game\CoreBundle\Entity\Animations
 *
 * @ORM\Table(name="animations")
 * @ORM\Entity
 */
class Animations
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
     * @var string $name
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string $type
     *
     * @ORM\Column(name="type", type="string", length=20, nullable=false)
     */
    private $type;

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
     * @var boolean $position
     *
     * @ORM\Column(name="position", type="boolean", nullable=false)
     */
    private $position;


}
