import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-home h1')).getText() as Promise<string>;
  }
}
