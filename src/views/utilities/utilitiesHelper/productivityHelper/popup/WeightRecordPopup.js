import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MessagePopup from 'views/SuccessErrorPopup';

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  unit: Yup.string().required('Unit is required'),
  weight: Yup.number().required('Weight is required').positive('Wight should a positive number')
});

const AddWeightRecord = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = { date: '', unit: '', weight: '' };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const data = {
        flockID: id,
        action: 'weight',
        data: {
          date: values.date,
          weight: parseInt(values.weight),
          unit: values.unit
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <MainCard title={`Add Weight Record: ${id}`}>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={6}>
                    <InputLabel id="to-label">Average Bird Weight</InputLabel>
                    <Field as={TextField} labelId="to-label" type="number" name="weight" fullWidth />
                    <ErrorMessage name="weight" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="quantity-unit-label">Quantity Unit</InputLabel>
                    <Field as={Select} labelId="quantity-unit-label" name="unit" fullWidth>
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="g">g</MenuItem>
                    </Field>
                    <ErrorMessage name="unit" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="from-label">Date</InputLabel>
                    <Field as={TextField} labelId="from-label" type="date" name="date" fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
              </MainCard>
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
      </DialogContent>
    </Dialog>
  );
};

AddWeightRecord.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default AddWeightRecord;
