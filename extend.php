<?php

use Flarum\Extend;
use Flarum\Post\Post;
use Tcs\EditPost\Access\EditAnyPostPolicy;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->default('tcs-edit-post.header_buttons_on_replies', false)
        ->serializeToForum('tcsEditPostHeaderButtonsOnReplies', 'tcs-edit-post.header_buttons_on_replies', 'boolval'),

    (new Extend\Policy())
        ->modelPolicy(Post::class, EditAnyPostPolicy::class),
];
