import { Component, OnInit } from '@angular/core';
import { PatientService } from './services/patient.service';
import { Patient } from './models/patient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  patients: Patient[] = [];
  doctorPatients: Patient[] = [];
  newPatient: Patient = {
    id: 0, 
    name: '',
    email: '',
    country: '',
    doctorId: 0
  };
  getDoctorPatientsId: string = ''; 
  addPatientDoctorId: string = ''; 
  showDoctorIdError: boolean = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
  }

  getDoctorPatients(): void {
    if (!this.getDoctorPatientsId) {
      this.doctorPatients = [];
      return;
    }

    this.patientService.getDoctorPatients(Number(this.getDoctorPatientsId)).subscribe(patients => {
      this.doctorPatients = patients;
    });
  }

  addPatient(): void {
    if (!this.addPatientDoctorId) {
      this.showDoctorIdError = true;
      return;
    }

    this.showDoctorIdError = false;

    const patient: Patient = {
      id: 0,
      name: this.newPatient.name,
      email: this.newPatient.email,
      country: this.newPatient.country,
      doctorId: Number(this.addPatientDoctorId)
    };

    this.patientService.addPatient(patient).subscribe(newPatient => {
      this.patients.push(newPatient);
      this.newPatient = {
        id: 0,
        name: '',
        email: '',
        country: '',
        doctorId: Number(this.addPatientDoctorId)
      };
      this.clearInput();
    });
  }

  clearInput(): void {
    this.getDoctorPatientsId = '';
    this.addPatientDoctorId = '';
  }
  checkInputValue(field: string): void {
    if (field === 'name') {
      this.newPatient.name !== '';
    } else if (field === 'email') {
      this.newPatient.email !== '';
    } else if (field === 'country') {
      this.newPatient.country !== '';
    } else if (field === 'doctorId') {
      this.addPatientDoctorId !== '';
    }
  }
}
