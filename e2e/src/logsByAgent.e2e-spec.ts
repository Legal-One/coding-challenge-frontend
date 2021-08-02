import { logsByAgentPage } from './logsByAgent.po';

describe('logListHome', () => {
  let page: logsByAgentPage;

  beforeEach(() => {
    page = new logsByAgentPage();
  });

  it('should display logsByAgentPage Heading', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Detailed Log of a Agent');
  });

});
