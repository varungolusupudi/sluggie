import Clerk from '@clerk/clerk-js';

// Your Clerk publishable key
const clerk = new Clerk('your_publishable_key');

// Initialize Clerk
await clerk.load();

// Mount the SignIn component
const signInComponent = document.querySelector('#sign-in');
clerk.mountSignIn(signInComponent, {
  // Optional: Customize the appearance
  appearance: {
    baseTheme: 'dark' // Or 'light'
  },
  // Additional properties for customization (optional)
  routing: 'path', // or 'hash', 'virtual'
  path: '/sign-in', // The path where the component is mounted
  redirectUrl: 'redirect_url_after_sign_in', // URL to navigate after sign-in
  afterSignInUrl: 'url_after_sign_in', // URL to navigate after a successful sign in
  signUpUrl: 'sign_up_page_url', // URL or path to the sign-up page
  afterSignUpUrl: 'url_after_sign_up', // URL to navigate after a successful sign-up
  initialValues: {
    // initialValues for prefilling the sign-in fields
  }
});
