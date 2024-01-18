// src/components/GoogleSignInButton.js
import React from 'react';
import { SignInButton } from '@clerk/clerk-react';

const GoogleSignInButton = () => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <SignInButton mode="redirect" strategy="google" />
    </div>
  );
};

export default GoogleSignInButton;
