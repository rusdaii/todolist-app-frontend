import { getCookie } from './cookies';

import { ACCESS_TOKEN_KEY } from './constants/storageKey';

// const generateQuery = (query: any) => {
//   const queryKeys = Object.keys(query);

//   if (queryKeys.length === 0) {
//     return '';
//   }

//   const queryValues = queryKeys.map((key) => {
//     if (!query[key]) return null;

//     if (Array.isArray(query[key])) {
//       const arrayValueQuery = query[key];
//       if (arrayValueQuery.length === 0) return null;

//       return arrayValueQuery.map((value: any) => `${key}=${value}`).join('&');
//     }

//     return `${key}=${query[key]}`;
//   });

//   const queryString = queryValues.filter((query) => query !== null).join('&');

//   return queryString;
// };

// const parseURL = (url: string, query: any) => {
//   const [urlWithoutQueries, initialQueries] = url.split('?');

//   const listOfQueries = [];

//   if (initialQueries) listOfQueries.push(initialQueries);
//   if (query) listOfQueries.push(generateQuery(query));

//   const queryString =
//     listOfQueries.length > 0 ? `?${listOfQueries.join('&')}` : '';
//   return `${urlWithoutQueries}${queryString}`;
// };

const fetcher = ({ method = 'GET', ...args }) => {
  const accessToken = getCookie(ACCESS_TOKEN_KEY);

  const callbackPromise = async (resolve: any, reject: any) => {
    const finalUrl = args?.options?.isFreshURL
      ? args.url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${args.url}`;

    const response = await fetch(finalUrl, {
      method,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.optiopns?.isFormData && {
          'Content-Type': 'application/json',
        }),
        ...args?.headers,
      },
      cache: args?.cache ?? args?.next ? undefined : 'no-store',
      ...args,
    });

    const data = await response.json();

    if (!response.ok) {
      reject(data);
    }

    resolve(data);
  };

  return new Promise(callbackPromise);
};

export default fetcher;
