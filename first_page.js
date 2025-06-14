function openAndModifySecondPage() {
	// Open second page in a new tab
	const secondWindow = window.open('second.html', '_blank');
	
	// Function to modify second page
	function modifySecondPage() {
		secondWindow.document.getElementById('content').innerHTML =
			'Modified by First Page at ' + new Date().toLocaleTimeString();
		secondWindow.postMessage('showChanges', window.location.origin);
	}
	
	// Check if second page is loaded
	const checkLoaded = setInterval(() => {
		if (secondWindow.document && secondWindow.document.getElementById('content')) {
			clearInterval(checkLoaded);
			modifySecondPage();
		}
	}, 100);
	
	// Listen for confirmation from second page
	window.addEventListener('message', function handler(event) {
		if (event.origin === window.location.origin && event.data === 'changesVisible') {
			console.log('Second page confirmed changes are visible');
			// Attempt to return focus to first page
			window.focus();
			// Fallback: retry focus after a short delay
			setTimeout(() => {
				window.focus();
				// Modify first page's DOM
				document.getElementById('message').innerHTML =
					'Returned to First Page and modified at ' + new Date().toLocaleTimeString();
			}, 500);
			// Remove listener to prevent multiple triggers
			window.removeEventListener('message', handler);
		}
	});
}