// Listen for message from first page
window.addEventListener('message', function(event) {
	if (event.origin === window.location.origin && event.data === 'showChanges') {
		// Ensure DOM changes are visible
		document.getElementById('content').style.display = 'block';
		// Force a repaint to ensure visibility
		document.getElementById('content').offsetHeight;
		// Send confirmation back to first page
		window.opener.postMessage('changesVisible', window.location.origin);
	}
});