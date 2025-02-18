import React from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaDiscord,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-start">
        {/* Contact Info */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Tech Firm 2025</h2>
          <p className="mt-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" size={20} />
            103/G2, Bypass Road Vannarpettai, Tirunelveli 627003, Tamil Nadu,
            INDIA
          </p>
          <p className="mt-2 flex items-center">
            <FaPhoneAlt className="mr-2" size={20} />
            +91 7695879552, +91 8667382757
          </p>
          <p className="mt-2 flex items-center">
            <FaEnvelope className="mr-2" size={20} />
            <span className="font-semibold">E-mail :</span>{" "}
            techfirm24fx@gmail.com
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col text-left w-1/3">
          <h2 className="text-xl font-bold">Connect</h2>
          <div className="flex gap-4 mt-2 text-2xl">
            {/* Social Media Icons */}
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={30} />
            </a>
            <a
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="mailto:techfirm24fx@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope size={30} />
            </a>
            <a
              href="https://discord.com/users/your-id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
