import { jsPDF } from "jspdf";
import { Tenant, Property, Payment } from "../types";

export const generateCreditReport = (tenant: Tenant, property: Property, payments: Payment[]) => {
  const doc = new jsPDF();
  const primaryColor = [79, 70, 229]; // Indigo 600
  const grayColor = [107, 114, 128]; // Gray 500

  // --- HEADER ---
  doc.setFillColor(249, 250, 251); // Gray 50
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.text("TrustRent", 20, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFont("helvetica", "normal");
  doc.text("OFFICIAL RENTAL CREDIT REPORT", 20, 28);
  
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 20);
  doc.text(`Report ID: TR-${Math.floor(Math.random() * 10000)}`, 150, 25);

  // --- TENANT INFO ---
  let yPos = 60;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("TENANT INFORMATION", 20, yPos);
  
  doc.setDrawColor(229, 231, 235);
  doc.line(20, yPos + 2, 190, yPos + 2);
  
  yPos += 12;
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${tenant.name}`, 20, yPos);
  doc.text(`Email: ${tenant.email}`, 20, yPos + 8);
  doc.text(`Current Address: ${property.address}, ${property.city}`, 20, yPos + 16);

  // --- CREDIT SCORE BADGE ---
  yPos += 30;
  doc.setFillColor(238, 242, 255); // Indigo 50
  doc.roundedRect(20, yPos, 170, 40, 3, 3, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.text("Rental Credit Score", 30, yPos + 15);
  
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text(`${tenant.creditScore}`, 30, yPos + 28);
  
  doc.setFontSize(14);
  doc.text("/ 900", 65, yPos + 28);
  
  doc.setFontSize(12);
  doc.setTextColor(22, 163, 74); // Green
  doc.text("EXCELLENT STANDING", 120, yPos + 22);

  // --- PAYMENT HISTORY SUMMARY ---
  yPos += 55;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT HISTORY SUMMARY", 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);

  const totalPayments = payments.length;
  const onTimePayments = payments.filter(p => !p.isLate).length;
  const onTimeRate = totalPayments > 0 ? Math.round((onTimePayments / totalPayments) * 100) : 100;

  yPos += 12;
  doc.setFont("helvetica", "normal");
  doc.text(`Total Recorded Payments: ${totalPayments}`, 20, yPos);
  doc.text(`On-Time Payment Rate: ${onTimeRate}%`, 20, yPos + 8);

  // --- RECENT TRANSACTIONS TABLE ---
  yPos += 20;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Recent Transactions:", 20, yPos);
  
  yPos += 8;
  // Table Header
  doc.setFillColor(243, 244, 246);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.text("Date", 25, yPos);
  doc.text("Amount", 70, yPos);
  doc.text("Status", 120, yPos);
  
  // Table Rows
  doc.setFont("helvetica", "normal");
  payments.slice(0, 5).forEach((p) => {
    yPos += 10;
    doc.text(p.date, 25, yPos);
    doc.text(`$${p.amount}`, 70, yPos);
    
    if (p.isLate) {
        doc.setTextColor(180, 83, 9); // Amber
        doc.text("Late", 120, yPos);
    } else {
        doc.setTextColor(22, 163, 74); // Green
        doc.text("On Time", 120, yPos);
    }
    doc.setTextColor(0);
  });

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("This document certifies the rental payment history recorded on the TrustRent Platform.", 20, 270);
  doc.text("TrustRent Inc. | Verified Secure Ledger Data", 20, 275);

  doc.save(`TrustRent_CreditReport_${tenant.name.replace(' ', '_')}.pdf`);
};
