import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { useEffect } from 'react';
import { useState } from 'react';

let chromeRuntimePort = chrome.runtime.connect();

chromeRuntimePort.onDisconnect.addListener(() => {
  chromeRuntimePort = undefined;
});

// when using the port, always check if valid/connected
function postToPort(msg) {
  if (chromeRuntimePort) {
    chromeRuntimePort.postMessage(msg);
  }
}

const Popup = () => {
  const onResetClick = () => {
    postToPort({ type: 'reset' });
  };

  const onDecreaseClick = () => {
    postToPort({ type: 'decrement' });
  };

  return (
    <div className="App">
      <button onClick={onResetClick}>Reset</button>
      <button onClick={onDecreaseClick}>Decrease</button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
