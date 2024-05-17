import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Hatched Date is required'),
  number: Yup.number().required('Number Of Birds is required').min(1, 'Number should be at least 1'),
  friendlyName: Yup.string().required('Flock Name is required'),
  breed: Yup.string().required('Breed Name is required')
});

const CreateNewFlock = ({ onClose }) => {
  const [popupData, setPopupData] = useState();
  const [flockID, setFlockID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(true);
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/createFlockID`);
        setFlockID(response.data.newID);
        setIsSubmitting(false);
      } catch (error) {
        setFlockID('');
        setIsSubmitting(false);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const data = {
        flockID: flockID,
        friendlyName: values.friendlyName,
        breed: values.breed,
        feeding: [],
        hatchDate: values.date,
        number: {
          mortality: [],
          totalMortality: 0,
          currentNumber: parseInt(values.number)
        },
        health: {
          vaccination: [],
          illness: []
        },
        production: {
          totalEggProduction: 0,
          dailyEggsProduction: [],
          weight: []
        }
      };
      await Axios.post(`createFlockManagement`, { ...data });
      setPopupData({ message: 'New Flock Created successfully', state: 'success' });
      setTimeout(() => {
        onClose();
        setPopupData(null);
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
        <MainCard title={`Create New Flock  ID  :  ${flockID}`}>
          <Formik
            initialValues={{
              date: '',
              number: '',
              friendlyName: '',
              breed: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {() => (
              <Form>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={6}>
                    <InputLabel id="date-label">Hatched Date</InputLabel>
                    <Field as={TextField} labelId="date-label" type="date" name="date" fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="number-label">Number Of Birds</InputLabel>
                    <Field as={TextField} labelId="number-label" type="number" name="number" fullWidth />
                    <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="friendlyName-label">Flock Name</InputLabel>
                    <Field as={TextField} labelId="friendlyName-label" name="friendlyName" fullWidth />
                    <ErrorMessage name="friendlyName" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="breed-label">Breed Name</InputLabel>
                    <Field as={TextField} labelId="breed-label" name="breed" fullWidth />
                    <ErrorMessage name="breed" component="div" style={{ color: 'red' }} />
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

CreateNewFlock.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default CreateNewFlock;
