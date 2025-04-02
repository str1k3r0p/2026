'using client';
import { useState } from "react";

export default function LandingPage() {
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  // Handle form submission (store in backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://web-production-6915.up.railway.app/api/subscribe/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setMessage("");
        setStatus('success');
        setShowEmailForm(false);
      } else {
        setMessage(data.message || "Something went wrong. Please try again.");
        setStatus('error');
      }
    }
    catch (err) {
      setMessage("Unable to connect to the server. Please try again.");
      setStatus('error');
    }
  };

  return (
    <div className=" bg-slate-200 text-white">
      {/* Navbar */}
      <nav className="flex justify-between p-6 max-w-7xl mx-auto ">
      <div className="flex items-center">
        <img src="/Icon.svg" alt="Chasqui Logo" className="w-10 h-10" />
        <h1 className="text-teal-800 text-2xl font-bold ml-4">Chasqui AI</h1>
      </div>
        <div className="space-x-7">
          <a href="#about" className="text-teal-800 hover:text-slate-800">About</a>
          <a href="#faq" className="text-teal-800 hover:text-slate-800">FAQ</a>
          <a href="#story" className="text-teal-800 hover:text-slate-800">Our Story</a>
          <button className="bg-teal-800 px-4 py-2 rounded-md hover:text-slate-800">Login</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="text-center py-20 px-6 bg-gradient-to-r from-teal-600 to-teal-950">
        <div className = "max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold">Networking is challenging...</h2>
          <p className="text-3xl text-teal-300 mt-2">Chasqui can help you with that!</p>
          <ul className="text-left mt-12 space-y-9 max-w-lg mx-auto pl-16">
            <li>✔ Set personalized career goals</li>
            <li>✔ Schedule meetings with network connections</li>
            <li>✔ Keep track of meeting notes and follow-ups</li>
            <li>✔ Utilize AI-assisted messages and meeting preparation</li>
          </ul>
        </div>
        <h3 className="text-2xl font-bold mt-20">Join the Waitlist</h3>
        <p className="text-teal-300 mt-2">Be among the first to access our AI-powered networking tool!</p>
        {status === 'success' ? (
          <p className="text-1xl font-bold mt-12">Thank you! You'll be notified when we launch.</p>
        ) : (
          <div>
            {message && <p className="text-red-500 mt-4">{message}</p>}
            {showEmailForm && (
              <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-3 w-full rounded-md text-teal-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'} 
                  className="bg-teal-400 text-white px-6 py-3 rounded-md mt-4 w-full hover:bg-teal-500 hover:text-slate-800">
                    {status === 'loading' ? 'Submitting...' : 'Join Now'}
                </button>
              </form>
            )}
          </div>
        )}
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 text-center bg-black">
        <h3 className="text-3xl font-bold">Start networking <span className="text-teal-400">with Chasqui</span></h3>
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-b from-teal-700 to-teal-600 p-6 rounded-md">
            <h4 className="font-bold text-xl">Manage Contacts</h4>
            <p className="text-teal-300 mt-2">Organize connections, track meetings, and manage notes.</p>
          </div>
          <div className="bg-gradient-to-b from-teal-700 to-teal-600 p-6 rounded-md">
            <h4 className="font-bold text-xl">Craft Messages</h4>
            <p className="text-teal-300 mt-2">Generate AI-powered personalized emails.</p>
          </div>
          <div className="bg-gradient-to-b from-teal-700 to-teal-600 p-6 rounded-md">
            <h4 className="font-bold text-xl">Grow Your Network</h4>
            <p className="text-teal-300 mt-2">Set goals, create to-dos, and set reminders.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
