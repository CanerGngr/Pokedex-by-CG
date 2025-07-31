// Pokemon Utility Functions

// Show error message
function showError(message) {
  let errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger text-center";
  errorDiv.innerHTML = "<strong>Error:</strong> " + message;

  let containers = document.getElementsByClassName("container");
  if (containers.length > 0) {
    containers[0].appendChild(errorDiv);
  }
}

// Show loading message
function showLoading() {
  let loadingDiv = document.createElement("div");
  loadingDiv.id = "loading-message";
  loadingDiv.className = "text-center p-4";
  loadingDiv.innerHTML = createLoadingTemplate();

  let containers = document.getElementsByClassName("container");
  if (containers.length > 0) {
    containers[0].appendChild(loadingDiv);
  }
}

// Remove loading message
function hideLoading() {
  let loadingDiv = document.getElementById("loading-message");
  if (loadingDiv) {
    loadingDiv.remove();
  }
}
