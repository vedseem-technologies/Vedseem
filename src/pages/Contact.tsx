import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(
        "Something went wrong. Please reach out to us directly via email or phone.",
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 mb-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Mail className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">vedseem.contact@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Phone className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+91 7618020879</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <MapPin className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-300">
                      2nd Floor, Rise Incubation Center, Nagar Nigam, Elite,
                      <br />
                      Civil Lines, Jhansi – 284001, Uttar Pradesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-blue-500/20">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/vedseem-technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500/20 p-3 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    <Linkedin className="text-blue-400" size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/vedseemtechnologies/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500/20 p-3 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    <Instagram className="text-blue-400" size={24} />
                  </a>
                  <a
                    href="https://github.com/vedseem-technologies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500/20 p-3 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    <Github className="text-blue-400" size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.6521750920224!2d78.56680847524362!3d25.449889677549127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3977772d7dac9bb7%3A0x157716d149010d0e!2sRise%20Jhansi%20Incubation%20Centre%20Foundation!5e0!3m2!1sen!2sin!4v1770719963268!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6 text-center">
                  <p className="text-green-400 font-semibold text-lg">
                    Thank you for your message!
                  </p>
                  <p className="text-gray-300 mt-2">
                    We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white"
                      placeholder="example@gmail.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white resize-none"
                      placeholder="Tell us about your project goals, timeline, and budget..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send size={20} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
