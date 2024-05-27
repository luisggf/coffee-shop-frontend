import React, { useState } from "react";
import Header from "../MainCoffeeHeader";
import emailjs from "emailjs-com";
import { toast } from "sonner";

export default function Contact() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const serviceId = "service_s0ydikf";
    const templateId = "template_lpwuwu2";
    const userId = "8v4Wm6LjxWtK0ss0Y";
    console.log(serviceId, templateId, userId);

    if (!serviceId || !templateId || !userId) {
      setResponseMessage("Email service configuration is missing.");
      setIsSending(false);
      return;
    }

    const templateParams = {
      to_email: recipientEmail,
      subject,
      message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      toast.success("Email sent!");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send email!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-1/2 mx-auto p-10 mt-10">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
          {responseMessage && (
            <div className="mt-4 text-sm text-gray-600">{responseMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}
