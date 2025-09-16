import { render } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import SplashPage from "./components/SplashPage";
import BlockRestrictionsPage from "./components/BlockRestrictionsPage";
import "./style.css";

const App = () => {
  const { currentPage, canManageRestrictions } =
    window.sociusBlockManager || {};

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
const restrictionsElement = document.getElementById(
  "socius-block-manager-restrictions"
);
if (restrictionsElement) {
  render(<App />, restrictionsElement);
}
