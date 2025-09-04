import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate async send
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
      <div className="max-w-lg w-full card bg-base-200 p-8 shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input input-bordered"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            className="input input-bordered"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            className="textarea textarea-bordered"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
          />
          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <div className="alert alert-success mt-2">Thank you! We'll be in touch soon.</div>
          )}
        </form>
        <div className="mt-8 text-center text-base-content/70">
          <div>Email: <a href="mailto:contact@rolerocket.com" className="link">contact@rolerocket.com</a></div>
          <div className="mt-2">Follow us: <a href="#" className="link">Twitter</a> | <a href="#" className="link">LinkedIn</a></div>
        </div>
      </div>
    </section>
  );
}
