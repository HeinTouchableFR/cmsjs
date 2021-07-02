const fetcher = (url, init) => fetch(url, init).then((res) => res.json());

export default fetcher;
