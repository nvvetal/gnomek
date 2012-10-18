<?php

namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class WelcomeController extends Controller
{

    public function indexAction()
    {
        return $this->render('GameCoreBundle:Welcome:index.html.twig');
    }
}
