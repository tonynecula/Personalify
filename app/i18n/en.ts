const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "Get ready to discover the intricacies of your personality! . Remember, there are no 'good' or 'bad' types - every personality is unique and valuable. Let's start this fascinating journey of self-discovery!",
    readyForLaunch: "Welcome to Personalify!",
    exciting: "(Let's uncover the layers of your personality)",
    start: "Let's start ",
  },
  errorScreen: {
    title: "Oops! Something went wrong!",
    friendlySubtitle:
      "We apologize for any inconvenience. Please try to refresh or restart the app. If the problem persists, contact our support team.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Looks empty here...",
      content: "No data found yet. Hit the refresh button or restart the app to see if that helps.",
      button: "Refresh",
    },
  },
}

export default en
export type Translations = typeof en
