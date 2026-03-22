import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaMessage, FaCheck } from "react-icons/fa6";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    emailjs
      .sendForm("service_opbfr3a", "template_lvb8mua", form.current, {
        publicKey: "_U79DhCJ4JDJtxiOb",
      })
      .then(
        () => {
          setEmail("");
          setName("");
          setMessage("");
          setSuccess("Message Sent Successfully");
          setIsSubmitting(false);
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setIsSubmitting(false);
        }
      );
  };

  const inputClasses = "h-12 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/50 px-4 text-black placeholder-gray-400 focus:outline-none focus:border-green/50 focus:ring-2 focus:ring-green/20 transition-all duration-300 hover:border-gray-500/70";
  const textareaClasses = "rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-600/50 p-4 text-black placeholder-gray-400 focus:outline-none focus:border-green/50 focus:ring-2 focus:ring-green/20 transition-all duration-300 hover:border-gray-500/70 resize-none";

  return (
    <div className="relative">
      {/* Success message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green/10 border border-green/30 rounded-xl flex items-center gap-3"
        >
          <FaCheck className="text-green text-lg" />
          <p className="text-green font-medium">{success}</p>
        </motion.div>
      )}

      {/* Tech decorations */}
      <div className="absolute -top-2 -right-2 text-green/20 font-mono text-xs">
        &lt;form&gt;
      </div>
      <div className="absolute -bottom-2 -left-2 text-cyan/20 font-mono text-xs">
        &lt;/form&gt;
      </div>
    </div>
  );
};

export default ContactForm;
