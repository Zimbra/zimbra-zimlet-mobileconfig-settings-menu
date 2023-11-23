import { createElement } from 'preact';
import { Text, IntlContext } from 'preact-i18n';
import { ModalDialog, ActionMenuItem } from '@zimbra-client/components';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
import style from './style';
import { useContext } from 'preact/hooks';
import { Button } from '@zimbra-client/blocks';

function createMore(props, context) {
   const { intl } = useContext(IntlContext);
   const zimletStrings = intl.dictionary['zimbra-zimlet-mobileconfig-settings-menu'];

   const handleClick = () => {
      showDialog();
   }

   const showDialog = () => {
      let downloadButton;
      downloadButton = <Button onClick={handleLinkClick} styleType="primary" brand="primary">{zimletStrings.buttonText}</Button>;

      let modal = (
         <ModalDialog
            title={zimletStrings.menuItem}
            cancelButton={false}
            onClose={handleClose}
            onAction={handleClose}
         >
            <div>
               {zimletStrings.modalText}
               <br /><br />
               {downloadButton}
               <br /><br />
            </div>
         </ModalDialog>
      );

      const { dispatch } = context.store;
      dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'mobileconfigModal', modal: modal }));
   }

   const handleClose = () => {
      const { dispatch } = context.store;
      return dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'mobileconfigModal' }));
   }

   const handleLinkClick = () => {
      const { dispatch } = context.store;
      dispatch(context.zimletRedux.actions.notifications.notify({
         message: zimletStrings.downloading
      }));
      window.open(context.zimbraOrigin + '/service/home/~/?fmt=mobileconfig&configType=all');
   }
   const childIcon = (
      <span class={style.appIcon}>
      </span>);

   return (
      <div>
         <ActionMenuItem icon={childIcon} onClick={e => handleClick(props)}>
            <Text id={`zimbra-zimlet-mobileconfig-settings-menu.menuItem`} />
         </ActionMenuItem>
      </div>
   );

}

export default compose(
   withIntl()
)
   (
      createMore
   )
