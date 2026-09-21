const { withAndroidManifest } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withAndroidNetworkSecurityConfig(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;

    // Add network security config to application
    const application = androidManifest.manifest.application[0];
    application.$['android:networkSecurityConfig'] = '@xml/network_security_config';
    application.$['android:usesCleartextTraffic'] = 'true';

    // Create network security config file
    const networkSecurityConfigPath = path.join(
      config.modRequest.platformProjectRoot,
      'app/src/main/res/xml'
    );
    
    // Ensure directory exists
    if (!fs.existsSync(networkSecurityConfigPath)) {
      fs.mkdirSync(networkSecurityConfigPath, { recursive: true });
    }

    const networkSecurityConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">13.233.104.107</domain>
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </domain-config>
</network-security-config>`;

    fs.writeFileSync(
      path.join(networkSecurityConfigPath, 'network_security_config.xml'),
      networkSecurityConfigContent
    );

    return config;
  });
};
