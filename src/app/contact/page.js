export const metadata = {
  title: "Contact Us - Local Skills Hub",
  description:
    "Get in touch with the Local Skills Hub team. If you have any questions, feedback, or need assistance, reach out to us through the contact form.",
};

import { db } from "@/utils/dbConnection";

export default function ContactPage() {
  async function handleSubmit(formValues) {
    "use server";

    const username = formValues.get("username");
    const email = formValues.get("email");
    const message = formValues.get("message");

    db.query(
      `INSERT INTO contact (username, email, message) VALUES ($1, $2, $3)`,
      [username, email, message]
    );
  }

  return (
    <div className="flex justify-center flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mx-auto w-full bg-[#D1E2EB]">
      <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-[#A5BFCC] mb-6">
        <h1 className="text-center text-2xl font-semibold mb-4 text-[#134b70]">
          Fill out the form below to send us a message!
        </h1>
        <p className="text-center text-lg text-[#4C585B]">
          If you want to contact us for any reason—good, bad, make a complaint,
          or let us know what we&apos;re doing well or not—please fill out the
          form below. We appreciate your feedback!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full sm:w-[500px] max-w-lg p-8 rounded-lg shadow-lg bg-[#A5BFCC]">
        <form
          action={handleSubmit}
          className="flex flex-col justify-center items-center border-2 border-solid border-[#4C585B] w-full max-w-3xl p-8 rounded-lg shadow-lg bg-[#D1E2EB]"
        >
          <label
            htmlFor="username"
            className="text-lg font-medium mb-2 text-[#4C585B]"
          >
            Name:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Write your name here"
            required
            className="w-full p-3 mb-4 text-[#134b70] rounded-md border-2 border-[#7E99A3] bg-[#A5BFCC]"
          />
          <label
            htmlFor="email"
            className="text-lg font-medium mb-2 text-[#4C585B]"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Write your email here"
            required
            className="w-full p-3 mb-4 text-[#134b70] rounded-md border-2 border-[#7E99A3] bg-[#A5BFCC]"
          />
          <label
            htmlFor="message"
            className="text-lg font-medium mb-2 text-[#4C585B]"
          >
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter your message here"
            className="w-full p-3 mb-4 text-[#134b70] rounded-md border-2 border-[#7E99A3] bg-[#A5BFCC] h-32"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 mt-4 text-white bg-[#134b70] rounded-md shadow-lg hover:bg-[#508c9b]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
