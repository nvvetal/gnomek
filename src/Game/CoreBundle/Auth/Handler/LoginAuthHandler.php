<?php

namespace Game\CoreBundle\Auth\Handler;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;


class LoginAuthHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{
    protected $router;
    protected $security;
    protected $doctrine;

    /**
     * This is called when an interactive authentication attempt fails. This is
     * called by authentication listeners inheriting from
     * AbstractAuthenticationListener.
     *
     * @param Request                 $request
     * @param AuthenticationException $exception
     *
     * @return Response The response to return, never null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        // TODO: Implement onAuthenticationFailure() method.
    }

    /**
     * This is called when an interactive authentication attempt succeeds. This
     * is called by authentication listeners inheriting from
     * AbstractAuthenticationListener.
     *
     * @param Request        $request
     * @param TokenInterface $token
     *
     * @return Response never null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        //TODO: setup facebookId
        if(method_exists($token, 'getResourceOwnerName') && $token->getResourceOwnerName() == 'facebook')
        {
            $facebookId = $token->getUserName();
            $user = $this->doctrine->getRepository('GameCoreBundle:User')->findOneByFacebookId($facebookId);
            if(!$user){
                $request->getSession()->set('userAuthData', array('type'=>'facebook', 'id' => $facebookId));
                $request->getSession()->set('needRegister', true);
            }else{
                //TODO: ROLE_USER
                $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
                $this->security->setToken($token);
            }
        }else{
            $needRegister =  $request->getSession()->get('needRegister');

            if($needRegister === true) {
                $login = $token->getUserName();
                $user = $this->doctrine->getRepository('GameCoreBundle:User')->findOneByUsername($login);
                $userAuthData =  $request->getSession()->get('userAuthData');
                if($userAuthData['type'] == 'facebook'){
                    $user->setFacebookId($userAuthData['id']);
                    $this->doctrine->flush();
                }
                $request->getSession()->set('needRegister', false);
            }
        }
        $url = $this->router->generate('_welcome');
        return new RedirectResponse($url);
    }

    function __construct(Router $router, SecurityContext $security, EntityManager $doctrine)
    {
        $this->router = $router;
        $this->security = $security;
        $this->doctrine = $doctrine;
    }
}