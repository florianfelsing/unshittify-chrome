// Redirect Reddit SPA root views (front page or any /r/<sub>) to /new
const PATTERN = /^https?:\/\/(?:www\.)?reddit\.com(?:\/r\/[^\/]+)?\/?(?:[?#]|$)/;

chrome.webNavigation.onHistoryStateUpdated.addListener(
  ({ tabId, url }) => {
    if (PATTERN.test(url)) {
      const target = url.replace(
        /^https?:\/\/(?:www\.)?reddit\.com((?:\/r\/[^\/]+)?)\/?(?:[?#].*|$)/,
        'https://www.reddit.com$1/new'
      );
      chrome.tabs.update(tabId, { url: target });
    }
  },
  { url: [{ hostSuffix: "reddit.com" }] }
);
