# YouTube Video Speed Enhancer

This script allows you to easily adjust the playback speed of YouTube videos using keyboard shortcuts.

## Features

- Increase video speed with the `+` key.
- Decrease video speed with the `-` key.
- Speed range: 0.0x to 10.0x.

## Installation Guide

Follow these steps to install the YouTube Video Speed Enhancer script in Chrome:

### Step 1: Install a User Script Manager
To use this script, you need to install a user script manager extension for Chrome. We recommend using [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).

1. Go to the Chrome Web Store.
2. Search for "Tampermonkey" or "Violentmonkey".
3. Click "Add to Chrome" and follow the installation instructions.

### Step 2: Add the Script
1. Open the user script manager extension (Tampermonkey or Violentmonkey).
2. Click on "Create a new script" or "Add a new script".
3. Copy the contents of the `youtube_speed_change.js` file into the editor.
4. Save the script.

### Step 3: Enable the Script
1. Ensure the script is enabled in the user script manager.
2. Open YouTube in Chrome.
3. The script will automatically run on YouTube pages.

## Usage

- Press the `+` key to increase the video speed by 0.25x (default).
- Press the `-` key to decrease the video speed by 0.25x (default).
- The speed is capped between 0.0x and 10.0x.

## Customization

You can customize the default speed and speed increment by modifying the following variables in the script:

```javascript
var videoSpeed = 1.0; // Default playback speed
var speedJump = 0.25; // Speed increment/decrement