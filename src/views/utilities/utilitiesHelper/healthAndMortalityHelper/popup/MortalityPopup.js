import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, InputLabel, TextField } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainCard from 'ui-component/cards/MainCard';
import Axios from 'api';
import MessagePopup from 'views/SuccessErrorPopup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  number: Yup.number().required('Number of mortality is required').positive('Quantity must be at least 1'),
  comment: Yup.string().required('Comment is required')
});

const MortalityPopupRecord = ({ id, onClose }) => {
  const [popupData, setPopupData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <MainCard title={`Add Mortality Record: ${id}`}>
          <Formik
            initialValues={{ date: '', number: '', comment: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              try {
                var data = {
                  flockID: id,
                  action: 'mortality',
                  data: {
                    date: values.date,
                    comment: values.comment,
                    quantity: values.number
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
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid container spacing={3}>
                  {popupData && <MessagePopup message={popupData.message} state={popupData.state} />}
                  <Grid item xs={6}>
                    <InputLabel id="from-label">Date</InputLabel>
                    <TextField labelId="from-label" type="date" name="date" value={values.date} onChange={handleChange} fullWidth />
                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="to-label">Number of Death</InputLabel>
                    <TextField labelId="to-label" name="number" value={values.number} onChange={handleChange} fullWidth />
                    <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="feed-name-label">Cause/Comment</InputLabel>
                    <TextField
                      labelId="feed-name-label"
                      multiline
                      rows={4}
                      name="comment"
                      value={values.comment}
                      onChange={handleChange}
                      fullWidth
                    />
                    <ErrorMessage name="comment" component="div" style={{ color: 'red' }} />
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

MortalityPopupRecord.propTypes = {
  id: PropTypes.string,
  onClose: PropTypes.func
};

export default MortalityPopupRecord;
