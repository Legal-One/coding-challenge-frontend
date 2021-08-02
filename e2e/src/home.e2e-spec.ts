import { HomePage } from './home.po';

describe('logListHome', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should display home Page heading', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('List Of Call Logs');
  });

});
