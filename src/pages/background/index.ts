import counterStorage from '@root/src/shared/storages/counterStorage';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import browser from 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */

reloadOnUpdate('pages/content/style.scss');

const init = async () => {
  await getInitialState();

  browser.runtime.onConnect.addListener(async port => {
    console.log('Port connected');
    port.onDisconnect.addListener(async () => {
      console.log('Port disconnected');
    });

    port.onMessage.addListener(async msg => {
      console.log('🚀 ~ incoming message:', msg);

      const countState = await counterStorage.get();
      const { count } = countState;

      if (msg.type === 'increment') {
        await counterStorage.setCount(count + 1);

        browser.action.setBadgeText({
          text: (count + 1).toString(),
        });
      } else if (msg.type === 'decrement') {
        await counterStorage.setCount(count - 1);

        browser.action.setBadgeText({
          text: (count - 1).toString(),
        });
      } else if (msg.type === 'reset') {
        await counterStorage.setCount(0);

        browser.action.setBadgeText({
          text: '0',
        });
      }
    });
  });
};

init();

async function getInitialState() {
  const countState = await counterStorage.get();
  const { count } = countState;
  browser.action.setBadgeText({
    text: count.toString(),
  });

  browser.action.setBadgeTextColor({
    color: '#fff',
  });
}
