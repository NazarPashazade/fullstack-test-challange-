const fs = require("fs");
const path = require("path");

const pathToLicenses = path.join("licenses.json");

const RESTRICTED_LICENSES = ["GNU", "GPL", "LGPL", "CDDL", "EUPL"];

fs.readFile(pathToLicenses, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    throw err;
  }
  const licenses = JSON.parse(data);
  const licenseTypes = {};

  for (const packageName in licenses) {
    const license = licenses[packageName].licenses || "Unknown";
    if (!licenseTypes[license]) {
      licenseTypes[license] = [];
    }
    licenseTypes[license].push(packageName);
  }

  const licensesList = Object.keys(licenseTypes);

  console.log(RESTRICTED_LICENSES);

  const RESTRICTED_LICENSES_SET = new Set(RESTRICTED_LICENSES.map((license) => license.toLowerCase()));
  let offendingLicense;

  if (
    licensesList.some((license) => {
      const licenseWords = license.toLowerCase().split(/[^a-zA-Z0-9]/);
      return Array.from(RESTRICTED_LICENSES_SET).some((restricted) => {
        return licenseWords.some((word) => {
          if (word === restricted.toLowerCase()) {
            offendingLicense = license;
            return true;
          }
          return false;
        });
      });
    })
  ) {
    throw new Error(
      `Restricted license found: ${offendingLicense}. ${JSON.stringify(licenseTypes[offendingLicense], null, 2)}`,
    );
  }
});
