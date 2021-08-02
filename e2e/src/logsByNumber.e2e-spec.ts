import { logsByNumberPage } from './logsByNumber.po';

describe('logListHome', () => {
  let page: logsByNumberPage;

  beforeEach(() => {
    page = new logsByNumberPage();
  });

  it('should display logsByNumberPage Heading', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Call Logs of particular number');
  });

});
