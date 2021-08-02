import { browser, by, element } from 'protractor';

export class logsByNumberPage {
  navigateTo() {
    return browser.get("/call/+49151484522") as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-logsByNumber h1')).getText() as Promise<string>;
  }
}