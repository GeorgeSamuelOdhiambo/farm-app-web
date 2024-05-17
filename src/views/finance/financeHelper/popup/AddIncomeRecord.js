import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const IncomePopupForm = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      var data = {
        flockID: id,
        type: 'income',
        data: {
          date: values.date,
          description: values.description,
          unit: parseInt(values.unit),
          totalPrice: parseInt(values.price)
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
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <MainCard title={`Add Income Record For: ${id}`}>
          <Formik
            initialValues={{ date: '', description: '', unit: '', price: '' }}
            validationSchema={Yup.object({
              date: Yup.string().required('Date is required'),
              description: Yup.string().required('Description is required'),
              unit: Yup.number().required('Unit Sold is required').positive('Unit must be positive'),
              price: Yup.number().required('Total Price is required').positive('Price must be positive')
            })}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={4}>
                    <InputLabel id="date-label">Date</InputLabel>
                    <Field as={TextField} labelId="date-label" type="date" name="date" fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel id="unit-label">Unit Sold</InputLabel>
                    <Field as={TextField} labelId="unit-label" type="number" name="unit" fullWidth />
                    <ErrorMessage name="unit" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel id="price-label">Total Price Ksh</InputLabel>
                    <Field as={TextField} labelId="price-label" type="number" name="price" fullWidth />
                    <ErrorMessage name="price" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="description-label">Description</InputLabel>
                    <Field as={TextField} labelId="description-label" multiline rows={4} name="description" fullWidth />
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

IncomePopupForm.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default IncomePopupForm;
