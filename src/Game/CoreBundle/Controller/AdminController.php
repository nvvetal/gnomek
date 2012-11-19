<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class AdminController extends Controller
{
    public function indexAction()
    {
        $data = array(
            'test' => 1,
        );
        return new Response(json_encode($data), 200, array('Content-Type' => 'application/json'));
    }
}
