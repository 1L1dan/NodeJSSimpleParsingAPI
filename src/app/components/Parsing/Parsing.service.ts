import * as osmosis from 'osmosis'

export const getCoupons = (pageNumber: string): Promise<any> => {
  const url = "http://gazetki.by/minsk";
  let result: Array<any> = [];
  if (parseInt(pageNumber) === NaN) {
    console.log("All")
    return new Promise((resolve, reject) => {
      osmosis.get(url)
        .paginate('.promotions-section .row+.pages-with-sort .pagination .next a')
        .find('.promotions .promotion .data')
        .set(
          {
            'title': '.title a',
            'shop': '.shop a img@title',
            'terms': '.terms .text-danger',
            'price': '.prices .price strong',
          }).data(function (data) {
            result.push(data);
          })
        .error(err => reject(err))
        .done(() => resolve(result));
    });
  }
  else {
    return new Promise((resolve, reject) => {
      osmosis.get(url)
        .paginate('.promotions-section .row+.pages-with-sort .pagination .next a', parseInt(pageNumber))
        .find('.promotions .promotion .data')
        .set(
          {
            'title': '.title a',
            'shop': '.shop a img@title',
            'terms': '.terms .text-danger',
            'price': '.prices .price strong',
          }).data(function (data) {
            result.push(data);
          })
        .error(err => reject(err))
        .done(() => resolve(result));
    });
  }



}
export const getCouponsByCategory = (categoryName: string): Promise<any> => {
  let url = "http://gazetki.by/minsk";
  switch (categoryName) {
    case 'building':
      url = url + '/tovary-dlya-stroitelstva-i-remonta'
      break;
    case 'grocery':
      url = url + '/producty';
      break;
    case 'devices and home appliances':
      url = url + '/elektronika-i-bytovaya-texnika';
      break;
    case 'household':
      url = url + '/dom-i-ogorod';
      break;
    case 'beauty and health':
      url = url + '/krasota-i-zdorove';
      break;
    case 'clothes':
      url = url + '/odezhda-obuv-aksessuary';
      break;
    case 'other':
      url = url + '/inoe';
      break;
    case 'gifts':
      url = url + '/podarki';
      break;
    case 'games':
      url = url + '/igry';
      break;
    case 'pets and domestic plants':
      url = url + '/zhivotnye-i-rasteniya';
      break;
    default:
      break;
  }

  let result: Array<any> = [];
  return new Promise((resolve, reject) => {
    osmosis.get(url)
      .paginate('.promotions-section .row+.pages-with-sort .pagination .next a', 10)
      .find('.promotions .promotion .data')
      .set(
        {
          'title': '.title a',
          'shop': '.shop a img@title',
          'terms': '.terms .text-danger',
          'price': '.prices .price strong',
        }).data(function (data) {
          result.push(data);
          console.log(data);
        })
      .error(err => reject(err))
      .done(() => resolve(result));
  });

}
