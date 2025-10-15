import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  TextareaControl,
  Notice,
  TabPanel,
} from "@wordpress/components";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    head_js: "",
    body_top_js: "",
    body_bottom_js: "",
    additional_css: "",
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
      formData.append("action", "get_settings");
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
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("action", "save_settings");
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
          message: __("Settings saved successfully!", "socius-block-manager"),
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to save settings", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error saving settings", "socius-block-manager"),
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
        <p>{__("Loading settings...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-settings-container">
      <div className="socius-settings-header">
        <h1>{__("Settings", "socius-block-manager")}</h1>
        <p>
          {__(
            "Manage global settings for Socius Block Manager.",
            "socius-block-manager"
          )}
        </p>
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

      <TabPanel
        className="socius-settings-tabs"
        activeClass="is-active"
        tabs={[
          {
            name: "general",
            title: __("General", "socius-block-manager"),
            className: "tab-general",
          },
          {
            name: "forms",
            title: __("Socius Forms", "socius-block-manager"),
            className: "tab-forms",
          },
          {
            name: "scripts",
            title: __("Scripts", "socius-block-manager"),
            className: "tab-scripts",
          },
        ]}
      >
        {(tab) => (
          <>
            {tab.name === "general" && (
              <Card>
                <CardBody>
                  <h2>{__("General Settings", "socius-block-manager")}</h2>
                  <p>
                    {__(
                      "General settings will be available here.",
                      "socius-block-manager"
                    )}
                  </p>
                </CardBody>
              </Card>
            )}

            {tab.name === "forms" && (
              <Card>
                <CardBody>
                  <h2>{__("Socius Forms Settings", "socius-block-manager")}</h2>
                  <p>
                    {__(
                      "Form settings will be available here.",
                      "socius-block-manager"
                    )}
                  </p>
                </CardBody>
              </Card>
            )}

            {tab.name === "scripts" && (
              <Card>
                <CardBody>
                  <h2>{__("Custom Scripts & CSS", "socius-block-manager")}</h2>
                  <p>
                    {__(
                      "Add custom JavaScript and CSS to your site. These will be output in the appropriate locations on all frontend pages.",
                      "socius-block-manager"
                    )}
                  </p>

                  <div className="scripts-section">
                    <TextareaControl
                      label={__("Head JS", "socius-block-manager")}
                      help={__(
                        "JavaScript to be added between the <head> tags. Do not include <script> tags.",
                        "socius-block-manager"
                      )}
                      value={settings.head_js}
                      onChange={(value) => updateSetting("head_js", value)}
                      rows={8}
                      className="code-textarea"
                    />

                    <TextareaControl
                      label={__("Body - Top JS", "socius-block-manager")}
                      help={__(
                        "JavaScript to be added just after the opening <body> tag. Do not include <script> tags.",
                        "socius-block-manager"
                      )}
                      value={settings.body_top_js}
                      onChange={(value) => updateSetting("body_top_js", value)}
                      rows={8}
                      className="code-textarea"
                    />

                    <TextareaControl
                      label={__("Body - Bottom JS", "socius-block-manager")}
                      help={__(
                        "JavaScript to be added just before the closing </body> tag. Do not include <script> tags.",
                        "socius-block-manager"
                      )}
                      value={settings.body_bottom_js}
                      onChange={(value) =>
                        updateSetting("body_bottom_js", value)
                      }
                      rows={8}
                      className="code-textarea"
                    />

                    <TextareaControl
                      label={__("Additional CSS", "socius-block-manager")}
                      help={__(
                        "CSS to be added in the footer, before Body - Bottom JS. Do not include <style> tags.",
                        "socius-block-manager"
                      )}
                      value={settings.additional_css}
                      onChange={(value) =>
                        updateSetting("additional_css", value)
                      }
                      rows={8}
                      className="code-textarea"
                    />
                  </div>

                  <div className="scripts-info">
                    <Card>
                      <CardBody>
                        <h3>{__("Output Order", "socius-block-manager")}</h3>
                        <ol>
                          <li>
                            <strong>
                              {__("Head JS", "socius-block-manager")}
                            </strong>
                            {" - "}
                            {__("Inside <head> tags", "socius-block-manager")}
                          </li>
                          <li>
                            <strong>
                              {__("Body - Top JS", "socius-block-manager")}
                            </strong>
                            {" - "}
                            {__(
                              "After opening <body> tag",
                              "socius-block-manager"
                            )}
                          </li>
                          <li>
                            <strong>
                              {__("Additional CSS", "socius-block-manager")}
                            </strong>
                            {" - "}
                            {__(
                              "Before closing </body> tag",
                              "socius-block-manager"
                            )}
                          </li>
                          <li>
                            <strong>
                              {__("Body - Bottom JS", "socius-block-manager")}
                            </strong>
                            {" - "}
                            {__(
                              "Before closing </body> tag (after CSS)",
                              "socius-block-manager"
                            )}
                          </li>
                        </ol>
                        <p className="warning-text">
                          <strong>
                            {__("Warning:", "socius-block-manager")}
                          </strong>{" "}
                          {__(
                            "Be careful when adding custom scripts. Invalid code can break your site.",
                            "socius-block-manager"
                          )}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </TabPanel>

      <Card className="socius-settings-actions">
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
                : __("Save Settings", "socius-block-manager")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SettingsPage;
