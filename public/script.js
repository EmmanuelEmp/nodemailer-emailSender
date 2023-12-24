

const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("/send", {
    method: "post",
    body: mail,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to send email. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the success response (e.g., display a success message to the user)
      console.log(data);
    })
    .catch((error) => {
      // Handle errors (e.g., display an error message to the user)
      console.error(error);
    });
};
