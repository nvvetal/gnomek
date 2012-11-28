<?php
namespace Game\CoreBundle\Auth;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUserProvider;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface,
    HWI\Bundle\OAuthBundle\Security\Core\User\OAuthUser,
    HWI\Bundle\OAuthBundle\Security\Core\User\OAuthAwareUserProviderInterface;

use Symfony\Component\Security\Core\User\UserInterface,
    Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class GameUserProvider extends OAuthUserProvider
{

    public function refreshUser(UserInterface $user)
    {

        //return new RedirectResponse('/login/');
        //header('Location: /login/?'.$user->getUsername());
        //exit;
        //var_dump($user->getUsername());
        return parent::refreshUser($user);
    }
}

