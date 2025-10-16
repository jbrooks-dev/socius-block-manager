import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  ToggleControl,
  Notice,
} from "@wordpress/components";

const PPCTab = () => {
  const [settings, setSettings] = useState({
    enabled: false,
    geolocation_enabled: false,
    phone_swapping_enabled: false,
    geo_phone_swapping: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_ppc_settings");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error("Error loading PPC settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("action", "save_ppc_settings");
      formData.append("nonce", nonce);
      formData.append("settings", JSON.stringify(settings));

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setNotice({
          type: "success",
          message: __(
            "PPC settings saved successfully!",
            "socius-block-manager"
          ),
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to save PPC settings", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error saving PPC settings", "socius-block-manager"),
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="socius-loading">
        <p>{__("Loading PPC settings...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-ppc-tab">
      {notice && (
        <Notice
          status={notice.type}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      )}

      <Card>
        <CardBody>
          <h2>{__("PPC Tracking & Phone Swapping", "socius-block-manager")}</h2>
          <p>
            {__(
              "Configure PPC tracking scripts and dynamic phone swapping functionality for your site.",
              "socius-block-manager"
            )}
          </p>

          <div className="ppc-settings-section">
            <ToggleControl
              label={__("Enable PPC Tracking", "socius-block-manager")}
              checked={settings.enabled}
              onChange={(value) => updateSetting("enabled", value)}
              help={
                settings.enabled
                  ? __(
                      "PPC tracking script will be injected into the footer of all pages.",
                      "socius-block-manager"
                    )
                  : __(
                      "Enable to activate PPC tracking and phone swapping functionality.",
                      "socius-block-manager"
                    )
              }
            />

            {settings.enabled && (
              <>
                <div className="setting-divider"></div>

                <ToggleControl
                  label={__("Enable Geolocation", "socius-block-manager")}
                  checked={settings.geolocation_enabled}
                  onChange={(value) =>
                    updateSetting("geolocation_enabled", value)
                  }
                  help={__(
                    "Enable if you are using a geolocation plugin to determine traffic type.",
                    "socius-block-manager"
                  )}
                />

                <ToggleControl
                  label={__("Enable Phone Swapping", "socius-block-manager")}
                  checked={settings.phone_swapping_enabled}
                  onChange={(value) =>
                    updateSetting("phone_swapping_enabled", value)
                  }
                  help={__(
                    "Enable dynamic phone number swapping based on traffic conditions.",
                    "socius-block-manager"
                  )}
                />

                {settings.phone_swapping_enabled &&
                  settings.geolocation_enabled && (
                    <ToggleControl
                      label={__(
                        "Enable Geo Phone Swapping",
                        "socius-block-manager"
                      )}
                      checked={settings.geo_phone_swapping}
                      onChange={(value) =>
                        updateSetting("geo_phone_swapping", value)
                      }
                      help={__(
                        "Use geolocation data to automatically swap phone numbers based on visitor location.",
                        "socius-block-manager"
                      )}
                      className="nested-setting"
                    />
                  )}
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {settings.enabled && (
        <>
          <Card>
            <CardBody>
              <h3>{__("How It Works", "socius-block-manager")}</h3>
              <div className="ppc-info-section">
                <h4>{__("Tracking Features:", "socius-block-manager")}</h4>
                <ul>
                  <li>
                    <strong>
                      {__("Source Tracking:", "socius-block-manager")}
                    </strong>{" "}
                    {__(
                      "Captures and stores the ?source= URL parameter in a cookie for 30 days.",
                      "socius-block-manager"
                    )}
                  </li>
                  <li>
                    <strong>
                      {__("Referrer Tracking:", "socius-block-manager")}
                    </strong>{" "}
                    {__(
                      "Automatically captures and stores the referring URL in a cookie.",
                      "socius-block-manager"
                    )}
                  </li>
                  <li>
                    <strong>
                      {__("Traffic Type Detection:", "socius-block-manager")}
                    </strong>{" "}
                    {__(
                      "Automatically determines if traffic is direct, organic, or paid.",
                      "socius-block-manager"
                    )}
                  </li>
                  <li>
                    <strong>
                      {__("Form Auto-Fill:", "socius-block-manager")}
                    </strong>{" "}
                    {__(
                      "Automatically fills form fields with class .ppc-source and .referrer with tracked data.",
                      "socius-block-manager"
                    )}
                  </li>
                </ul>

                {settings.phone_swapping_enabled && (
                  <>
                    <h4>
                      {__("Phone Swapping Features:", "socius-block-manager")}
                    </h4>
                    <ul>
                      <li>
                        <strong>
                          {__("Dynamic Phone Numbers:", "socius-block-manager")}
                        </strong>{" "}
                        {__(
                          "Swaps phone numbers in elements with class .phone-number",
                          "socius-block-manager"
                        )}
                      </li>
                      <li>
                        <strong>
                          {__("Tel Links:", "socius-block-manager")}
                        </strong>{" "}
                        {__(
                          "Updates all tel: links automatically (except those with .nochange class)",
                          "socius-block-manager"
                        )}
                      </li>
                      <li>
                        <strong>
                          {__("Phone Groups:", "socius-block-manager")}
                        </strong>{" "}
                        {__(
                          "Manages visibility of phone groups and labels",
                          "socius-block-manager"
                        )}
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3>{__("Implementation Guide", "socius-block-manager")}</h3>
              <div className="ppc-implementation">
                <h4>{__("Form Fields:", "socius-block-manager")}</h4>
                <p>
                  {__(
                    "Add these classes to your form fields to auto-populate with tracking data:",
                    "socius-block-manager"
                  )}
                </p>
                <div className="code-example">
                  <code>{`<input type="hidden" class="ppc-source" name="source" />`}</code>
                  <code>{`<input type="hidden" class="referrer" name="referrer" />`}</code>
                </div>

                {settings.phone_swapping_enabled && (
                  <>
                    <h4>
                      {__("Phone Number Elements:", "socius-block-manager")}
                    </h4>
                    <p>
                      {__(
                        "Use these classes for dynamic phone swapping:",
                        "socius-block-manager"
                      )}
                    </p>
                    <div className="code-example">
                      <code>{`<span class="phone-number">555-123-4567</span>`}</code>
                      <code>{`<a href="tel:5551234567">Call Us</a>`}</code>
                      <code>{`<a href="tel:5551234567" class="nochange">Static Number</a>`}</code>
                    </div>
                  </>
                )}

                <h4>{__("URL Parameters:", "socius-block-manager")}</h4>
                <p>{__("Supported URL parameters:", "socius-block-manager")}</p>
                <div className="code-example">
                  <code>{`?source=google-ads`}</code>
                  <code>{`?referrer=custom-referrer`}</code>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="ppc-warning-card">
            <CardBody>
              <h3>⚠️ {__("Important Notes", "socius-block-manager")}</h3>
              <ul>
                <li>
                  {__(
                    "The script will be injected before the closing </body> tag on all frontend pages.",
                    "socius-block-manager"
                  )}
                </li>
                <li>
                  {__(
                    "Cookies are set with a 30-day expiration and site-wide path.",
                    "socius-block-manager"
                  )}
                </li>
                <li>
                  {__(
                    "Make sure your forms have the appropriate classes for auto-population to work.",
                    "socius-block-manager"
                  )}
                </li>
                {settings.geolocation_enabled && (
                  <li>
                    {__(
                      "Geolocation features require a compatible geolocation plugin that sets the 'geo' JavaScript object.",
                      "socius-block-manager"
                    )}
                  </li>
                )}
              </ul>
            </CardBody>
          </Card>
        </>
      )}

      <Card className="socius-ppc-actions">
        <CardBody>
          <div className="action-buttons">
            <Button
              isPrimary
              onClick={saveSettings}
              isBusy={saving}
              disabled={saving}
            >
              {saving
                ? __("Saving...", "socius-block-manager")
                : __("Save PPC Settings", "socius-block-manager")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PPCTab;
