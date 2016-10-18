import { MealPriceHelperPage } from './app.po';

describe('meal-price-helper App', function() {
  let page: MealPriceHelperPage;

  beforeEach(() => {
    page = new MealPriceHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
