import React from 'react';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
  const { signInGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInGoogle();
      console.log(result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="text-center pb-8">
      <p className="mb-4">Or</p>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 px-4 text-sm text-gray-900 hover:bg-gray-50 transition"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M0 0H512V512H0" fill="#fff" />
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
