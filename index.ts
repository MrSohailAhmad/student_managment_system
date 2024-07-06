import * as readline from "readline-sync";

class Student {
  private static idCounter: number = 0;
  private id: string;
  private courses: string[] = [];
  private balance: number = 0;

  constructor(private firstName: string, private lastName: string) {
    this.id = this.generateStudentID();
  }

  private generateStudentID(): string {
    Student.idCounter++;
    return Student.idCounter.toString().padStart(5, "0");
  }

  public enroll(course: string): void {
    this.courses.push(course);
  }

  public viewBalance(): number {
    return this.balance;
  }

  public payTuition(amount: number): void {
    this.balance -= amount;
  }

  public showStatus(): void {
    console.log(`Student Name: ${this.firstName} ${this.lastName}`);
    console.log(`Student ID: ${this.id}`);
    console.log(`Enrolled Courses: ${this.courses.join(", ")}`);
    console.log(`Balance: ${this.balance}`);
  }

  public addBalance(amount: number): void {
    this.balance += amount;
  }
}

function main() {
  const students: Student[] = [];
  let exit = false;

  while (!exit) {
    console.log("\n1. Add new student");
    console.log("2. Enroll in course");
    console.log("3. View balance");
    console.log("4. Pay tuition fees");
    console.log("5. Show status");
    console.log("6. Exit");

    const choice = readline.questionInt("Choose an option: ");

    switch (choice) {
      case 1:
        const firstName = readline.question("Enter first name: ");
        const lastName = readline.question("Enter last name: ");
        const newStudent = new Student(firstName, lastName);
        students.push(newStudent);
        console.log("Student added successfully!");
        break;

      case 2:
        if (students.length === 0) {
          console.log("No students available. Add a student first.");
          break;
        }
        const studentID = readline.question("Enter student ID: ");
        const studentToEnroll = students.find(
          (student) => student["id"] === studentID
        );
        if (studentToEnroll) {
          const course = readline.question("Enter course to enroll: ");
          studentToEnroll.enroll(course);
          console.log("Course enrolled successfully!");
        } else {
          console.log("Student not found.");
        }
        break;

      case 3:
        if (students.length === 0) {
          console.log("No students available. Add a student first.");
          break;
        }
        const viewID = readline.question("Enter student ID: ");
        const studentToView = students.find(
          (student) => student["id"] === viewID
        );
        if (studentToView) {
          console.log(`Balance: ${studentToView.viewBalance()}`);
        } else {
          console.log("Student not found.");
        }
        break;

      case 4:
        if (students.length === 0) {
          console.log("No students available. Add a student first.");
          break;
        }
        const payID = readline.question("Enter student ID: ");
        const studentToPay = students.find(
          (student) => student["id"] === payID
        );
        if (studentToPay) {
          const amount = readline.questionInt("Enter amount to pay: ");
          studentToPay.payTuition(amount);
          console.log("Payment successful!");
        } else {
          console.log("Student not found.");
        }
        break;

      case 5:
        if (students.length === 0) {
          console.log("No students available. Add a student first.");
          break;
        }
        const statusID = readline.question("Enter student ID: ");
        const studentToShow = students.find(
          (student) => student["id"] === statusID
        );
        if (studentToShow) {
          studentToShow.showStatus();
        } else {
          console.log("Student not found.");
        }
        break;

      case 6:
        exit = true;
        break;

      default:
        console.log("Invalid choice. Please try again.");
        break;
    }
  }
}

main();
