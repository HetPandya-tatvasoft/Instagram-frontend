import dayjs from "dayjs";

const onSubmit = (values) => {
  const formattedDOB = dayjs(values.dateOfBirth).format("YYYY-MM-DD");

  const payload = {
    ...values,
    dateOfBirth: formattedDOB, // Convert before sending
  };

  axios.post("/api/register", payload);
};
import dayjs from "dayjs";

const handleRegisterSubmit = (values: RegisterUserPayload) => {
  const payloadToSend = {
    ...values,
    dateOfBirth: values.dateOfBirth
      ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
      : "", // Fallback just in case
  };

  axios.post('/api/register', payloadToSend);
};
