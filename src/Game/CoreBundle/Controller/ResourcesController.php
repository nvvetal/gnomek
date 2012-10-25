<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class ResourcesController extends Controller
{

    public function initAction()
    {
        $data = array(
            'terrains'  => $this->_getTerrainData(),
            'gnomek'    => $this->_getGnomek(),
        );
        return new Response(json_encode($data), 200, array('Content-Type' => 'application/json'));
    }

	private function _getTerrainData()
	{
		$terrains   = array();
        $terrains[] = array(
            'x'                 => 9,
            'y'                 => 2,
            'animation'         => 'wall',
            'collisionType'     => 'wall',
            'frameRate'         => 2,
        );
		$terrains[] = array(
			'x'                 => 10,
			'y'                 => 2,
			'animation'         => 'tunnelUp',
            'collisionType'     => 'none',
			'frameRate'         => 2,
		);
		$terrains[] = array(
			'x'                 => 11,
			'y'                 => 2,
            'animation'         => 'tunnel',
            'collisionType'     => 'none',
            'frameRate'         => 2,
		);
        $terrains[] = array(
            'x'                 => 12,
            'y'                 => 2,
            'animation'         => 'wall',
            'collisionType'     => 'wall',
            'frameRate'         => 2,
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
			'tunnel' => array(
				array(
					'x'         => 0,
					'y'         => 32,
					'width'     => 32,
					'height'    => 32,
				),
			),
            'tunnelUp' => array(
                array(
                    'x'         => 32,
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
			'items'         => $terrains,
			'animations'    => $animations,
			'res'           => 'bundles/gamecore/img/terrain.png',
		);
        return $data;
	}

    private function _getGnomek()
    {
        $rightMine = array();
        for($i = 0; $i < 7; $i++){
            $rightMine[] = array(
                'x'     => $i * 32,
                'y'     => 32,
                'width' => 32,
                'height'=> 32,
            );
        }

        $animations = array(
            'idle' => array(
                array(
                    'x'     => 0,
			        'y'     => 0,
			        'width' => 32,
			        'height'=> 32,
                ),
            ),
            'rightMine' => $rightMine,
        );

        $gnomek = array(
            'x'                 => 10,
            'y'                 => 2,
            'animation'         => 'rightMine',
            'frameRate'         => 3,
            'currentAction'     => 'move',
            'currentPosition'   => 'right',
        );

        $data = array(
            'gnomek'        => $gnomek,
            'animations'    => $animations,
            'res'           => 'bundles/gamecore/img/gnomek.png',
        );
        return $data;
    }
}
