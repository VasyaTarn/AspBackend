import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Models/user.model';
import { Doctor } from './Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUsersUrl = "http://localhost:5253/api/users";
  private apiDoctorsUrl = "http://localhost:5253/api/doctors";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUsersUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUsersUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUsersUrl, user);
  }

  updateUser(id: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUsersUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUsersUrl}/${id}`);
  }

  checkDuplicate(value: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUsersUrl}/CheckDuplicate?value=${value}`);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiDoctorsUrl);
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiDoctorsUrl, doctor);
  }

  checkDoctorDuplicate(doctor: Doctor): Observable<boolean> {
    let params = new HttpParams()
      .set('FirstName', doctor.firstName)
      .set('LastName', doctor.lastName)
      .set('MiddleName', doctor.middleName)
      .set('PhoneNumber', doctor.phoneNumber)
      .set('Specialization', doctor.specialization);

    return this.http.get<boolean>(`${this.apiDoctorsUrl}/CheckDoctorDuplicate`, { params });
  }

  deleteDoctor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiDoctorsUrl}/${id}`);
  }

  updateDoctor(id: string, doctor: Doctor): Observable<void> {
    return this.http.put<void>(`${this.apiDoctorsUrl}/${id}`, doctor);
  }

  setUserCurrent(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUsersUrl}/SetCurrent/${id}`, {});
  }

  resetAllUserCurrent(): Observable<void> {
    return this.http.put<void>(`${this.apiUsersUrl}/ResetAllCurrent`, {});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUsersUrl}/GetCurrentUser`);
  }


}
