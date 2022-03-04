import React, { Fragment, useState } from "react";

export default function Navbar() {
  const [msg, setMsg] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleMessageSent = (e) => {
    e.preventDefault();
    setProcessing(true);
    const data = new FormData(e.target);
    data.append("subject", "Covid-19 Tracker Contact Page");

    fetch("http://nextstep.sl/mailer/send-email.php", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMsg(data);

        if (data.success) {
          e.target.reset();
          e.target.querySelector("input").focus();
        }
      })
      .finally(() => {
        setProcessing(false);

        setTimeout(() => {
          setMsg(false);
        }, 3000);
      });
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-light btn-light box-shadow sticky-top">
        <div className="container">
          <a href="/" className="navbar-brand">
            <img
              src="/img/logo300x300.png"
              alt="app_logo"
              width={30}
              height={30}
              className="me-2 mb-1"
            />
            <span>COVID-19 Tracker</span>
          </a>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#contact" data-bs-toggle="modal" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="modal" id="contact">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-transparent border-0">
              <span>Send Message</span>
              <button
                data-bs-dismiss="modal"
                className="btn-close box-shadow-0"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleMessageSent}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    cols="30"
                    rows="3"
                    className="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                {msg && (
                  <div
                    className={`alert mb-3 alert-${
                      msg.success ? "success" : "danger"
                    }`}
                  >
                    {msg.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="btn btn-primary box-shadow-0"
                >
                  Send {">>"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
