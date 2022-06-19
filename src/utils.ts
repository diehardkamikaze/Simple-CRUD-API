import { parse } from 'url';

type TQueryParams = {
  [k: string] : string
}

export const UrlDivider = (url: string | undefined): [path: string, q: TQueryParams] => {
  let queryParams: TQueryParams = {};
  let parsedUrl;
  if (url)
    parsedUrl = parse(url);
  else
    return ['/', {}]
  let path: string = parsedUrl.path || '/';
  let queryString = parsedUrl.query;
  if (queryString)
    queryString.split('&').forEach((elem) => {
      let divided = elem.split('=');
      if (divided.length != 2)
        throw new Error('Query params parse error!');
      queryParams[divided[0]] = divided[1];
    });
  return [ path, queryParams];
} 