import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Admin() //
    .permission(
      () => ({
        icon: 'fas fa-pen-to-square',
        label: app.translator.trans('tcs-edit-post.admin.permissions.edit_any_post_label'),
        permission: 'discussion.editAnyPost',
      }),
      'moderate'
    ),
];
