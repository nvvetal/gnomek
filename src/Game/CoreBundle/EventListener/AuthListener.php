<?php

namespace Game\CoreBundle\EventListener;

use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;
use Symfony\Component\HttpFoundation\Response;
use Game\CoreBundle\Controller\SecurityController;


class AuthListener
{
    protected $router;

    public function __construct(Router $router)
    {
        $this->router = $router;
    }


    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        if (!is_array($controller)) {
            return;
        }
        //var_dump(get_class($controller[0]));
        //exit;
        if (!$controller[0] instanceof SecurityController) {
            $needRegister = $event->getRequest()->getSession()->get('needRegister');
            if($needRegister === true){
                $url = $this->router->generate('login');
                $redirect = new RedirectResponse($url);
                $redirect->send();
            }
        }


    }
}

?>