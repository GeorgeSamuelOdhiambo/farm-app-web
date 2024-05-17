import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const HealthPopupForm = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    medication: Yup.string().required('Medication is required'),
    symptom: Yup.string().required('Symptom is required')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      var data = {
        flockID: id,
        action: 'health',
        data: {
          date: values.date,
          symptom: values.symptom,
          medication: values.medication
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
        <MainCard title={`Add Health Record: ${id}`}>
          <Formik
            initialValues={{ date: '', medication: '', symptom: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={6}>
                    <InputLabel id="from-label">Date</InputLabel>
                    <Field as={TextField} labelId="from-label" type="date" name="date" fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="to-label">Medication</InputLabel>
                    <Field as={TextField} labelId="to-label" name="medication" fullWidth />
                    <ErrorMessage name="medication" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="feed-name-label">Symptom</InputLabel>
                    <Field as={TextField} labelId="feed-name-label" multiline rows={4} name="symptom" fullWidth />
                    <ErrorMessage name="symptom" component="div" style={{ color: 'red' }} />
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

HealthPopupForm.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default HealthPopupForm;
