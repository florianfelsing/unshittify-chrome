const REDIRECT_URL = "https://www.reddit.com/new";
const HOMEPAGE_RE  = /^https?:\/\/(?:www\.)?reddit\.com\/?(?:[?#].*|$)/;

// Fires when Reddit’s React front-end calls history.pushState/replaceState
chrome.webNavigation.onHistoryStateUpdated.addListener(
  ({ tabId, url }) => {
    if (HOMEPAGE_RE.test(url)) {
      // One hop; regex doesn’t match /new so no redirect loop
      chrome.tabs.update(tabId, { url: REDIRECT_URL });
    }
  },
  {
    // Keeps the service-worker asleep for every other site
    url: [{ hostSuffix: "reddit.com" }]
  }
);
