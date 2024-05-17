import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField, Select, MenuItem } from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ExpensesPopupForm = ({ id, action, comment, onClose }) => {
  const [popupData, setPopupData] = useState();

  const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    description: Yup.string().required('Description is required'),
    coast: Yup.number().required('Amount is required').positive('Amount must be positive'),
    ...(comment.toLowerCase() === 'add feeds expense'
      ? {
          number: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
          unit: Yup.string().required('Unit is required')
        }
      : {})
  });

  const handleSubmit = async (values) => {
    try {
      const { number, unit, date, description, coast } = values;
      const data = {
        flockID: id,
        type: action,
        data2: {
          type: description,
          quantity: {
            number,
            unit
          },
          time: {
            from: date,
            to: ''
          }
        },
        data: {
          type: description,
          cost: parseInt(coast),
          date
        }
      };
      await Axios.post(`addFlockExpensesAndIncome`, { ...data });
      setPopupData({ message: 'Data added successfully', state: 'success' });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setPopupData({ message: err.response.data.message, state: 'error' });
      } else {
        setPopupData({ message: err.message, state: 'error' });
      }
      setTimeout(() => {
        setPopupData(null);
      }, 2000);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <MainCard title={`${comment}: ${id}`}>
          <Formik
            initialValues={{ date: '', description: '', coast: '', number: '', unit: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputLabel id="date-label">Date</InputLabel>
                    <TextField labelId="date-label" type="date" name="date" value={values.date} onChange={handleChange} fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="coast-label">Amount</InputLabel>
                    <TextField labelId="coast-label" type="number" name="coast" value={values.coast} onChange={handleChange} fullWidth />
                    <ErrorMessage name="coast" component="div" style={{ color: 'red' }} />
                  </Grid>
                  {comment.toLowerCase() == 'add feeds expense' && (
                    <>
                      <Grid item xs={6}>
                        <InputLabel id="quantity-number-label">Quantity</InputLabel>
                        <Field
                          as={TextField}
                          type="number"
                          name="number"
                          labelId="quantity-number-label"
                          value={values.number}
                          onChange={handleChange}
                          fullWidth
                        />
                        <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel id="quantity-unit-label">Quantity Unit</InputLabel>
                        <Field as={Select} name="unit" labelId="quantity-unit-label" value={values.unit} onChange={handleChange} fullWidth>
                          <MenuItem value="kg">kg</MenuItem>
                          <MenuItem value="g">g</MenuItem>
                        </Field>
                        <ErrorMessage name="unit" component="div" style={{ color: 'red' }} />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <InputLabel id="description-label">
                      {comment.toLowerCase() == 'add feeds expense' ? 'Feed Name' : 'Description'}
                    </InputLabel>
                    <TextField
                      labelId="description-label"
                      multiline
                      rows={comment.toLowerCase() == 'add feeds expense' ? 1 : 3}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      fullWidth
                    />
                    <ErrorMessage name="description" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <DialogActions>
                  <Box sx={{ mt: 2, color: 'red' }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                    </AnimateButton>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        onClick={onClose}
                        variant="contained"
                        sx={{ backgroundColor: 'red' }}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </MainCard>
      </DialogContent>
    </Dialog>
  );
};

ExpensesPopupForm.propTypes = {
  id: PropTypes.string,
  action: PropTypes.string,
  comment: PropTypes.string,
  onClose: PropTypes.func
};

export default ExpensesPopupForm;
