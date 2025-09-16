import { __ } from "@wordpress/i18n";
import { Button, Card, CardBody, CardHeader } from "@wordpress/components";
import { blockDefault, users, cog } from "@wordpress/icons";

const SplashPage = () => {
  const { canManageRestrictions, userRole } = window.sociusBlockManager || {};

  const navigateToRestrictions = () => {
    window.location.href = `admin.php?page=socius-block-restrictions`;
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
            <strong>
              {__("Theme Blocks Directory:", "socius-block-manager")}
            </strong>{" "}
            /blocks/
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
