import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Linkedin, Github, Send, CheckCircle2, 
  Settings, User, Bell, Shield, Loader2 
} from "lucide-react";
import emailjs from "@emailjs/browser";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const ContactTab = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- VERIFIED MAPPING ---
    const SERVICE_ID = "service_uvzeidp"; 
    const TEMPLATE_ID = "template_og10z03"; 
    const PUBLIC_KEY = "rJg9y-Ln9XhXxhffC"; 
    // -----------------------

    try {
      // Initialize EmailJS with your Public Key
      emailjs.init(PUBLIC_KEY);

      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        // Hide success message after 5 seconds
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      alert(`Failed to send: ${error?.text || "Check your credentials"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-3xl font-bold gradient-text">Contact</h2>
            <p className="text-sm text-muted-foreground">Settings & preferences for reaching out</p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Sidebar */}
          <motion.div variants={item} className="md:col-span-2 space-y-2">
            <div className="rounded-xl border border-border bg-card p-4 space-y-1">
              {[
                { icon: User, label: "Profile", active: true },
                { icon: Mail, label: "Email" },
                { icon: Bell, label: "Notifications" },
                { icon: Shield, label: "Privacy" },
              ].map((s) => (
                <button
                  key={s.label}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    s.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <s.icon className="h-4 w-4" /> {s.label}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Links</h4>
              <motion.a href="mailto:anasshafiq9988@gmail.com" whileHover={{ x: 3 }} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" /> anasshafiq9988@gmail.com
              </motion.a>
              <motion.a href="https://linkedin.com/in/anas-shafiq-1a584025a/" target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4 text-primary" /> Anas Shafiq
              </motion.a>
              <motion.a href="https://github.com/anasshafiq12" target="_blank" rel="noopener noreferrer" whileHover={{ x: 3 }} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4 text-primary" /> anasshafiq12
              </motion.a>
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div variants={item} className="md:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6 min-h-[420px] flex flex-col justify-center">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                  <p className="text-lg font-semibold text-foreground">Message Sent!</p>
                  <p className="text-sm text-muted-foreground">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Send a Message</h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
                      <input
                        name="from_name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                      <input
                        name="from_email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                        placeholder="Hello, I'd like to discuss..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactTab;