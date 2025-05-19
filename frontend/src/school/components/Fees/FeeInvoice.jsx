import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { Button } from "@mui/material";
import schoolLogo from "../../../../public/images/schoolLogo.jpg"; // লোগো ঠিক path এ আছে নিশ্চিত হও

const FeeInvoice = ({ student, fee, status = "PAID" }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    // ✅ 1. QR Code generate
    const qrData = `Student: ${student.name}, Month: ${fee.month}, Amount: ${fee.amount}`;
    const qrImage = await QRCode.toDataURL(qrData);

    // ✅ 2. Image logo load
    const img = new Image();
    img.src = schoolLogo;

    img.onload = () => {
      // লোগো বসানো
      doc.addImage(img, "JPEG", 15, 10, 30, 30);

      // ইনস্টিটিউট ডিটেইলস
      doc.setFontSize(16);
      doc.setTextColor(33, 33, 33);
      doc.text("Dream House Academy", 50, 20);
      doc.setFontSize(12);
      doc.text("Mirpur-1, Dhaka-1216", 50, 26);
      doc.text("Phone: 01234-567890 | Email: info@dreamhouse.edu.bd", 50, 30);

      // ✅ হেডার লাইনের নিচে QR ও স্ট্যাটাস ব্যাজ
      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0);
      doc.text(status === "PAID" ? "PAID" : "UNPAID", 170, 20);
      doc.addImage(qrImage, "PNG", 160, 26, 30, 30);

      doc.setDrawColor(0);
      doc.line(15, 45, 195, 45);

      // ইনভয়েস হেডার
      doc.setFontSize(14);
      doc.setTextColor(0);
      doc.text("Fee Payment Invoice", 80, 55);

      // ✅ স্টুডেন্ট ইনফো
      doc.setFontSize(11);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 63);
      doc.text(`Student Name: ${student.name}`, 20, 70);
      doc.text(`Class: ${student.student_class}`, 20, 77);
      doc.text(`Guardian: ${student.guardian}`, 20, 84);
      doc.text(`Phone: ${student.guardian_phone}`, 20, 91);
      doc.text(`Month: ${fee.month} ${fee.year}`, 20, 98);

      // ✅ টেবিল
      autoTable(doc, {
        startY: 110,
        head: [["SL", "Description", "Amount (৳)"]],
        body: [["1", "Tuition Fee", fee.amount]],
        headStyles: { fillColor: [34, 139, 230] },
        styles: { halign: "center", fontSize: 10 },
      });

      const finalY = doc.lastAutoTable.finalY || 130;

      // ✅ টোটাল অ্যামাউন্ট
      doc.setFont("helvetica", "bold");
      doc.text(`Total Amount: ৳${fee.amount}`, 20, finalY + 15);

      // ✅ নোট ও সিগনেচার
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Note: This is a system-generated invoice. Please keep it for your records.", 20, finalY + 25);

      doc.line(150, finalY + 40, 190, finalY + 40);
      doc.text("Authorized Signature", 150, finalY + 46);

      doc.save(`${student.name}_Invoice.pdf`);
    };
  };

  return (
    <Button variant="contained" color="success" onClick={generatePDF}>
      Download Invoice
    </Button>
  );
};

export default FeeInvoice;
