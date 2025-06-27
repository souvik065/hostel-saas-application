import fetch_retry from 'fetch-retry';

export const fetchRetry = fetch_retry(fetch, {
  retries: 2,
  retryDelay: 1000,
  retryOn: [500],
});
