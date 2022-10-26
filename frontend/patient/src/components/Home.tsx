import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { IDoctor } from "../interfaces/doctor";
import { getDoctors, getBookedSlots, createAppointment } from "../services/appointmentService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from '@mui/material/Alert';

function Home() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [specialist, setSpecialist] = useState<string | undefined>(undefined);
  const [doctor, setDoctor] = useState<string | undefined>("q");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [error, setError] = useState<any>(null);

  const handleSlotChange = (slot: any) => {
    setSelectedSlot(slot);
  };

  const handleDateChange = (parsedDate: any) => {
    setSelectedDate(parsedDate);
    loadSlots(parsedDate);
  };

  const handleSpecialistChange = (event: SelectChangeEvent) => {
    setSpecialist(event.target.value);
    setDoctor("");
  };

  const handleDoctorChange = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };

  const loadDoctors = async () => {
    try {
      const doctors: IDoctor[] = await getDoctors();
      console.log("doctors=", doctors);
      setDoctors(doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBook = async () => {
    if(!doctor || !selectedDate)
        return;

    console.log(`booking appointment for ${doctor} on ${new Date(selectedDate)} at ${selectedDate}`)

    try{
        await createAppointment({
            appointment:{
                date: new Date(selectedDate),
                slot: selectedSlot
            },
        }, doctor);
        //@ts-ignore
        window.location = "/"
    }
    catch(ex){
        console.log('error', ex)
        setError(ex);
    }

  };

  const loadSlots = async (parsedDate: any) => {

    if(doctor === undefined)
        return;

    let slots = await getBookedSlots(doctor, new Date(parsedDate));

    const currentTime = new Date();

    if (
      parsedDate &&
      new Date(parsedDate).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }) ===
        currentTime.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
    )
      constantSlots.forEach((slot) => {
        if (
          currentTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) > slot &&
          !slots.includes(slot)
        ) {
          slots.push(slot);
        }
      });
    setBookedSlots(slots);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const constantSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  return (
    <Container>
      <Grid
        container
        direction="column"
        spacing={4}
        alignContent="center"
        alignItems="center"
      >
        <Grid sm={6}>
          <FormControl
            variant="standard"
            fullWidth
            sx={{ m: 2, top: 10, minWidth: 140 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Select Specialist
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={specialist}
              onChange={handleSpecialistChange}
              label="Specialist"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {doctors.map(d => d.speciality).map((s, index) => (
                <MenuItem value={s} key={index}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            fullWidth
            sx={{ m: 2, minWidth: 140 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Select Doctor
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={doctor}
              onChange={handleDoctorChange}
              label="Doctor"
              disabled={specialist === undefined ? true : false}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {doctors
                .filter((d) => d.speciality === specialist)
                .map((s, index) => (
                  <MenuItem value={s.doctorId} key={s.doctorId}>
                    <Typography sx={{ mr: 1 }}>{s.name}</Typography>
                    {s.qualifications.map((q) => (
                      <Chip size="small" variant="filled" label={q}></Chip>
                    ))}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Appointment Date"
              value={selectedDate}
              disablePast
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField fullWidth variant="standard" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        {selectedDate && (
          <Grid md={6}>
            <Typography sx={{ m: 1 }}>Available Slots</Typography>
            {constantSlots.map((slot) => (
              <Button
                variant={slot === selectedSlot ? "contained" : "outlined"}
                disabled={bookedSlots.filter((s) => s === slot).length >= 1}
                onClick={() => handleSlotChange(slot)}
                sx={{ m: 1 }}
              >
                {slot}
              </Button>
            ))}
          </Grid>
        )}
        {error && <Alert severity="error">{new String(error)}</Alert>}
        <Button sx={{ m: 2 }} onClick={handleBook} variant="contained">
          Book Apppointment
        </Button>
      </Grid>
    </Container>
  );
}

export default Home;
