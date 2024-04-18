import { useEffect } from 'react';
import { MessageType } from '../../background/types';
import { useState } from 'react';
import browser from 'webextension-polyfill';

export default function App() {
  const sendMessageToBackgroundAsync = (message: any) => {
    const port = browser.runtime.connect();

    port.onMessage.addListener((responseMessage: any) => {});

    port.onDisconnect.addListener(() => console.log('Port disconnected'));
    try {
      port.postMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  const listenKey = () => {
    // when the ctrl + "<" key is pressed, we want to increment the counter
    document.addEventListener('keydown', async e => {
      if (e.ctrlKey && e.key === '<') {
        console.log('increment key pressed');
        const newMessage: MessageType = {
          type: 'increment',
        };

        sendMessageToBackgroundAsync(newMessage);
      } else if (e.altKey && e.key === '<') {
        console.log('decrement key pressed');
        const newMessage: MessageType = {
          type: 'decrement',
        };

        sendMessageToBackgroundAsync(newMessage);
      }
    });
  };

  useEffect(() => {
    listenKey();

    return () => {
      document.removeEventListener('keydown', listenKey);
    };
  }, []);

  return <></>;
}
