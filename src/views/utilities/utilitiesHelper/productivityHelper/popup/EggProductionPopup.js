import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  quantity: Yup.number().required('Number of eggs is required').positive('Quantity must be at least 1')
});

const AddEggProductionRecord = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const data = {
        flockID: id,
        action: 'eggProduction',
        data: {
          date: values.date,
          quantity: parseInt(values.quantity)
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
        <MainCard title={`Add Eggs Record For: ${id}`}>
          <Formik
            initialValues={{ date: '', quantity: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form>
                {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputLabel id="from-label">Date</InputLabel>
                    <Field as={TextField} labelId="from-label" type="date" name="date" fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="to-label">Number Of Eggs</InputLabel>
                    <Field as={TextField} labelId="to-label" type="number" name="quantity" fullWidth />
                    <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />
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

AddEggProductionRecord.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default AddEggProductionRecord;
