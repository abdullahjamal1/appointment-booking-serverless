export interface IAppointment{
    appointment:{
        date: string,
        slot: string
    },
    doctor:{
        name: string,
    },
    booked_at: string
}