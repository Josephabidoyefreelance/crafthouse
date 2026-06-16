// Crafthouse Kitchen AI Chatbot

const CHATBOT_RESPONSES = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    response: "Hello! Welcome to Crafthouse Kitchen. I'm here to help you find the perfect kitchen appliances. What are you looking for today?"
  },
  products: {
    patterns: ['what do you sell', 'what products', 'what do you have', 'your products', 'catalogue', 'catalog'],
    response: "We carry a wide range of premium kitchen products including:\n\n• Cooker Hoods (60cm & 90cm)\n• Range Cookers (90cm)\n• Built-in Ovens (60cm & 90cm)\n• Hobs (Gas, Induction, Ceramic)\n• Microwaves\n• Dishwashers\n• Refrigeration\n• Kitchen Sinks & Taps\n• Storage & Organizers\n• Handles & Accessories\n\nWhich category interests you?"
  },
  cookerHoods: {
    patterns: ['cooker hood', 'extractor', 'chimney hood', 'range hood', 'ventilation'],
    response: "Our cooker hoods range from ₦295,000 to ₦665,000. We have:\n\n• 90cm Vertical Hoods (Black, White, Silver)\n• T-Shape Island Hoods\n• Black Magic Digital Hoods\n• Sensor Auto-Adjust Hoods\n\nAll come with LED lighting and washable filters. Would you like to see our full collection?"
  },
  cookers: {
    patterns: ['cooker', 'range cooker', 'cooking range', 'gas cooker', 'stove'],
    response: "Our 90cm range cookers start from ₦490,000 up to ₦710,000. Popular models include:\n\n• SH905 — ₦710,000 (Best Seller)\n• GHL925 — ₦630,000 (Rose Gold Knobs)\n• GHL929B — ₦685,000 (Rustic Black)\n• SH906 — ₦490,000 (Value Pick)\n\nAll have 5 gas burners, cast iron supports, and dual-cavity ovens. Interested in any?"
  },
  ovens: {
    patterns: ['oven', 'built-in oven', 'electric oven', 'gas oven', 'baking'],
    response: "Our built-in ovens range from ₦460,000 to ₦1,250,000:\n\n• 60cm Electric Ovens from ₦460,000\n• BlackMagic Digital Touch Oven — ₦720,000 (Flagship)\n• 60cm Gas+Electric Dual Fuel — ₦700,000\n• 90cm Professional Ovens from ₦1,150,000\n\nWould you like more details on any model?"
  },
  hobs: {
    patterns: ['hob', 'gas hob', 'induction hob', 'ceramic hob', 'cooktop'],
    response: "We carry gas, induction, and ceramic hobs:\n\n• 60cm Gas Hob — from ₦265,000\n• 90cm Gas Hob — from ₦390,000\n• 60cm Induction Hob — ₦320,000\n• 60cm Ceramic Hob — ₦295,000\n\nInduction hobs are our most popular for safety and speed. Interested?"
  },
  microwaves: {
    patterns: ['microwave', 'micro wave', 'microwave oven'],
    response: "Our microwave range:\n\n• 23L Silver — ₦290,000\n• 25L Black Glass — ₦390,000\n• 28L Full Touch — ₦465,000\n• 34L Convection — ₦485,000\n• 50L UltraSleek — ₦988,000\n\nAll are built-in models for a seamless kitchen look. Which size suits you?"
  },
  sinks: {
    patterns: ['sink', 'kitchen sink', 'undermount sink', 'stainless sink'],
    response: "Our premium sinks:\n\n• HandMade Single Bowl SS — ₦145,000\n• HandMade Double Bowl SS — ₦185,000\n• Nano Black Single Bowl — ₦195,000\n• Granite Double Bowl Black — ₦220,000\n\nAll our handmade sinks are 1.2mm thick gauge for durability. Do you prefer stainless steel or granite?"
  },
  taps: {
    patterns: ['tap', 'kitchen tap', 'mixer tap', 'faucet', 'water tap'],
    response: "Our kitchen taps range from ₦45,000 to ₦68,000:\n\n• Mixer 2013 — ₦45,000 (Matte Black)\n• Mixer 2023 — ₦52,000 (Brushed Nickel, Popular)\n• Pull-Out Spray 2027 — ₦58,000\n• Spring Pull 2028 — ₦68,000 (Professional)\n\nAll feature ceramic disc cartridges for longevity."
  },
  price: {
    patterns: ['price', 'cost', 'how much', 'pricing', 'affordable', 'cheap', 'expensive'],
    response: "Our prices vary by product:\n\n• Kitchen Taps: ₦45,000 – ₦68,000\n• Storage Solutions: ₦18,000 – ₦95,000\n• Hobs: ₦265,000 – ₦420,000\n• Cooker Hoods: ₦295,000 – ₦665,000\n• Microwaves: ₦290,000 – ₦988,000\n• Ovens: ₦460,000 – ₦1,250,000\n• Range Cookers: ₦490,000 – ₦710,000\n\nWould you like pricing on a specific product?"
  },
  delivery: {
    patterns: ['delivery', 'shipping', 'how long', 'deliver', 'when will', 'dispatch'],
    response: "Our delivery details:\n\n• FREE delivery on orders above ₦500,000 within Lagos\n• ₦15,000 flat fee for orders below ₦500,000\n• Lagos delivery: 2–5 business days\n• Outside Lagos: 5–10 business days\n\nWe also offer professional installation. Would you like to know more about installation?"
  },
  installation: {
    patterns: ['install', 'installation', 'fitting', 'fit', 'set up', 'technician'],
    response: "Yes! We offer professional installation services across Lagos. Our certified technicians will ensure your appliances are fitted safely and correctly.\n\nInstallation is typically done within 1–3 days after delivery. Contact us to arrange: 08058262947 or crafthouse.systems@gmail.com"
  },
  warranty: {
    patterns: ['warranty', 'guarantee', 'broken', 'faulty', 'defective', 'repair'],
    response: "All our appliances come with a manufacturer warranty:\n\n• Most products: 1–2 year warranty\n• Covers manufacturing defects\n• Excludes physical damage\n\nIf you have a warranty claim, contact us at crafthouse.systems@gmail.com or call 08058262947."
  },
  payment: {
    patterns: ['payment', 'pay', 'bank transfer', 'how to pay', 'paystack', 'card', 'pos'],
    response: "We accept multiple payment methods:\n\n• Bank Transfer — First Bank, Acc: 1234567890, Sixth Column Limited\n• Pay on Delivery (Lagos only, cash or POS)\n• Online Payment via Paystack (card, USSD, bank)\n\nOrders are confirmed after payment verification."
  },
  order: {
    patterns: ['order', 'how to order', 'buy', 'purchase', 'place order', 'ordering'],
    response: "Ordering is simple:\n\n1. Browse our shop and click any product\n2. Add to cart\n3. Go to checkout\n4. Fill your details and choose payment\n5. Place your order\n\nYou'll receive an email confirmation immediately. Ready to start shopping?"
  },
  location: {
    patterns: ['location', 'address', 'where are you', 'showroom', 'visit', 'where is'],
    response: "Our showroom is located at:\n\nPlot 4, Honda Close\nOff Kolawole Shonibare Street\nAjao Estate, Off International Airport Road\nLagos, Nigeria\n\nShowroom Hours:\nMon–Fri: 8:00am – 6:00pm\nSaturday: 9:00am – 5:00pm\nSunday: Closed\n\nCome see our products in person!"
  },
  contact: {
    patterns: ['contact', 'phone', 'call', 'whatsapp', 'email', 'reach you', 'speak to'],
    response: "You can reach us through:\n\n📞 Phone/WhatsApp: 08058262947\n📧 Email: crafthouse.systems@gmail.com\n💬 WhatsApp: wa.me/2348058262947\n\nOr fill the contact form on our Contact page. We typically respond within 2 hours during business hours."
  },
  returns: {
    patterns: ['return', 'refund', 'exchange', 'send back', 'cancel'],
    response: "Our returns policy:\n\n• Returns accepted within 7 days of delivery\n• Item must be unused and in original packaging\n• Contact us first at crafthouse.systems@gmail.com\n• Refund processed within 5–7 business days\n\nFor exchanges, we arrange collection and redelivery."
  },
  brand: {
    patterns: ['brand', 'who are you', 'about', 'company', 'crafthouse', 'sixth column'],
    response: "Crafthouse Kitchen is the premium kitchen brand of Sixth Column Limited, based in Lagos, Nigeria.\n\nWe specialize in high-quality kitchen systems and appliances — from cooker hoods and range cookers to sinks, taps, and complete storage solutions.\n\nOur motto: Design. Quality. Function."
  },
  thanks: {
    patterns: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect'],
    response: "You're welcome! 😊 Is there anything else I can help you with? Feel free to browse our shop or contact us anytime."
  },
  bye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'done', 'no thanks', 'nothing else'],
    response: "Thank you for visiting Crafthouse Kitchen! Feel free to come back anytime. Happy cooking! 👋"
  }
};

const FALLBACK_RESPONSES = [
  "I'm not sure I understood that. Could you ask about our products, prices, delivery, or contact details?",
  "Let me help you better — are you looking for a specific product, asking about delivery, or need our contact info?",
  "I didn't quite catch that. You can ask me about our cookers, ovens, hobs, sinks, prices, delivery, or how to place an order.",
];

function getBotResponse(input) {
  const text = input.toLowerCase().trim();

  for (const key in CHATBOT_RESPONSES) {
    const entry = CHATBOT_RESPONSES[key];
    if (entry.patterns.some(p => text.includes(p))) {
      return entry.response;
    }
  }

  // Check for price numbers
  if (/\d{3,}/.test(text)) {
    return "I can see you're asking about a specific amount. Our prices range from ₦18,000 for accessories up to ₦1,250,000 for professional ovens. Would you like pricing for a specific product category?";
  }

  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

function initChatbot() {
  // Create chatbot HTML
  const chatHTML = `
    <div id="chatbot-bubble" onclick="toggleChat()" title="Chat with us">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span id="chat-unread" style="display:none">1</span>
    </div>

    <div id="chatbot-window" style="display:none">
      <div id="chat-header">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;background:rgba(255,255,255,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <div style="font-weight:700;font-size:14px">Crafthouse Support</div>
            <div style="font-size:11px;opacity:0.7">● Online now</div>
          </div>
        </div>
        <button onclick="toggleChat()" style="background:none;border:none;color:white;font-size:22px;cursor:pointer;line-height:1">&times;</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-input-row">
        <input type="text" id="chat-input" placeholder="Type your message..." onkeydown="if(event.key==='Enter')sendMessage()">
        <button onclick="sendMessage()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <div style="text-align:center;padding:8px;font-size:10px;color:#888;border-top:1px solid #f0f0f0">
        <a href="https://wa.me/2348058262947" target="_blank" style="color:#25D366;font-weight:600;text-decoration:none">
          📱 Chat on WhatsApp instead
        </a>
      </div>
    </div>
  `;

  const chatStyles = `
    <style>
      #chatbot-bubble {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 58px;
        height: 58px;
        background: var(--gold);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 4px 20px rgba(184,147,63,0.4);
        transition: transform 0.2s, box-shadow 0.2s;
        color: white;
      }
      #chatbot-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(184,147,63,0.5); }
      #chat-unread {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #E53935;
        color: white;
        font-size: 10px;
        font-weight: 700;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #chatbot-window {
        position: fixed;
        bottom: 100px;
        right: 28px;
        width: 360px;
        max-height: 520px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.18);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: chatSlideUp 0.25s ease;
      }
      @keyframes chatSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      #chat-header {
        background: linear-gradient(135deg, var(--black), #2C2C2C);
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      #chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 320px;
        background: #FAFAF8;
      }
      .chat-msg {
        max-width: 82%;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.6;
        white-space: pre-wrap;
      }
      .chat-msg.bot {
        background: white;
        color: var(--black);
        align-self: flex-start;
        border: 1px solid var(--border);
        border-bottom-left-radius: 4px;
      }
      .chat-msg.user {
        background: var(--gold);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
      .chat-msg.typing {
        background: white;
        border: 1px solid var(--border);
        align-self: flex-start;
        color: var(--mid);
        font-style: italic;
      }
      #chat-input-row {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        border-top: 1px solid var(--border);
        background: white;
      }
      #chat-input {
        flex: 1;
        border: 1.5px solid var(--border);
        border-radius: 24px;
        padding: 9px 16px;
        font-size: 13px;
        outline: none;
        font-family: inherit;
        transition: border-color 0.2s;
      }
      #chat-input:focus { border-color: var(--gold); }
      #chat-input-row button {
        width: 38px;
        height: 38px;
        background: var(--gold);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.2s;
      }
      #chat-input-row button:hover { background: var(--gold-dark); }
      @media (max-width: 480px) {
        #chatbot-window { width: calc(100vw - 32px); right: 16px; bottom: 90px; }
        #chatbot-bubble { right: 16px; bottom: 16px; }
      }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', chatStyles + chatHTML);

  // Show welcome message after 3 seconds
  setTimeout(() => {
    document.getElementById('chat-unread').style.display = 'flex';
  }, 3000);
}

let chatOpen = false;
let firstOpen = true;

function toggleChat() {
  const win = document.getElementById('chatbot-window');
  const unread = document.getElementById('chat-unread');
  chatOpen = !chatOpen;
  win.style.display = chatOpen ? 'flex' : 'none';
  unread.style.display = 'none';

  if (chatOpen && firstOpen) {
    firstOpen = false;
    addBotMessage("👋 Hello! Welcome to Crafthouse Kitchen.\n\nI can help you with:\n• Product information & pricing\n• Delivery & installation\n• Orders & payment\n• Contact details\n\nWhat can I help you with today?");
    setTimeout(() => {
      addQuickReplies(['Products & Prices', 'Delivery Info', 'Place an Order', 'Contact Us']);
    }, 500);
  }
}

function addBotMessage(text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addQuickReplies(options) {
  const messages = document.getElementById('chat-messages');
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-top:4px';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.style.cssText = 'background:white;border:1.5px solid #B8933F;color:#B8933F;padding:6px 12px;border-radius:16px;font-size:12px;cursor:pointer;font-weight:600;transition:all 0.2s;font-family:inherit';
    btn.onmouseover = () => { btn.style.background = '#B8933F'; btn.style.color = 'white'; };
    btn.onmouseout = () => { btn.style.background = 'white'; btn.style.color = '#B8933F'; };
    btn.onclick = () => { wrap.remove(); handleUserInput(opt); };
    wrap.appendChild(btn);
  });
  messages.appendChild(wrap);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  handleUserInput(text);
}

function handleUserInput(text) {
  addUserMessage(text);

  // Show typing indicator
  const messages = document.getElementById('chat-messages');
  const typing = document.createElement('div');
  typing.className = 'chat-msg typing';
  typing.textContent = 'Typing...';
  typing.id = 'typing-indicator';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
    const response = getBotResponse(text);
    addBotMessage(response);

    // Add contextual quick replies
    const lower = text.toLowerCase();
    if (lower.includes('product') || lower.includes('sell') || lower.includes('have')) {
      addQuickReplies(['Cooker Hoods', 'Cookers', 'Ovens', 'Hobs', 'Sinks']);
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
      addQuickReplies(['Cooker Prices', 'Oven Prices', 'Hob Prices', 'Sink Prices']);
    } else if (lower.includes('order') || lower.includes('buy')) {
      addQuickReplies(['Go to Shop', 'Payment Methods', 'Delivery Info']);
    }
  }, 900);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initChatbot);
