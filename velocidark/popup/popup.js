document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', async () => {
    const speed = parseFloat(button.dataset.speed);
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (speed) => {
        const videos = document.querySelectorAll('video');
        if (videos.length === 0) {
          alert('Видео не найдено!');
          return;
        }
        videos.forEach(video => video.playbackRate = speed);
      },
      args: [speed]
    });
  });
});