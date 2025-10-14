import { render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import SplashPage from "./components/SplashPage";
import BlockRestrictionsPage from "./components/BlockRestrictionsPage";
import BlockListPage from "./components/BlockListPage";
import ThemeSettingsPage from "./components/ThemeSettingsPage";
import AvailableBlocksPage from "./components/AvailableBlocksPage";
import "./style.css";

const App = () => {
  const { currentPage, canManageRestrictions } =
    window.sociusBlockManager || {};
  console.log("currentPage", currentPage);

  // Render appropriate component based on current page
  switch (currentPage) {
    case "socius-block-restrictions":
      if (!canManageRestrictions) {
        return (
          <div className="socius-error">
            <h2>{__("Access Denied", "socius-block-manager")}</h2>
            <p>
              {__(
                "You do not have permission to manage block restrictions. Only Super Admin users can access this feature.",
                "socius-block-manager"
              )}
            </p>
          </div>
        );
      }
      return <BlockRestrictionsPage />;

    case "socius-block-list":
      return <BlockListPage />;

    // case "socius-available-blocks":
    //   return <AvailableBlocksPage />;

    case "socius-block-theme-settings":
      return <ThemeSettingsPage />;

    case "socius-block-manager":
    default:
      return <SplashPage />;
  }
};

// Render splash page
const splashElement = document.getElementById("socius-block-manager-splash");
if (splashElement) {
  render(<App />, splashElement);
}

// Render restrictions page
const restrictionsElement = document.getElementById("socius-block-manager-restrictions");
if (restrictionsElement) {
  render(<App />, restrictionsElement);
}

//Test Render restrictions page
const listElement = document.getElementById("socius-block-manager-list");
console.log('1');
if (listElement) {
  render(<App />, listElement);
}

console.log('2');
const settingsElement = document.getElementById("socius-block-manager-theme-settings");
if (settingsElement) {
  render(<App />, settingsElement);
}



// Render available blocks page
// const availableElement = document.getElementById(
//   "socius-block-manager-available"
// );
// console.log("attemping render available", availableElement);
// if (availableElement) {
//   render(<App />, availableElement);
// }
