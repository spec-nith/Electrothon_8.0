"use client"
import React from 'react';

import Resources from './Resources.js';
import DinoScript from './DinoScript.js';
import DinoStyle from './DinoStyle.js';

import './Dino.css';

class ChromeDinoComponent extends React.Component {
  appendDinoScript() {
    let dinoScriptContainer = document.createElement("script");
    dinoScriptContainer.appendChild(document.createTextNode(DinoScript)); 
    this.startDiv.appendChild(dinoScriptContainer);
  }

  appendRunnerScript() {
    let runnerScriptContainer = document.createElement("script");
    runnerScriptContainer.appendChild(document.createTextNode(`
      if (!window.__dinoRunnerInstance && !document.querySelector('.runner-canvas')) {
        window.__dinoRunnerInstance = new Runner('.interstitial-wrapper');
      }
    `)); 

    this.endDiv.appendChild(runnerScriptContainer);
  }

  componentDidMount() {
    // Check if game canvas already exists in the DOM
    if (document.querySelector('.runner-canvas') || window.__dinoRunnerInstance) {
      return;
    }
    
    // Add a small delay to prevent race condition with React Strict Mode
    setTimeout(() => {
      // Double-check after timeout
      if (document.querySelector('.runner-canvas') || window.__dinoRunnerInstance) {
        return;
      }
      
      // Check if scripts are already appended to prevent double rendering
      if (!this.startDiv?.querySelector('script')) {
        this.appendDinoScript();
      }
      
      if (!this.endDiv?.querySelector('script')) {
        this.appendRunnerScript();
      }
    }, 0);
  }

  componentWillUnmount() {
    // Don't cleanup - let the game persist
    // This prevents the second unmount in Strict Mode from removing the game
  }

    render() {
        return (
          <div ref={el => (this.startDiv = el)}>
            <style>{DinoStyle}</style>
            <div id="main-frame-error" className="interstitial-wrapper">
              <Resources />
              <div ref={el => (this.endDiv = el)}>
              </div>
            </div>
          </div>
        );
    }
}

export default ChromeDinoComponent;
