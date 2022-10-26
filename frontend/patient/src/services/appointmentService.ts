import { API } from "aws-amplify";
import { getHeaders } from "./headers";

const API_NAME = "AppointmentApi";
const API_URL = "";

export async function createAppointment(body: any, doctorId: string){
    return getHeaders(true).then((headers) =>
    API.post(API_NAME, `${API_URL}`, {
      body: body,
      headers: headers,
      withCredentials: true,
      queryStringParameters: {
        doctorId
      },
    })
  );

}

export async function getDoctors() {
  return getHeaders(true).then((headers) =>
    API.get(API_NAME, `${API_URL}/doctors`, {
      headers: headers,
      withCredentials: true
    })
  );
}

export async function getAppointments(doctorId: string) {
    return getHeaders(true).then((headers) =>
      API.get(API_NAME, `${API_URL}/`, {
        headers: headers,
        withCredentials: true,
        queryStringParameters: {
          doctorId: doctorId,
        },
      })
    );
  }

export async function getBookedSlots(doctorId: string, date: Date) {
  return getHeaders(true).then((headers) =>
    API.get(API_NAME, `${API_URL}/slots`, {
      headers: headers,
      withCredentials: true,
      queryStringParameters: {
        doctorId: doctorId
      },
    })
  );
}