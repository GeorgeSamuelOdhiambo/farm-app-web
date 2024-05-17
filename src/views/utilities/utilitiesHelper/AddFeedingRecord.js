import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';

const FeedingPopupForm = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = { number: '', unit: '', from: '', to: '', type: '' };

  const validationSchema = Yup.object().shape({
    number: Yup.number().required('Quantity is required').positive('Should not be less than 0'),
    unit: Yup.string().required('Quantity Unit is required'),
    from: Yup.date().required('From Date is required'),
    to: Yup.date().required('To Date is required'),
    type: Yup.string().required('Feed Name is required')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const { number, unit, from, to, type } = values;
      const data = {
        flockID: id,
        action: 'feeds',
        data: {
          type,
          quantity: {
            number,
            unit
          },
          time: {
            from,
            to
          }
        }
      };
      await Axios.post(`flockRecodeKeeping`, { ...data });
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
        setIsSubmitting(false);
        setPopupData(null);
      }, 2000);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <MainCard title={`Add Feeding Record For FlockID: ${id}`}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={6}>
                    <InputLabel id="quantity-number-label">Quantity</InputLabel>
                    <Field as={TextField} type="number" name="number" labelId="quantity-number-label" fullWidth />
                    <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="quantity-unit-label">Quantity Unit</InputLabel>
                    <Field as={Select} name="unit" labelId="quantity-unit-label" fullWidth>
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="g">g</MenuItem>
                    </Field>
                    <ErrorMessage name="unit" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="from-label">From Date</InputLabel>
                    <Field as={TextField} type="date" name="from" labelId="from-label" fullWidth />
                    <ErrorMessage name="from" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="to-label">To Which Date</InputLabel>
                    <Field as={TextField} type="date" name="to" labelId="to-label" fullWidth />
                    <ErrorMessage name="to" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="feed-name-label">Feed Name</InputLabel>
                    <Field as={TextField} name="type" labelId="feed-name-label" fullWidth />
                    <ErrorMessage name="type" component="div" style={{ color: 'red' }} />
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

FeedingPopupForm.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default FeedingPopupForm;
