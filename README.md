# TrustRent 🏠💳

> **TrustRent** is an AI-powered rental management platform that turns rent payments into a financial asset. By integrating escrow-based payments with a proprietary "Rental Credit Score," we build trust between landlords and tenants.

![Project Banner](https://via.placeholder.com/1200x600/4f46e5/ffffff?text=TrustRent+Dashboard+Preview)

## 🚀 The Problem
*   **Tenants** pay their biggest monthly expense (rent) but get **0 credit history** for it.
*   **Landlords** rely on outdated FICO scores that don't reflect actual rental behavior (payment timing, property care).
*   **Trust Gap:** Late payments and security deposit disputes create friction.

## 💡 The Solution
TrustRent acts as a "Credit Karma for Renters."
1.  **Escrow Payments:** Secure, verifiable transactions.
2.  **Rental Credit Score:** Gamifies on-time payments to build financial reputation.
3.  **AI Risk Analysis:** Predicts tenant churn and reliability using Google Gemini.

---

## ✨ Key Features

### 👤 For Tenants
*   **Rental Credit Score:** Watch your score grow (300-900) with every on-time payment.
*   **One-Click Rent Pay:** Secure payment gateway integration (UPI, Card, NetBanking).
*   **Instant Records:** Auto-generate legal-grade PDF receipts and credit reports.
*   **Maintenance Hub:** Log complaints directly to the landlord.

### 🏢 For Landlords
*   **Risk Dashboard:** View "Tenant Trustworthiness Index" and renewal probability.
*   **Portfolio Management:** Track occupancy, revenue, and vacant units.
*   **AI Insights:** "Is this tenant reliable?" — Get instant, data-driven answers from the AI agent.
*   **Automated Accounting:** Full payment history and downloadable statements.

---

## 🛠️ Tech Stack

**Frontend Framework**
*   ![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 19**
*   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript**

**Styling & UI**
*   ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**
*   **Lucide React** (Iconography)

**AI & Machine Learning**
*   ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white) **Google Gemini API** (`gemini-3-flash`)
    *   Used for: Chatbot assistance, Churn prediction, Tenant summaries.

**Libraries & Tools**
*   **Recharts:** Data visualization (Credit trends, Revenue charts).
*   **jsPDF:** Client-side PDF generation for invoices/reports.

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Google Cloud API Key (for Gemini AI features)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/trustrent.git
    cd trustrent
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    # Get your key from https://aistudio.google.com/
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://aistudio.google.com/apps/drive/11CXbhTfTZZFPP0Vb3fBt7D_WFMSPyUfO?showAssistant=true&showPreview=true&fullscreenApplet=true
---

## 🔮 Future Roadmap
*   [ ] **Blockchain Integration:** Smart contracts for automated security deposit refunds.
*   [ ] **Bank API Sync:** Real-time connection via Plaid/Stripe Connect.
*   [ ] **Marketplace:** Match high-score tenants with premium listings.

---

## 🤝 Contributing
This project was built for a hackathon. Suggestions and pull requests are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

**License:** MIT

**Built with ❤️** by **Arshiya Sana**
