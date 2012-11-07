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
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            "SELECT m.itemAnimation as animation, i.collisionType, map.x, map.y, '2' as frameRate
            FROM GameCoreBundle:MapItems m
            JOIN m.itemTypes i
            JOIN m.map map
            WHERE i.name != :name"
        )->setParameter('name', 'gnomek');

        $terrains = $query->getArrayResult();

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
        $mineRight = array();
        for($i = 2; $i < 3; $i++){
            $mineRight[] = array(
                'x'     => $i * 32,
                'y'     => 32,
                'width' => 32,
                'height'=> 32,
            );
        }

        $mineLeft = array();
        for($i = 2; $i < 3; $i++){
            $mineLeft[] = array(
                'x'     => $i * 32,
                'y'     => 32,
                'width' => 32,
                'height'=> 32,
            );
        }

        $moveRight = array();
        for($i = 0; $i < 1; $i++){
            $moveRight[] = array(
                'x'     => $i * 32,
                'y'     => 32,
                'width' => 32,
                'height'=> 32,
            );
        }

        $moveLeft = array();
        for($i = 0; $i < 1; $i++){
            $moveLeft[] = array(
                'x'     => $i * 32,
                'y'     => 64,
                'width' => 32,
                'height'=> 32,
            );
        }

        $animations = array(
            'stay' => array(
                array(
                    'x'     => 0,
			        'y'     => 0,
			        'width' => 32,
			        'height'=> 32,
                ),
            ),
            'mineRight'         => $mineRight,
            'mineLeft'          => $mineLeft,
            'moveRight'         => $moveRight,
            'moveLeft'          => $moveLeft,
        );

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            "SELECT m.itemAnimation as animation, m.itemAction as currentAction, m.itemPosition as currentPosition, map.x, map.y, '2' as frameRate
            FROM GameCoreBundle:MapItems m
            JOIN m.itemTypes i
            JOIN m.map map
            WHERE i.name = :name"
        )->setParameter('name', 'gnomek');

        $gnomek = $query->getArrayResult();

        $data = array(
            'gnomek'        => $gnomek[0],
            'animations'    => $animations,
            'res'           => 'bundles/gamecore/img/gnomek.png',
        );
        return $data;
    }
}
