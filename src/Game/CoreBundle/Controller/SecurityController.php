<?php
namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Game\CoreBundle\Entity\User;

class SecurityController extends Controller
{
    public function loginAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();
        $error = '';
// get the login error if there is one
        if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }
        //echo "<pre>";
        //var_dump($session);
        //exit;

        //$session->set('needAuthenticate')

        return $this->render('GameCoreBundle:Security:login.html.twig', array(
// last username entered by the user
            'last_username' => $session->get(SecurityContext::LAST_USERNAME),
            'error'         => $error,
        ));
    }

    public function registerAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();

        $user = new User();
        $user->setUsername($request->get('_username'));
        $user->setPassword($request->get('_password'));
        $validator = $this->get('validator');
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = '';
            foreach ($errors as $error)
            {
                $errorMessages .= $error->getMessage()."\n";
            }
            return $this->render('GameCoreBundle:Security:login.html.twig', array(
                'last_username' => $session->get($request->get('_username')),
                'error'         => $errorMessages,
            ));
        }
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        //TODO: DO authentication
        $data = array(
            'done' => 1,
        );
        //$this->redirect();
        return new Response(json_encode($data), 200, array('Content-Type' => 'application/json'));
    }
}

?>