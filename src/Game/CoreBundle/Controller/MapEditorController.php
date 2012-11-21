<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class MapEditorController extends Controller
{
    public function indexAction()
    {
        return $this->render('GameCoreBundle:MapEditor:index.html.twig');
    }
}
