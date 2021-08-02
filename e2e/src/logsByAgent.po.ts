import { browser, by, element } from 'protractor';

export class logsByAgentPage {
  navigateTo() {
    return browser.get("/agent/356b03dc-9ec5-11e7-97a6-d501104f897e") as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-logsByAgent h1')).getText() as Promise<string>;
  }
}