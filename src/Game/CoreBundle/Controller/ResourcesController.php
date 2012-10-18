<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ResourcesController extends Controller
{

    public function initTerrainAction()
    {
        $terrains   = array();
        $terrains[] = array(
            'x'         => 250,
            'y'         => 40,
            'animation' => 'tonnel',
            'frameRate' => 2,
        );
        $terrains[] = array(
            'x'         => 282,
            'y'         => 40,
            'animation' => 'wall',
            'frameRate' => 2,
        );
        $animations = array(
            'ground' => array(
                array(
                    'x'         => 0,
                    'y'         => 0,
                    'width'     => 32,
                    'height'    => 32,
                ),
            ),
            'tonnel' => array(
                array(
                    'x'         => 0,
                    'y'         => 32,
                    'width'     => 32,
                    'height'    => 32,
                ),
            ),
            'wall' => array(
                array(
                    'x'         => 32,
                    'y'         => 0,
                    'width'     => 32,
                    'height'    => 32,
                ),
            ),
        );

        $data = array(
            'terrains'      => $terrains,
            'animations'    => $animations,
            'res'           => 'bundles/gamecore/img/terrain.png',
        );
        return new Response(json_encode($data), 200, array('Content-Type' => 'application/json'));
    }
}
