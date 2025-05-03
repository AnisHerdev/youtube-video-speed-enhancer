// document.getElementById('applyBtn').addEventListener('click', async () => {
//     const baseSpeed = parseFloat(document.getElementById('speedInput').value);
//     const jumpRate = parseFloat(document.getElementById('jumpInput').value);
  
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: updateVideoSettings,
//       args: [baseSpeed, jumpRate]
//     });
//   });
  
//   // This function runs inside the YouTube page
//   function updateVideoSettings(baseSpeed, jumpRate) {
//     window.videoSpeed = baseSpeed;
//     window.speedJump = jumpRate;
  
//     const videos = document.querySelectorAll('video');
//     videos.forEach(video => {
//       video.playbackRate = window.videoSpeed;
//     });
  
//     console.log(`Updated base speed to ${baseSpeed} and jump rate to ${jumpRate}`);
  
//     // Optional: Show floating label
//     let existing = document.getElementById('speed-label');
//     if (!existing) {
//       const label = document.createElement('div');
//       label.id = 'speed-label';
//       label.style.position = 'fixed';
//       label.style.top = '10px';
//       label.style.right = '10px';
//       label.style.padding = '5px 10px';
//       label.style.background = 'rgba(0,0,0,0.7)';
//       label.style.color = 'white';
//       label.style.fontSize = '14px';
//       label.style.borderRadius = '5px';
//       label.style.zIndex = 10000;
//       document.body.appendChild(label);
//       existing = label;
//     }
//     existing.textContent = `Speed: ${baseSpeed}x | Jump: ${jumpRate}`;
//   }
  
//   document.getElementById('resetSpeed').addEventListener('click', async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     console.log(tab);

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             const videos = document.querySelectorAll('video');
//             videos.forEach(video => {
//                 video.playbackRate = 1.0; // Reset speed to normal
//             });
//             console.log('Video speed reset to 1.0x');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
          return {
              videoSpeed: window.videoSpeed || 1.0, // Default to 1.0 if not set
              speedJump: window.speedJump || 0.25  // Default to 0.25 if not set
          };
      }
  }, (results) => {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
      }

      const { videoSpeed, speedJump } = results[0]?.result || {};
      if (videoSpeed !== undefined) {
          document.getElementById('speedInput').value = videoSpeed;
      }
      if (speedJump !== undefined) {
          document.getElementById('jumpInput').value = speedJump;
      }
  });
});

document.getElementById('resetSpeed').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.videoSpeed = 1;
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.playbackRate = 1.0; // Reset speed to normal
        });
        console.log(`Video speed reset to ${window.videoSpeed}`);
      },
    });
    document.getElementById('speedInput').value = 1;
});

document.getElementById('jumpInput').addEventListener("change", async () => {
  const newJumpRate = parseFloat(document.getElementById('jumpInput').value); 
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (newJumpRate) => {
          window.speedJump = newJumpRate;
          console.log(`Jump rate updated to ${window.speedJump}`);
      },
      args: [newJumpRate] 
  });
  document.getElementById('speedInput').step = newJumpRate;
});

document.getElementById('speedInput').addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (newSpeed) => {
          window.videoSpeed = newSpeed;
          const videos = document.querySelectorAll('video');
          videos.forEach(video => {
              video.playbackRate = newSpeed;
          });
          console.log(`Video speed set to ${newSpeed}`);
      },
      args: [parseFloat(document.getElementById('speedInput').value)]
  });
});