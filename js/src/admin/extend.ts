import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Admin() //
    .setting(() => ({
      setting: 'tcs-edit-post.header_buttons_on_replies',
      type: 'bool',
      label: app.translator.trans('tcs-edit-post.admin.settings.header_buttons_on_replies_label'),
      help: app.translator.trans('tcs-edit-post.admin.settings.header_buttons_on_replies_help'),
    }))
    .permission(
      () => ({
        icon: 'fas fa-pen-to-square',
        label: app.translator.trans('tcs-edit-post.admin.permissions.edit_any_post_label'),
        permission: 'discussion.editAnyPost',
      }),
      'moderate'
    ),
];
