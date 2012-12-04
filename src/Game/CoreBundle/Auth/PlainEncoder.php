<?php

namespace Game\CoreBundle\Auth;

use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;

class PlainEncoder implements PasswordEncoderInterface
{
    public function encodePassword( $raw, $salt ) {
        return $raw;
    }

    public function isPasswordValid( $encoded, $raw, $salt ) {
        return ($encoded === $raw);
    }

}
?>