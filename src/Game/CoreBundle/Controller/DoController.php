<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DoController extends Controller
{
    public function indexAction($action)
    {
        $data = array(
            'action' => $action,
        );
        return new Response(json_encode($data), 200, array('Content-Type' => 'application/json'));
    }
}
