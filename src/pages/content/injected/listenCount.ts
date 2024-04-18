import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { MessageType } from '../../background/types';

refreshOnUpdate('pages/content/injected/toggleTheme');

// let chromeRuntimePort = chrome.runtime.connect();

// chromeRuntimePort.onDisconnect.addListener(() => {
//   chromeRuntimePort = undefined;
// });

// // when using the port, always check if valid/connected
// function postToPort(msg) {
//   if (chromeRuntimePort) {
//     chromeRuntimePort.postMessage(msg);
//   }
// }

// const listenKey = () => {
//   // when the ctrl + "<" key is pressed, we want to increment the counter
//   document.addEventListener('keydown', async e => {
//     if (e.ctrlKey && e.key === '<') {
//       console.log('increment key pressed');
//       const newMessage: MessageType = {
//         type: 'increment',
//       };

//       postToPort(newMessage);
//     } else if (e.altKey && e.key === '<') {
//       console.log('decrement key pressed');
//       const newMessage: MessageType = {
//         type: 'decrement',
//       };

//       postToPort(newMessage);
//     }
//   });
// };

// listenKey();
