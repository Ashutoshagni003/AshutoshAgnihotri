
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import '/Users/ashutoshagnihotri/Coding/Portfolio/src/First_Page/Components/Contact.css'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wbwk93s",
        "template_af052xo",
        form.current,
        "fMai9IXl6_Aa51bn0"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        () => {
          alert("Failed to send message");
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-left">
          <h1>Get In Touch</h1>
          <p>
            Whether it's a project, collaboration, or opportunity — feel free
            to reach out. I’m always open to discussing innovative ideas and
            building impactful digital experiences.
          </p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};
export default Contact;