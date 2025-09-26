import moment from 'moment';

const alpha = (v) => /^[A-Za-z]+$/.test(v);

export const validateEmployee = (data) => {
  const errors = [];

  if (!data.firstname) errors.push({ field: 'firstname', msg: 'Firstname is required' });
  else if (!alpha(data.firstname)) errors.push({ field: 'firstname', msg: 'Alphabetic only' });

  if (!data.lastname) errors.push({ field: 'lastname', msg: 'Lastname is required' });
  else if (!alpha(data.lastname)) errors.push({ field: 'lastname', msg: 'Alphabetic only' });

  if (!data.dept) errors.push({ field: 'dept', msg: 'Dept is required' });
  else if (!alpha(data.dept)) errors.push({ field: 'dept', msg: 'Alphabetic only' });

  if (!data.title) errors.push({ field: 'title', msg: 'Title is required' });
  else if (!['Mr', 'Miss', 'Mrs', 'Dr'].includes(data.title)) errors.push({ field: 'title', msg: 'Invalid title' });

  if (!data.birthDate) errors.push({ field: 'birthDate', msg: 'birthDate required' });
  else {
    const birth = moment(data.birthDate, 'YYYY-MM-DD', true);
    if (!birth.isValid()) errors.push({ field: 'birthDate', msg: 'Invalid date' });
    else {
      if (birth.isBefore(moment('1900-01-01'))) errors.push({ field: 'birthDate', msg: 'Must be on or after 1900-01-01' });
      if (moment().diff(birth, 'years') < 18) errors.push({ field: 'birthDate', msg: 'Employee must be at least 18' });
    }
  }

  if (data.salary == null) errors.push({ field: 'salary', msg: 'salary required' });
  else if (!(Number(data.salary) > 0)) errors.push({ field: 'salary', msg: 'salary must be > 0' });

  if (!data.email) errors.push({ field: 'email', msg: 'email required' });
  else if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.push({ field: 'email', msg: 'Invalid email' });

  return errors;
};