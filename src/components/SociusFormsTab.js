import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  TextControl,
  Notice,
} from "@wordpress/components";

const SociusFormsTab = () => {
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [notice, setNotice] = useState(null);

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_socius_form_settings");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setSiteId(result.data.site_id);
      }
    } catch (error) {
      console.error("Error loading Socius Forms settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateSiteId = async () => {
    if (
      !confirm(
        __(
          "Are you sure you want to regenerate the Site ID? This will break all existing forms until they are updated with the new ID.",
          "socius-block-manager"
        )
      )
    ) {
      return;
    }

    setRegenerating(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("action", "regenerate_site_id");
      formData.append("nonce", nonce);
      console.log("nonce", nonce);
      console.log("ajaxUrl", ajaxUrl);
      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSiteId(result.data.site_id);
        setNotice({
          type: "success",
          message: result.data.message,
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to regenerate Site ID", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error regenerating Site ID", "socius-block-manager"),
      });
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="socius-loading">
        <p>{__("Loading Socius Forms settings...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-forms-tab">
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
          <div className="socius-forms-header">
            <svg
              width="120"
              height="26"
              viewBox="0 0 120 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M43.1065 21.8937C40.8387 19.6134 39.4371 16.4706 39.4371 13.0005C39.4371 9.53043 40.8386 6.38768 43.1065 4.10742C45.3606 6.37392 46.7589 9.49255 46.7757 12.9378C46.7754 12.9587 46.7753 12.9796 46.7753 13.0006C46.7753 13.0216 46.7754 13.0425 46.7757 13.0634C46.7589 16.5086 45.3607 19.6272 43.1065 21.8937Z"
                fill="#2E2E38"
              ></path>
              <path
                d="M43.1076 21.8927C40.8234 24.1897 37.6602 25.6116 34.1649 25.6116C27.1998 25.6116 21.5535 19.9653 21.5535 13.0001C21.5535 6.03503 27.1998 0.388672 34.1649 0.388672C37.6602 0.388672 40.8234 1.81063 43.1076 4.1076C40.8401 6.38783 39.4388 9.53034 39.4388 13.0001C39.4388 16.47 40.8401 19.6125 43.1076 21.8927Z"
                fill="#28CDB6"
              ></path>
              <path
                d="M3.27769 23.3788C5.16868 24.719 7.56089 25.3891 10.4543 25.3891C12.3681 25.3891 14.0199 25.0598 15.4096 24.401C16.7994 23.7423 17.8588 22.8337 18.5879 21.6752C19.3169 20.494 19.6814 19.1651 19.6814 17.6886C19.6814 16.2803 19.3169 15.1104 18.5879 14.1791C17.8588 13.2478 16.9931 12.5209 15.9906 11.9984C15.0109 11.476 13.758 10.9365 12.0382 10.3632C10.5233 9.85824 6.30574 9.33138 7.33759 7.26768C8.09462 5.75361 10.0892 6.12115 11.465 6.80908C12.5096 7.33143 13.4221 7.91985 14.1522 8.67477C14.5376 9.0733 15.1566 9.19313 15.613 8.87835C16.5508 8.23152 18.0755 7.17959 19.022 6.52492C19.4686 6.21603 19.5895 5.6068 19.2462 5.18609C18.2476 3.96233 16.949 2.96521 15.8081 2.20462C14.4323 1.28742 12.5276 0.617994 9.5658 0.617994C3.43949 0.617993 0 3.82819 0 8.20709C0 11.5097 1.8813 13.027 3.96118 14.1109C4.98642 14.6334 6.27366 15.1672 7.8229 15.7124C8.94866 16.1062 12.9555 16.6015 12.4607 18.5034C12.2561 19.2898 11.2358 20.1085 9.63066 19.6892C8.69738 19.4454 6.87364 18.6997 5.50428 17.2755C5.12762 16.8837 4.52316 16.7667 4.07135 17.0687C3.14997 17.6846 1.64967 18.6882 0.703598 19.3248C0.247941 19.6314 0.127405 20.2467 0.470086 20.6759C1.3401 21.7655 2.42712 22.776 3.27769 23.3788Z"
                fill="#28CDB6"
              ></path>
              <path
                d="M52.0511 0.388672C48.5557 0.388672 45.3925 1.81063 43.1084 4.1076C45.3759 6.38783 46.7772 9.53034 46.7772 13.0001C46.7772 16.47 45.3759 19.6125 43.1084 21.8927C45.3925 24.1897 48.5557 25.6116 52.0511 25.6116C56.5803 25.6116 60.552 23.224 62.7759 19.6387C63.1106 19.0991 62.9247 18.4039 62.3984 18.0488L58.2589 15.2553C57.6925 14.873 56.9126 15.1591 56.5568 15.7425C55.6308 17.2606 53.9593 18.274 52.0511 18.274C49.1384 18.274 46.7772 15.9128 46.7772 13.0001C46.7772 10.0875 49.1384 7.72626 52.0511 7.72626C53.9593 7.72626 55.6308 8.73973 56.5568 10.2578C56.9126 10.8412 57.6925 11.1273 58.2589 10.745L62.3984 7.95152C62.9247 7.59635 63.1106 6.90116 62.7759 6.36161C60.552 2.77631 56.5803 0.388672 52.0511 0.388672Z"
                fill="#2E2E38"
              ></path>
              <path
                d="M110.773 25.3891C107.879 25.3891 105.487 24.719 103.596 23.3788C102.746 22.776 101.659 21.7655 100.789 20.6759C100.446 20.2467 100.567 19.6314 101.022 19.3248C101.968 18.6882 103.469 17.6846 104.39 17.0687C104.842 16.7667 105.446 16.8837 105.823 17.2755C107.192 18.6997 109.016 19.4454 109.949 19.6892C111.554 20.1085 112.575 19.2898 112.779 18.5034C113.178 16.971 110.654 16.3517 109.07 15.963C108.688 15.8693 108.36 15.7889 108.141 15.7124C106.592 15.1672 105.305 14.6334 104.28 14.1109C102.2 13.027 100.319 11.5097 100.319 8.20709C100.319 3.82819 103.758 0.617993 109.884 0.617994C112.846 0.617994 114.751 1.28742 116.127 2.20462C117.268 2.96521 118.566 3.96233 119.565 5.18609C119.908 5.6068 119.787 6.21603 119.341 6.52492C118.394 7.17959 116.869 8.23152 115.932 8.87835C115.475 9.19312 114.856 9.0733 114.471 8.67477C113.741 7.91985 112.828 7.33143 111.784 6.80908C110.408 6.12115 108.413 5.75361 107.656 7.26768C106.818 8.94488 109.446 9.60699 111.273 10.0672C111.695 10.1733 112.073 10.2686 112.357 10.3632C114.077 10.9365 115.329 11.476 116.309 11.9984C117.312 12.5209 118.177 13.2478 118.906 14.1791C119.635 15.1104 120 16.2803 120 17.6886C120 19.1651 119.635 20.494 118.906 21.6752C118.177 22.8336 117.118 23.7423 115.728 24.401C114.338 25.0598 112.687 25.3891 110.773 25.3891Z"
                fill="#2E2E38"
              ></path>
              <path
                d="M84.3125 2.08543V14.6717C84.3125 15.7847 84.5518 16.6706 85.0302 17.3294C85.5314 17.9654 86.3288 18.2834 87.4224 18.2834C88.516 18.2834 89.3248 17.9654 89.8488 17.3294C90.3728 16.6706 90.6348 15.7847 90.6348 14.6717V2.08543C90.6348 1.52822 91.0865 1.07651 91.6437 1.07651H97.1785C97.7357 1.07651 98.1874 1.52822 98.1874 2.08543V14.6717C98.1874 16.9659 97.7089 18.9308 96.7521 20.5663C95.7952 22.1791 94.4852 23.3944 92.822 24.2122C91.1588 25.0299 89.302 25.4388 87.2515 25.4388C85.2011 25.4388 83.3784 25.0299 81.7836 24.2122C80.2116 23.3944 78.9813 22.1791 78.0928 20.5663C77.2042 18.9535 76.76 16.9886 76.76 14.6717V2.08543C76.76 1.52822 77.2117 1.07651 77.7689 1.07651H83.3036C83.8608 1.07651 84.3125 1.52822 84.3125 2.08543Z"
                fill="#2E2E38"
              ></path>
              <path
                d="M72.4612 25.2003C73.0184 25.2003 73.4701 24.7486 73.4701 24.1914V2.08543C73.4701 1.52822 73.0184 1.07651 72.4612 1.07651H66.8923C66.3351 1.07651 65.8834 1.52822 65.8834 2.08543V24.1914C65.8834 24.7486 66.3351 25.2003 66.8923 25.2003H72.4612Z"
                fill="#2E2E38"
              ></path>
            </svg>
            <h2 style={{ marginLeft: "1rem" }}>
              {__("Socius Form", "socius-block-manager")}
            </h2>
          </div>

          <div className="site-id-section">
            <TextControl
              label={__("Site ID", "socius-block-manager")}
              value={siteId}
              disabled
              className="site-id-input"
              help={__(
                "This unique ID is used by all Socius Forms on your site.",
                "socius-block-manager"
              )}
            />
            <Button
              isDestructive
              onClick={regenerateSiteId}
              isBusy={regenerating}
              disabled={regenerating}
            >
              {regenerating
                ? __("Regenerating...", "socius-block-manager")
                : __("Regenerate Site ID", "socius-block-manager")}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="shortcode-documentation">
        <CardBody>
          <h2>{__("Form Shortcode", "socius-block-manager")}</h2>
          <div className="shortcode-example">
            <code>[sociusform</code>
            <code className="param">product=""</code>
            <code className="param">formid=""</code>
            <code className="param">formname=""</code>
            <code className="param">formlocation=""</code>
            <code className="param">enableproductselector=""</code>
            <code className="param">submitbuttontext=""</code>
            <code className="param">issticky=""</code>
            <code className="param">optin=""</code>
            <code className="param">disclaimer=""</code>
            <code className="param">spamtype=""</code>
            <code className="param">hidelabels=""</code>
            <code className="param">buttonclasses=""</code>
            <code className="param">inputclasses=""</code>
            <code className="param">inputgroupclasses=""</code>
            <code className="param">stickyfirstlastname=""</code>
            <code className="param">enablecomments=""</code>
            <code className="param">enableaddress=""</code>
            <code className="param">formheading=""</code>
            <code className="param">aftersubmit=""</code>
            <code className="param">thankyouurl=""</code>
            <code>]</code>
          </div>

          <hr style={{ margin: "2rem 0" }} />

          <h3>{__("Shortcode Attributes", "socius-block-manager")}</h3>

          <div className="attributes-table">
            <div className="attr-row header">
              <div className="attr-name">
                {__("Attribute", "socius-block-manager")}
              </div>
              <div className="attr-required">
                {__("Required?", "socius-block-manager")}
              </div>
              <div className="attr-description">
                {__("Description", "socius-block-manager")}
              </div>
            </div>

            {shortcodeAttributes.map((attr, index) => (
              <div key={index} className="attr-row">
                <div className="attr-name">
                  <code>{attr.name}</code>
                </div>
                <div className="attr-required">{attr.required}</div>
                <div className="attr-description">{attr.description}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const shortcodeAttributes = [
  {
    name: "product",
    required: "Yes",
    description:
      'The form product is used to populate the data required for the site. If the site is a custom build, it can be named "Custom - Main Site" for example.',
  },
  {
    name: "formid",
    required: "Yes",
    description:
      "This value will be applied to the form's id attribute and must be unique to the form. It is required for analytics tracking and assists in identifying specific forms.",
  },
  {
    name: "formname",
    required: "Yes",
    description:
      "This value will be applied to the form's name attribute and must be unique to the form.",
  },
  {
    name: "formlocation",
    required: "Yes",
    description:
      'The form location is used to identify where the form is on the site. If the form is the Lightbox form on the main site, an example value would be "Lightbox", "main-lightbox", or "Main Site Lightbox".',
  },
  {
    name: "enableproductselector",
    required: 'No. Defaults to "false"',
    description:
      "This will allow a product selector to display in the form (use \"true\" or \"false\" for the values). At a minimum, an array of products MUST be added to the window object of every page with forms containing a product selector to populate the dropdown. Example: window.productOfInterest = ['doors', 'windows', 'gutters']; NOTE: Products will be capitalized in the dropdown",
  },
  {
    name: "submitbuttontext",
    required: 'No, Defaults to "Submit"',
    description: "Controls the text displayed on the form's submit button.",
  },
  {
    name: "issticky",
    required: 'No. Defaults to "false"',
    description:
      'Displays the form with sticky form styles and fields. (use "true" or "false" for the values, defaults to "false"). The Socius Form was intentionally created with very minimal CSS. It is recommended you ALWAYS visually inspect every form when making changes, specifically the sticky form when form shortcode settings are changed.',
  },
  {
    name: "optin",
    required: 'No. Defaults to "false"',
    description:
      'Display the form with an opt in checkbox. Use "true" or "false" for the values. The opt in message MUST be added to the window object, otherwise the checkbox will have no label. Example: window.formOptInMessage = "I accept terms & conditions.";',
  },
  {
    name: "disclaimer",
    required: 'No. Defaults to "false"',
    description:
      'Display the form with a disclaimer message. Use "true" or "false" for the values. The desired disclaimer message MUST be added to the window object for every page containing a form with disclaimer. Example: window.formDisclaimer = "By Submitting this form ....";',
  },
  {
    name: "spamtype",
    required:
      "No. If not supplied no spam prevention is used beyond form validation.",
    description:
      'Options: recaptchaV2, recaptchaV3. Example: window.recaptchaSiteKey = "XXXXXXXXXXXX"; NOTE: Do not create a custom site key. It will not work. Site keys are controlled by Socius.',
  },
  {
    name: "hidelabels",
    required: 'No. Defaults to "false"',
    description:
      'Hides the labels for input fields. NOTE: This option does nothing when issticky is set to "true". The sticky form will never have labels.',
  },
  {
    name: "buttonclasses",
    required: "No. If not used, no classes will be added.",
    description:
      'The string of classes to be added to the form\'s submit button. Example: "btn btn-inverted".',
  },
  {
    name: "inputclasses",
    required: "No. If not used, no classes will be added.",
    description:
      'The string of classes to be added to the form\'s inputs. Example: "input input-focus".',
  },
  {
    name: "inputgroupclasses",
    required: "No. If not used, no classes will be added.",
    description:
      'The string of classes to be added to the form\'s input groups. Example: "input-group inline-group".',
  },
  {
    name: "stickyfirstlastname",
    required: 'No. Defaults to "false".',
    description:
      'If issticky is set to "true" and this attribute is enabled, the sticky form will use first and last name fields instead of fullname. Use "true" or "false" for the values.',
  },
  {
    name: "enablecomments",
    required: 'No. Defaults to "false".',
    description:
      'If enabled, the form will display a message / comments field. Use "true" or "false" for the values.',
  },
  {
    name: "enableaddress",
    required: 'No. Defaults to "false".',
    description:
      'If enabled, the form will display a state, city, and street field. Use "true" or "false" for the values.',
  },
  {
    name: "formheading",
    required: "No. By default no content is displayed.",
    description:
      'Applies the attribute value as the header of the form. Example: formheading="Contact us today for your free quote!" NOTE: Valid HTML can be passed as content',
  },
  {
    name: "aftersubmit",
    required: "No. By default no content is displayed.",
    description:
      "Applies the attribute value as content after the form's submit button. Example: aftersubmit=\"Don't Miss Out!\" NOTE: Valid HTML can be passed as content",
  },
  {
    name: "thankyouurl",
    required: "No. Defaults to displaying a success message if not enabled.",
    description:
      'If a custom thank you URL is required for the form, it can be added here. Otherwise the thank you url needs to be added to the window object. window Example: window.thankYouUrl="https://www.example.com/thank-you"; Shortcode Example: thankyouurl="https://www.example.com/thank-you"',
  },
];

export default SociusFormsTab;
