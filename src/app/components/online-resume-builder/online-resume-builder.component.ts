import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Education, Experience, Resume } from "src/app/models/resume";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "app-online-resume-builder",
  templateUrl: "./online-resume-builder.component.html",
  styleUrls: ["./online-resume-builder.component.scss"],
})
export class OnlineResumeBuilderComponent implements OnInit {
  resume = new Resume();
  resumeSubmitForm: FormGroup;

  degrees = ["Engineer", "Master.", "Doctor", "Professor"];

  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.resumeSubmitForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      contactNumber: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      socialProfile: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      experiences: this.formBuilder.array([this.initExperience()]),
      educations: this.formBuilder.array([this.initEducation()]),
      otherDetails: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      skills: this.formBuilder.array([this.initSkill()]),
    });
  }

  initExperience() {
    return this.formBuilder.group({
      employer: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      jobTitle: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      jobDescription: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      experienceYear: new FormControl(null, Validators.required),
    });
  }

  initEducation() {
    return this.formBuilder.group({
      degree: new FormControl("Engineer"),
      college: new FormControl(null, Validators.required),
      passingYear: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
    });
  }

  initSkill() {
    return this.formBuilder.group({
      skillName: new FormControl(null, Validators.required),
    });
  }

  //// convenience getter for access to form fields
  get f() {
    return this.resumeSubmitForm.controls;
  }

  get experienceList() {
    return this.resumeSubmitForm.get("experiences") as FormArray;
  }

  get educationList() {
    return this.resumeSubmitForm.get("educations") as FormArray;
  }

  get skillList() {
    return this.resumeSubmitForm.get("skills") as FormArray;
  }

  addSkill() {
    this.skillList.push(this.initSkill());
  }

  addExperience() {
    this.experienceList.push(this.initExperience());
  }

  addEducation() {
    this.educationList.push(this.initEducation());
  }

  generatePdf(action = "open") {
    this.isSubmitted = true;
    if(this.resumeSubmitForm.invalid){
      return false;
    }
    this.resume = this.resumeSubmitForm.value;
    const documentDefinition = this.createPDFTemplate();
    switch (action) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
    }
  }

  createPDFTemplate() {
    return {
      content: [
        {
          text: "Curriculum Vitae",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              {
                text: this.resume.name,
                style: "name",
              },
              {
                text: this.resume.address,
              },
              {
                text: "Email : " + this.resume.email,
              },
              {
                text: "Contact No : " + this.resume.contactNumber,
              },
              {
                text: "GitHub: " + this.resume.socialProfile,
                link: this.resume.socialProfile,
                color: "blue",
              },
            ],
          ],
        },
        {
          text: "Skills",
          style: "header",
        },
        {
          columns: [
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 0)
                  .map((s) => s.skillName),
              ],
            },
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 1)
                  .map((s) => s.skillName),
              ],
            },
            {
              ul: [
                ...this.resume.skills
                  .filter((value, index) => index % 3 === 2)
                  .map((s) => s.skillName),
              ],
            },
          ],
        },
        {
          text: "Experience",
          style: "header",
        },
        this.getExperienceObject(this.resume.experiences),

        {
          text: "Education",
          style: "header",
        },
        this.getEducationObject(this.resume.educations),

        {
          text: "Other Details",
          style: "header",
        },
        {
          text: this.resume.otherDetails,
        },

        {
          text: "Signature",
          style: "sign",
        },
        {
          columns: [
            {
              text: "\n" + this.resume.name,
              alignment: "right",
            },
          ],
        },
      ],

      info: {
        title: this.resume.name + "_RESUME",
        author: this.resume.name,
        subject: "RESUME",
        keywords: "RESUME, ONLINE RESUME",
      },

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: "underline",
        },

        name: {
          fontSize: 16,
          bold: true,
        },

        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },

        sign: {
          margin: [0, 50, 0, 10],
          alignment: "right",
          italics: true,
        },

        tableHeader: {
          bold: true,
        },
      },
    };
  }

  getExperienceObject(experiences: Experience[]) {
    const exs = [];
    experiences.forEach((experience) => {
      exs.push([
        {
          columns: [
            [
              {
                text: experience.jobTitle,
                style: "jobTitle",
              },
              {
                text: experience.employer,
              },
              {
                text: experience.jobDescription,
              },
            ],
            {
              text: "Experience : " + experience.experienceYear + " Months",
              alignment: "right",
            },
          ],
        },
      ]);
    });

    return {
      table: {
        widths: ["*"],
        body: [...exs],
      },
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ["*", "*", "*", "*"],
        body: [
          [
            {
              text: "Degree",
              style: "tableHeader",
            },
            {
              text: "College",
              style: "tableHeader",
            },
            {
              text: "Passing Year",
              style: "tableHeader",
            },
            {
              text: "Result",
              style: "tableHeader",
            },
          ],
          ...educations.map((ed) => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          }),
        ],
      },
    };
  }

  resetForm() {
    this.isSubmitted = false;
    this.resumeSubmitForm.reset();
  }

  removeSkill(index: number){
    this.skillList.removeAt(index)
  }

  removeExperience(index: number){
    this.experienceList.removeAt(index);
  }

  removeEducation(index: number){
    this.educationList.removeAt(index);
  }

}
