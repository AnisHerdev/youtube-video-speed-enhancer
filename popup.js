document.getElementById('applyBtn').addEventListener('click', async () => {
    const baseSpeed = parseFloat(document.getElementById('speedInput').value);
    const jumpRate = parseFloat(document.getElementById('jumpInput').value);
  
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: updateVideoSettings,
      args: [baseSpeed, jumpRate]
    });
  });
  
  // This function runs inside the YouTube page
  function updateVideoSettings(baseSpeed, jumpRate) {
    window.videoSpeed = baseSpeed;
    window.speedJump = jumpRate;
  
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.playbackRate = window.videoSpeed;
    });
  
    console.log(`Updated base speed to ${baseSpeed} and jump rate to ${jumpRate}`);
  
    // Optional: Show floating label
    let existing = document.getElementById('speed-label');
    if (!existing) {
      const label = document.createElement('div');
      label.id = 'speed-label';
      label.style.position = 'fixed';
      label.style.top = '10px';
      label.style.right = '10px';
      label.style.padding = '5px 10px';
      label.style.background = 'rgba(0,0,0,0.7)';
      label.style.color = 'white';
      label.style.fontSize = '14px';
      label.style.borderRadius = '5px';
      label.style.zIndex = 10000;
      document.body.appendChild(label);
      existing = label;
    }
    existing.textContent = `Speed: ${baseSpeed}x | Jump: ${jumpRate}`;
  }
  