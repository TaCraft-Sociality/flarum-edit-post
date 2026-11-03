<?php

namespace Tcs\EditPost\Access;

use Flarum\Post\Post;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

/**
 * Grants the "edit" ability on any post to users whose groups have the
 * "discussion.editAnyPost" permission (configurable in the admin panel).
 *
 * This policy is additive: it returns null when the permission is missing, so
 * Flarum's core PostPolicy (author + "allow post editing" setting) still
 * decides in that case.
 */
class EditAnyPostPolicy extends AbstractPolicy
{
    public function edit(User $actor, Post $post): ?string
    {
        if ($post->hidden_at) {
            return null;
        }

        if ($actor->hasPermission('discussion.editAnyPost')) {
            return $this->allow();
        }

        return null;
    }
}
