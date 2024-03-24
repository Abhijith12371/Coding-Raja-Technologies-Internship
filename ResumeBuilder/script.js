const placeholders = document.querySelectorAll(".placeholder");
let add = document.querySelector(".add");

placeholders.forEach((placeholder) => {
  placeholder.addEventListener("focus", (e) => {
    if (
      placeholder.textContent === "Enter your objective" ||
      placeholder.textContent === "Enter your WorkExperience" ||
      placeholder.textContent === "Enter your AcademicQualification"
    ) {
      placeholder.textContent = "";
    }
  });

  placeholder.addEventListener("blur", (e) => {
    if (placeholder.textContent === "") {
      if (placeholder.classList.contains("objective")) {
        placeholder.textContent = "Enter your objective";
      } else if (placeholder.classList.contains("work-experience")) {
        placeholder.textContent = "Enter your WorkExperience";
      } else if (placeholder.classList.contains("AcademicQualification")) {
        placeholder.textContent = "Enter your AcademicQualification";
      }
    }
  });
});

add.addEventListener("click", () => {
  let container = document.querySelector(".container");
  let MainContainer = document.querySelector(".MainContainer");
  let information = document.querySelector(".information h1");
  let Print = document.querySelector(".Print");
  let nameInput = document.querySelector(".name input").value;
  let PhoneNoInput = document.querySelector(".YourContact input").value;
  let Address = document.querySelector(".Address p").textContent;
  let FaceBook = document.querySelector(".Facebook input").value;
  let Youtube = document.querySelector(".Youtube input").value;
  let LinkedIn = document.querySelector(".LinkedIn input").value;
  let Objective = document.querySelector(".objective p");
  let WorkExperience = document.querySelector(".WorkExperience p");
  let AcademicQualification = document.querySelector(
    ".AcademicQualification p"
  );

  let rName = document.querySelector(".NameR");
  let phoneNo = document.querySelector(".phoneNo");
  let rAddress = document.querySelector(".AddressR");
  let rFaceBook = document.querySelector(".FacebookR a");
  let rYoutube = document.querySelector(".YoutubeR a");
  let rLinkedIn = document.querySelector(".LinkedInR a");
  let rObjective = document.querySelector(".RObjective .info");
  let rWorkExperience = document.querySelector(".RWorkExperience .info");
  let rAcademicQualification = document.querySelector(
    ".RAcademicQualifications .info"
  );
  MainContainer.style = "display:flex;";
  container.style = "display:none";
  Print.style = "visibility:visible";
  add.style = "visibility:hidden";

  information.innerHTML = nameInput;
  rName.innerHTML = nameInput;
  phoneNo.innerHTML = PhoneNoInput;
  rAddress.innerHTML = Address;
  rFaceBook.href = FaceBook; 
  rYoutube.href = Youtube; 
  rLinkedIn.href = LinkedIn; 
  rObjective.innerHTML = Objective.innerHTML;
  rWorkExperience.innerHTML = WorkExperience.innerHTML;
  rAcademicQualification.innerHTML = AcademicQualification.innerHTML;

  rObjective.addEventListener("paste", function (event) {
    event.preventDefault();
    let pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    );

    rObjective.innerHTML = `<span style="color:white">${pastedText}</span>`;
  });
  rWorkExperience.addEventListener("paste", function (event) {
    event.preventDefault();

    let pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    );


    rObjective.innerHTML = `<span style="color:white">${pastedText}</span>`;
  });
  rAcademicQualification.addEventListener("paste", function (event) {
    event.preventDefault();

    let pastedText = (event.clipboardData || window.clipboardData).getData(
      "text"
    );


    rObjective.innerHTML = `<span style="color:white">${pastedText}</span>`;
  });
  console.log(nameInput);
});

document.addEventListener("DOMContentLoaded", function() {
  
  let printButton = document.querySelector(".Print");


  if (printButton) {
    printButton.addEventListener("click", function() {
      window.print();
    });

    printButton.addEventListener("click", function(event) {
      event.preventDefault();
    });
  } else {
    console.error("Print button not found.");
  }
});
