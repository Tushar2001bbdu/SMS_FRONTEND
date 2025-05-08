"use client";  // Ensure this is added at the top for client-side rendering

import Script from 'next/script';

export default function ZoomCDN() {
  return (
    <>
      {/* Load scripts asynchronously */}
      <Script
        src="https://source.zoom.us/2.18.0/lib/vendor/react-dom.min.js"
        strategy="afterInteractive" // Loads after the page is interactive
      />
      <Script
        src="https://source.zoom.us/2.18.0/lib/vendor/redux.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://source.zoom.us/2.18.0/lib/vendor/redux-thunk.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://source.zoom.us/2.18.0/lib/vendor/lodash.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
