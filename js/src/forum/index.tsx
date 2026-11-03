import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import CommentPost from 'flarum/forum/components/CommentPost';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import PostControls from 'flarum/forum/utils/PostControls';

import type Discussion from 'flarum/common/models/Discussion';
import type Post from 'flarum/common/models/Post';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

export { default as extend } from './extend';

/**
 * Open the composer in "edit post" mode for the given post.
 *
 * Reuses core's own edit action so the lazily loaded `EditPostComposer` chunk
 * is resolved exactly as Flarum does it for the "…" post menu.
 */
export function editPost(post: Post): void {
  (PostControls.editAction as (this: Post) => void).call(post);
}

/**
 * Whether the current actor may edit this post, according to the API payload.
 * (The backend computes this with the core PostPolicy plus our
 * "discussion.editAnyPost" permission policy.)
 */
function canEdit(post: Post | false | null | undefined): post is Post {
  return !!post && !!post.id() && !post.isHidden() && !!post.canEdit();
}

/**
 * Whether the header button should be shown on reply floors as well.
 * Disabled by default: only the discussion's first post gets the header
 * button, reply floors keep Flarum's native bottom "…" menu.
 */
function headerButtonOnReplies(): boolean {
  return !!app.forum.attribute('tcsEditPostHeaderButtonsOnReplies');
}

/** First post of the discussion (number 1). */
function isFirstPost(post: Post): boolean {
  return !!post.number && post.number() === 1;
}

app.initializers.add('tcs-edit-post', () => {
  // 1. Add "编辑帖子" to the discussion action menu (the dropdown attached to
  //    the Reply split button). It edits the first post of the discussion, so
  //    users no longer have to scroll to the bottom of a long first post.
  extend(DiscussionControls, 'moderationControls', function (items: ItemList<Mithril.Children>, discussion: Discussion) {
    const post = discussion.firstPost();

    if (!canEdit(post)) {
      return;
    }

    items.add(
      'tcsEditPost',
      <Button icon="fas fa-pen-to-square" onclick={() => editPost(post)}>
        {app.translator.trans('tcs-edit-post.forum.edit_post')}
      </Button>
    );
  });

  // 2. Add a compact "edit" button to the post header, so the entry point is
  //    visible as soon as the post scrolls into view (no scrolling to the
  //    bottom of the post required). By default this only applies to the
  //    discussion's first post; reply floors can opt in via an admin setting.
  extend(CommentPost.prototype, 'headerItems', function (this: CommentPost, items: ItemList<Mithril.Children>) {
    const post = (this.attrs as { post?: Post }).post;

    if (!canEdit(post)) {
      return;
    }

    if (!headerButtonOnReplies() && !isFirstPost(post)) {
      return;
    }

    items.add(
      'tcsEditPost',
      <Button
        className="Button Button--icon Button--link tcsEditPostButton"
        icon="fas fa-pen-to-square"
        title={app.translator.trans('tcs-edit-post.forum.edit_post_tooltip')}
        aria-label={app.translator.trans('tcs-edit-post.forum.edit_post')}
        onclick={() => editPost(post)}
      />,
      -100
    );
  });
});
