import React from "react";

export default function Footer() {
  return (
    <div className="footer bg-light box-shadow-inverse">
      <p className="text-muted m-0 text-center">
        <span className="me-2">
          &copy; {new Date().getFullYear()}. Powered by:
        </span>
        <a
          href="http://nextstep.sl"
          className="link text-default text-decoration-none"
        >
          <strong>Next Step Ltd.</strong>
        </a>
      </p>
    </div>
  );
}
