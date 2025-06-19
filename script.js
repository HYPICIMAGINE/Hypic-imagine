// Initialize EmailJS (replace with your actual user ID)
(function() {
  emailjs.init("YOUR_EMAILJS_USER_ID"); // <-- 🔁 Replace with your EmailJS User ID
})();

// Splash screen delay
window.onload = () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }, 3000);
};

// Show main sections
function showSection(id) {
  document.querySelectorAll(".content-section").forEach(section => section.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Show sub-sections under 'Create'
function showSubCreate(id) {
  document.querySelectorAll(".chat-form").forEach(form => form.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Send multiple files to Gmail
function sendEmailWithFile() {
  const input = document.getElementById("photoFile");
  const files = input.files;

  if (files.length === 0) {
    alert("Please select photo(s) first.");
    return;
  }

  const formData = new FormData();
  formData.append("to_name", "Hypic Imagine");
  formData.append("message", "Photos for editing");

  // Loop through all selected files
  for (let i = 0; i < files.length; i++) {
    formData.append("file" + i, files[i]);
  }

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(() => alert("Photos sent to Hypic Imagine successfully!"))
    .catch(err => {
      console.error("Error sending:", err);
      alert("Failed to send photos.");
    });
}

// Send text input to Gmail
function sendTextToEmail(type) {
  let message = "";
  let subject = "";

  if (type === "logo") {
    message = document.getElementById("companyName").value;
    subject = "Logo Request";
  } else if (type === "thumbnail") {
    message = "Title: " + document.getElementById("videoTitle").value +
              "\nDescription: " + document.getElementById("videoDesc").value;
    subject = "Thumbnail Request";
  } else if (type === "poster") {
    message = document.getElementById("posterDesc").value;
    subject = "Poster/Banner Request";
  } else if (type === "other") {
    message = document.getElementById("otherText").value;
    subject = "Other Creative Request";
  }

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_name: "Hypic Imagine",
    subject: subject,
    message: message
  }).then(() => {
    alert("Request sent successfully!");
  }).catch(err => {
    console.error("Error:", err);
    alert("Failed to send request.");
  });
}

// Payment info sender
function sendPaymentDetails() {
  const upi = document.getElementById("upiId").value;
  const amount = document.getElementById("amount").value;

  if (!upi || !amount) {
    alert("Enter your UPI ID and payment amount.");
    return;
  }

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_name: "Hypic Imagine",
    subject: "Payment Confirmation",
    message: `User UPI: ${upi}\nAmount Paid: ₹${amount}`
  }).then(() => {
    alert("Payment info sent successfully!");
  }).catch(err => {
    console.error("Payment send error:", err);
    alert("Failed to send payment details.");
  });
}