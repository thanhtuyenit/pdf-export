export class Resume {
    name: string;
    address: string;
    contactNumber: number;
    email: string;
    socialProfile: string;
    experiences: Experience [] = [];
    educations: Education [] = [];
    otherDetails: string;
    skills: Skill [] = [];
    
    constructor() {
        this.experiences.push(new Experience());
        this.educations.push(new Education());
        this.skills.push(new Skill());
    }
}

export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    experienceYear: number;
}

export class Education {
    degree: string;
    college: string;
    passingYear: string;
    percentage: number;
}

export class Skill {
    skillName: string;
}