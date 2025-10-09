import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ToggleControl,
  Notice,
} from "@wordpress/components";
import { blockDefault, users, cog, shield } from "@wordpress/icons";

const SplashPage = () => {
  const { canManageRestrictions, userRole, ajaxUrl, nonce } =
    window.sociusBlockManager || {};
  const [superAdminSettings, setSuperAdminSettings] = useState(null);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = userRole === "super_admin";

  useEffect(() => {
    if (isSuperAdmin) {
      loadSuperAdminSettings();
    }
  }, [isSuperAdmin]);

  const loadSuperAdminSettings = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_super_admin_settings");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuperAdminSettings(result.data);
      }
    } catch (error) {
      console.error("Error loading Super Admin settings:", error);
    }
  };

  const toggleSuperAdminCreation = async (allowCreation) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("action", "toggle_super_admin_creation");
      formData.append("nonce", nonce);
      formData.append("allow_creation", allowCreation ? "true" : "false");

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuperAdminSettings((prev) => ({
          ...prev,
          creation_allowed: allowCreation,
        }));
        setNotice({ type: "success", message: result.data });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to update settings", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error updating settings", "socius-block-manager"),
      });
    } finally {
      setLoading(false);
    }
  };

  const navigateToRestrictions = () => {
    window.location.href = `admin.php?page=socius-block-restrictions`;
  };

  const navigateToAvailableBlocks = () => {
    window.location.href = `admin.php?page=socius-available-blocks`;
  };

  const features = [
    {
      icon: blockDefault,
      title: __("Block Management", "socius-block-manager"),
      description: __(
        "Control which Gutenberg blocks are available to different user roles.",
        "socius-block-manager"
      ),
    },
    {
      icon: users,
      title: __("User Role Control", "socius-block-manager"),
      description: __(
        "Restrict blocks based on user roles: Subscriber, Contributor, Author, Editor, and Administrator.",
        "socius-block-manager"
      ),
    },
    {
      icon: cog,
      title: __("Variation Management", "socius-block-manager"),
      description: __(
        "Fine-tune access by controlling individual block variations.",
        "socius-block-manager"
      ),
    },
    ...(isSuperAdmin
      ? [
          {
            icon: shield,
            title: __("Super Admin Controls", "socius-block-manager"),
            description: __(
              "Manage Super Admin role creation and permissions.",
              "socius-block-manager"
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="socius-splash-container">
      <div className="socius-splash-header">
        <h1>{__("Socius Block Manager", "socius-block-manager")}</h1>
        <p className="socius-splash-tagline">
          {__(
            "Manage Gutenberg block access with precision and control",
            "socius-block-manager"
          )}
        </p>
        <div className="socius-user-info">
          <span className={`user-role-badge role-${userRole}`}>
            {__("Current Role:", "socius-block-manager")}{" "}
            <strong>{userRole?.replace("_", " ").toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {notice && (
        <Notice
          status={notice.type}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      )}

      <div className="socius-features-grid">
        {features.map((feature, index) => (
          <Card key={index} className="socius-feature-card">
            <CardHeader>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
            </CardHeader>
            <CardBody>
              <p>{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="socius-actions">
        <Card className="socius-main-action-card">
          <CardBody>
            <h2>{__("Block Restrictions", "socius-block-manager")}</h2>
            <p>
              {canManageRestrictions
                ? __(
                    "Manage which blocks and variations are available to different user roles.",
                    "socius-block-manager"
                  )
                : __(
                    "Only Super Admin users can manage block restrictions.",
                    "socius-block-manager"
                  )}
            </p>

            {canManageRestrictions ? (
              <Button
                isPrimary
                onClick={navigateToRestrictions}
                className="socius-primary-button"
              >
                {__("Manage Block Restrictions", "socius-block-manager")}
              </Button>
            ) : (
              <div className="socius-access-denied">
                <p className="access-message">
                  {__(
                    "Contact your Super Admin to manage block restrictions.",
                    "socius-block-manager"
                  )}
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="socius-main-action-card">
          <CardBody>
            <h2>{__("Available Blocks", "socius-block-manager")}</h2>
            <p>
              {__(
                "View all Socius Pro Blocks included with this plugin.",
                "socius-block-manager"
              )}
            </p>

            <Button
              isPrimary
              onClick={navigateToAvailableBlocks}
              className="socius-primary-button"
            >
              {__("View Available Blocks", "socius-block-manager")}
            </Button>
          </CardBody>
        </Card>
      </div>

      {isSuperAdmin && superAdminSettings && (
        <div className="socius-super-admin-section">
          <Card className="socius-super-admin-card">
            <CardBody>
              <h2>{__("Super Admin Management", "socius-block-manager")}</h2>

              <div className="super-admin-stats">
                <div className="stat-grid">
                  <div className="stat-item">
                    <strong>{superAdminSettings.super_admin_count}</strong>
                    <span>
                      {__("Super Admin Users", "socius-block-manager")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <strong>{superAdminSettings.max_super_admins}</strong>
                    <span>{__("Maximum Allowed", "socius-block-manager")}</span>
                  </div>
                </div>
              </div>

              <div className="super-admin-controls">
                <ToggleControl
                  label={__(
                    "Allow Administrators to Create Super Admins",
                    "socius-block-manager"
                  )}
                  checked={superAdminSettings.creation_allowed}
                  onChange={toggleSuperAdminCreation}
                  disabled={loading}
                  help={
                    superAdminSettings.creation_allowed
                      ? __(
                          "Administrators can currently create new Super Admin users",
                          "socius-block-manager"
                        )
                      : __(
                          "Only existing Super Admins can create new Super Admin users",
                          "socius-block-manager"
                        )
                  }
                />
              </div>

              {superAdminSettings.super_admin_users &&
                superAdminSettings.super_admin_users.length > 0 && (
                  <div className="super-admin-list">
                    <h3>
                      {__("Current Super Admin Users", "socius-block-manager")}
                    </h3>
                    <div className="user-list">
                      {superAdminSettings.super_admin_users.map((user) => (
                        <div key={user.ID} className="user-item">
                          <div className="user-info">
                            <strong>{user.display_name}</strong>
                            <span className="user-details">
                              {user.user_login} • {user.user_email}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="super-admin-notice">
                <p>
                  <strong>
                    {__("Security Note:", "socius-block-manager")}
                  </strong>{" "}
                  {__(
                    "Super Admin users have full access to block restrictions and can override all limitations. Only trusted users should be assigned this role.",
                    "socius-block-manager"
                  )}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <div className="socius-footer">
        <div className="socius-stats">
          <div className="stat-item">
            <strong>{__("Plugin Version:", "socius-block-manager")}</strong>{" "}
            1.0.0
          </div>
          <div className="stat-item">
            <strong>{__("Blocks Directory:", "socius-block-manager")}</strong>{" "}
            /plugin/blocks/
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
