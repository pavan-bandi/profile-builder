CREATE database profilebuilder;
USE profilebuilder;
CREATE TABLE Student (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    MobileNo VARCHAR(15),
    Address TEXT,
    UserProfilesArray JSON, -- Assuming user profiles array is stored as JSON
    UserDescription TEXT
);

CREATE TABLE Education (
    UserID INT,
    SSC JSON,
    Intermediat JSON,
    UG JSON,
    PG JSON,
    FOREIGN KEY (UserID) REFERENCES Student(StudentID)
);

-- Table for projects
CREATE TABLE Project (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ProjectName VARCHAR(100),
    Description TEXT,
    ToolsUsed TEXT,
    StartDate DATE,
    EndDate DATE,
    GithubLink VARCHAR(255),
    WorkingSiteLink VARCHAR(255),
    ProofOfWork VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Student(StudentID)
);

-- Table for work experience
CREATE TABLE WorkExperience (
    ExperienceID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CompanyName VARCHAR(100),
    Role VARCHAR(100),
    TypeOfWork VARCHAR(100),
    StartDate DATE,
    EndDate DATE,
    Description TEXT,
    ProofOfWork VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Student(StudentID)
);

-- Table for events attended
CREATE TABLE EventsAttended (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    EventName VARCHAR(100),
    Description TEXT,
    EventDate DATE,
    Place VARCHAR(100),
    ProofOfWork VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Student(StudentID)
);

