<?php
namespace Game\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

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

    public function registerCheckAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();

        $user = new User();
        $user->setUsername($request->get('_username'));

        $factory = $this->get('security.encoder_factory');
        $encoder = $factory->getEncoder($user);
        $password = $encoder->encodePassword($request->get('_password'), $user->getSalt());
        $user->setPassword($password);

        $validator = $this->get('validator');
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = '';
            foreach ($errors as $error)
            {
                $errorMessages .= $error->getMessage()."\n";
            }
            return $this->render('GameCoreBundle:Security:register.html.twig', array(
                'last_username' => $session->get($request->get('_username')),
                'error'         => $errorMessages,
            ));
        }
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        $needRegister =  $request->getSession()->get('needRegister');
        if($needRegister === true) {
            $userAuthData =  $request->getSession()->get('userAuthData');
            if($userAuthData['type'] == 'facebook'){
                $user->setFacebookId($userAuthData['id']);
                $em->flush();
            }
            $request->getSession()->set('needRegister', false);
        }
        //TODO: ROLE USER
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->get('security.context')->setToken($token);

        $url = $this->get('router')->generate('_welcome');
        return new RedirectResponse($url);
    }

    public function registerAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();
        $userAuthData =  $session->get('userAuthData');
        $oauthMessage = '';
        if(!is_null($userAuthData)){
            if($userAuthData['type'] == 'facebook'){
                $oauthMessage = $this->get('translator')->trans('_register_from_facebook');
            }
        }
        return $this->render('GameCoreBundle:Security:register.html.twig', array('error'=>'', 'last_username' => '', 'oauthMessage' => $oauthMessage));
    }
}

?>