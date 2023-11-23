#!/bin/bash

npm install
zimlet build
zimlet package -v 0.0.1 --zimbraXVersion ">=2.0.0" -n "zimbra-zimlet-mobileconfig-settings-menu" --desc "Adds a menu option in the Settings menu to download mobileconfig file to configure your Zimbra account on Apple devices." -l "Mobileconfig in Settings menu Zimlet"
