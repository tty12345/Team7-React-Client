import axios from "axios";

const STUDENT_API_BASE_URL = "http://localhost:8080/post";

class CarPostDataService {
  getCarPost() {
    return axios.get("http://localhost:8080/post/listPost2");
  }
  // createStudent(student) {
  //   return axios.post(STUDENT_API_BASE_URL, student);
  // }
  // getStudentById(id) {
  //   return axios.get(STUDENT_API_BASE_URL+"/"+id);
  // }
  // updateStudent(id, student) {
  //   return axios.put(STUDENT_API_BASE_URL+"/edit/"+id, student)
  // }
  // deleteStudent(id) {
  //   return axios.delete(STUDENT_API_BASE_URL+"/"+id);
  // }
  // deleteAll() {
  //   return axios.delete(STUDENT_API_BASE_URL);
  // }
  // findByName(name) {
  //   return axios.get(STUDENT_API_BASE_URL+"?name="+name);
  // }
}

export default new CarPostDataService();
