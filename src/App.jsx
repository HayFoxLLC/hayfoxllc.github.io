import { useRef, useState } from "react";
import "./App.css";

// Swap this for your actual Formspree endpoint (or your own API route)
const FORM_ENDPOINT = "https://formspree.io/f/mljdzojo";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const careersRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [forms, setForms] = useState({
    contact: { name: "", email: "", market: "", message: "" },
    careers: { name: "", email: "", role: "", message: "" },
  });
  const [status, setStatus] = useState({ contact: "idle", careers: "idle" });

  const handleChange = (formName, field) => (e) => {
    setForms((prev) => ({
      ...prev,
      [formName]: { ...prev[formName], [field]: e.target.value },
    }));
  };

  const handleSubmit = (formName) => async (e) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, [formName]: "sending" }));

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          formType: formName,
          ...forms[formName],
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus((prev) => ({ ...prev, [formName]: "success" }));
      setForms((prev) => ({
        ...prev,
        [formName]:
          formName === "contact"
            ? { name: "", email: "", market: "", message: "" }
            : { name: "", email: "", role: "", message: "" },
      }));
    } catch (err) {
      setStatus((prev) => ({ ...prev, [formName]: "error" }));
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div className="row-between gap">
          <b
            className="white"
            onClick={() => scrollToSection(homeRef)}
            style={{ cursor: "pointer" }}
          >
            HAYFOX
          </b>
          <div className="row gap gold">
            <div
              className="hover"
              onClick={() => scrollToSection(aboutRef)}
              style={{ cursor: "pointer" }}
            >
              ABOUT US
            </div>
            <div
              className="hover"
              onClick={() => scrollToSection(workRef)}
              style={{ cursor: "pointer" }}
            >
              OUR MARKETS
            </div>
            <div
              className="hover"
              onClick={() => scrollToSection(contactRef)}
              style={{ cursor: "pointer" }}
            >
              CONTACT
            </div>
            <div
              className="hover"
              onClick={() => scrollToSection(careersRef)}
              style={{ cursor: "pointer" }}
            >
              CAREERS
            </div>
          </div>
        </div>
      </div>

      <div className="landing relative column" ref={homeRef}>
        <span className="title1">YOUR VISION.</span>
        <span className="title2">OUR MISSION.</span>
      </div>

      <div className="about" id="about" ref={aboutRef}>
        <h2 className="title3">ABOUT US</h2>
        <div className="row-around height">
          <div className="row-center">
            <div className="card width-30">
              <div className="card3 hayfox">
                <div className="card-bottom">
                  <h1>HAYFOX</h1>
                  <p>
                    Founded by Michael Hodge, with over 35 years in the
                    construction industry, HAYFOX is the number one choice among
                    our close clients to see their projects completed from start
                    to finish. From consulting, contracting, and everything your
                    business needs to thrive, reach out to us so we can help
                    make your vision a reality. We hope to speak to you soon and
                    show you how our work speaks for itself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="work" id="work" ref={workRef}>
        <h2 className="title3">OUR MARKETS</h2>
        <div className="row-around height">
          <div className="row-center">
            <div className="card1 width-30">
              <div className="card2 commercial">
                <div className="card-bottom">
                  <h1>Commercial</h1>
                  <p>
                    Offices, retail centers, and mixed-use developments built to
                    impress clients and keep businesses running from day one.
                  </p>
                </div>
              </div>
            </div>
            <div className="card1 width-30">
              <div className="card2 financial">
                <div className="card-bottom">
                  <h1>Financial</h1>
                  <p>
                    Secure, welcoming branches and headquarters designed around
                    trust, privacy, and the demands of modern banking.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row-center">
            <div className="card1 width-30">
              <div className="card2 medical">
                <div className="card-bottom">
                  <h1>Medical</h1>
                  <p>
                    Clinics, hospitals, and care facilities built to strict
                    standards, with patient comfort and workflow in mind.
                  </p>
                </div>
              </div>
            </div>
            <div className="card1 width-30">
              <div className="card2 residential">
                <div className="card-bottom">
                  <h1>Residential</h1>
                  <p>
                    From custom homes to multi-family communities, spaces
                    crafted with care, quality materials, and lasting value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact" id="contact" ref={contactRef}>
        <h2 className="title3">CONTACT</h2>
        <div className="row-around height">
          <div className="card width-30">
            <form className="card2 form" onSubmit={handleSubmit("contact")}>
              <div className="card-bottom">
                <p>
                  From brand identity to full-scale products, our portfolio
                  spans industries and disciplines. Explore a selection of
                  projects where strategy, design, and execution came together
                  to deliver measurable impact.
                </p>
              </div>
              <div className="label-card">
                <label>
                  Name
                  <input
                    type="text"
                    required
                    value={forms.contact.name}
                    onChange={handleChange("contact", "name")}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={forms.contact.email}
                    onChange={handleChange("contact", "email")}
                  />
                </label>
                <label>
                  Market
                  <input
                    type="text"
                    required
                    value={forms.contact.market}
                    onChange={handleChange("contact", "market")}
                  />
                </label>
                <label>
                  Message
                  <textarea
                    required
                    rows={5}
                    value={forms.contact.message}
                    onChange={handleChange("contact", "message")}
                  />
                </label>
                <button type="submit" disabled={status.contact === "sending"}>
                  {status.contact === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
              {status.contact === "success" && (
                <p className="form-success">Thanks — we'll be in touch.</p>
              )}
              {status.contact === "error" && (
                <p className="form-error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="careers" id="careers" ref={careersRef}>
        <h2 className="title3">CAREERS</h2>
        <div className="row-around height">
          <div className="card width-30">
            <form className="card2 form" onSubmit={handleSubmit("careers")}>
              <div className="card-bottom">
                <p>
                  We're always looking for talented, curious people to join our
                  team. Whether you're new to the area or an experienced member,
                  check out our open roles or send us your portfolio — we'd love
                  to meet you.
                </p>
              </div>
              <div className="label-card">
                <label>
                  Name
                  <input
                    type="text"
                    required
                    value={forms.careers.name}
                    onChange={handleChange("careers", "name")}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={forms.careers.email}
                    onChange={handleChange("careers", "email")}
                  />
                </label>
                <label>
                  Role you're applying for
                  <input
                    type="text"
                    required
                    value={forms.careers.role}
                    onChange={handleChange("careers", "role")}
                  />
                </label>
                <label>
                  Tell us about yourself
                  <textarea
                    required
                    rows={5}
                    value={forms.careers.message}
                    onChange={handleChange("careers", "message")}
                  />
                </label>
                <button type="submit" disabled={status.careers === "sending"}>
                  {status.careers === "sending"
                    ? "Sending..."
                    : "Submit Application"}
                </button>
              </div>
              {status.careers === "success" && (
                <p className="form-success">
                  Thanks — we'll review your application.
                </p>
              )}
              {status.careers === "error" && (
                <p className="form-error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
