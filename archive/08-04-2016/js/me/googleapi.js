var clientId = 'YOUR CLIENT ID';
var apiKey = 'YOUR API KEY';
var scopes = 'profile email https://www.googleapis.com/auth/drive.readonly';

function initAuth() {
  gapi.client.setApiKey(apiKey);
  gapi.auth2.init({
      client_id: clientId,
      scope: scopes
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    signinButton.addEventListener("click", handleSigninClick);
    signoutButton.addEventListener("click", handleSignoutClick);
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    signinButton.style.display = 'none';
    signoutButton.style.display = 'block';
    makeApiCall();
  } else {
    signinButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

function handleSigninClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Load the API client and auth library
gapi.load('client:auth2', initAuth);
